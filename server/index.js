// FamilIA Salud · Servidor (Render + Neon) · SkyNet Genesis
import express from 'express';
import pg from 'pg';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATALOGO, ESPECIALIDADES, CIUDADES } from './catalogo.js';

const E = process.env;
const DEMO = E.DEMO === 'true';
const DEMO_PAGOS = E.PAGOS_BOLD !== '1'; // con PAGOS_BOLD=1 cobra con el Bold central de SkyNet Genesis
const FIRMADOR = E.BOLD_FIRMADOR || 'https://skynetgenesis.com/bold-firma.php', VERIFICADOR = E.BOLD_VERIFICADOR || 'https://skynetgenesis.com/bold-verificar.php';
const APP_BOLD = 'familia-salud', UA = 'SkyNetGenesis-FamiliaSalud/1.0';
const SUPERADMIN = (E.SUPERADMIN_CORREO || 'superadmin.familia@skynetgenesis.com').toLowerCase();
const DUENO_CORREO = 'rikardolondono@gmail.com';
const DUENO_CUENTAS = [SUPERADMIN, 'contacto@reinaelizabeth.com', 'contacto@skynetgenesis.com', DUENO_CORREO];
const CLAVE_DEMO = 'demo123456';
const FRONT = (E.FRONT_URL || 'https://familiasalud.skynetgenesis.com').replace(/\/$/, '');
const ORIGENES = (E.ORIGENES || FRONT + ',http://localhost:8080').split(',').map(s => s.trim());
const CORREOS_DEMO = ['demo@skynetgenesis.com', 'contabilidad@skynetgenesis.com', 'verificador@skynetgenesis.com', 'operador@skynetgenesis.com', 'nuevo@skynetgenesis.com'];
const SKYNET = 'SkyNet Genesis · contacto@skynetgenesis.com · WhatsApp 304 437 5758';

const pool = new pg.Pool({ connectionString: E.DATABASE_URL, ssl: E.PGSSL === 'false' ? false : { rejectUnauthorized: false }, max: 5 });
const q = async (t, p = []) => (await pool.query(t, p)).rows;
const q1 = async (t, p = []) => (await q(t, p))[0];

/* ---------- Fechas en hora de Colombia ---------- */
function ahoraBog() {
  const f = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const g = t => f.find(x => x.type === t).value;
  return { fecha: `${g('year')}-${g('month')}-${g('day')}`, hora: `${g('hour')}:${g('minute')}` };
}
const hoy = () => ahoraBog().fecha;
const sumarDias = (f, n) => { const d = new Date(f + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const diasEntre = (a, b) => Math.round((new Date(b + 'T12:00:00Z') - new Date(a + 'T12:00:00Z')) / 864e5);
const masAnio = f => { const d = new Date(f + 'T12:00:00Z'); d.setUTCFullYear(d.getUTCFullYear() + 1); return d.toISOString().slice(0, 10); };
const diaSemana = f => new Date(f + 'T12:00:00Z').getUTCDay();
const uid = p => p + crypto.randomBytes(5).toString('hex');
const codigo6 = () => String(crypto.randomInt(100000, 1000000));
const dinero = n => '$' + Math.round(n).toLocaleString('es-CO');
const correoOk = c => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c || '');
const limpio = (s, n = 200) => String(s ?? '').trim().slice(0, n);
const hx = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- Reglas de negocio ---------- */
function estadoVigencia(vence) {
  const h = hoy();
  if (vence >= h) { const r = diasEntre(h, vence); return { k: 'activa', txt: 'Activa', porVencer: r <= 15 ? r : null }; }
  const d = diasEntre(vence, h);
  if (d < 5) return { k: 'activa', txt: 'Activa (gracia)', gracia: true };
  if (d < 10) return { k: 'aviso', dias: 10 - d, txt: `Aviso: ${10 - d} día${10 - d === 1 ? '' : 's'}` };
  return { k: 'cerrada', txt: 'Cerrada por pago' };
}
function estadoMedico(vence) {
  const h = hoy();
  if (vence >= h) { const r = diasEntre(h, vence); return { k: 'activo', txt: 'Activa', porVencer: r <= 15 ? r : null }; }
  const d = diasEntre(vence, h);
  if (d < 10) return { k: 'aviso', dias: 10 - d, txt: `Vencida: visible sin pacientes · ${10 - d} día${10 - d === 1 ? '' : 's'} para bloqueo` };
  return { k: 'bloqueado', txt: 'Bloqueada por pago' };
}
const ahoraVigente = p => !!p.ahora && (p.urgencias || p.institucion || !p.ahora_desde || (Date.now() - new Date(p.ahora_desde).getTime()) < 3 * 3600e3);
const puedeRecibir = p => p.estado === 'aprobado' && (p.institucion || estadoMedico(p.vence).k === 'activo');
const visible = p => p.estado === 'aprobado' && (p.institucion || estadoMedico(p.vence).k !== 'bloqueado');
const VIS_SQL = `estado='aprobado' AND demo=false`;
const VIS_DEMO = `estado='aprobado'`;

let cacheAjustes = null;
async function ajustes() { const a = await ajustesBase(); return { ciudadesAbiertas: ['Santa Marta'], inasistencia: 50, diasRetiro: 8, ...a }; }
async function ajustesBase() { if (!cacheAjustes) cacheAjustes = (await q1('SELECT datos FROM ajustes WHERE id=1')).datos; return cacheAjustes; }
function precioPlan(a, n) { const extra = Math.max(0, n - a.incluidos) * a.adicional; return { regular: a.precioRegular + extra, enLinea: a.precioEnLinea + extra, extra }; }
async function fundadoresEn(ciudad) { return Number((await q1(`SELECT count(*)::int n FROM prestadores WHERE fundador AND ciudad=$1 AND (demo=false OR ${DEMO})`, [ciudad])).n); }

/* ---------- Errores ---------- */
class Fallo extends Error { constructor(m, s = 400) { super(m); this.s = s; } }
const h = fn => (req, res) => fn(req, res).catch(e => {
  if (e instanceof Fallo) return res.status(e.s).json({ error: e.message });
  console.error(e); res.status(500).json({ error: 'Error del servidor. Intente de nuevo en un momento.' });
});

/* ---------- Correos (Brevo) ---------- */
let CUPO = { dia: '', n: 0 };
async function correo(para, asunto, html) {
  const d = hoy(); if (CUPO.dia !== d) CUPO = { dia: d, n: 0 };
  if (CUPO.n >= 280) { console.error(`[cupo Brevo] sin enviar: ${para} · ${asunto}`); return; }
  CUPO.n++;
  if (!E.BREVO_API_KEY) { console.log(`[correo sin Brevo] ${para} · ${asunto}`); return; }
  try {
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST', headers: { 'api-key': E.BREVO_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: { name: 'FamilIA Salud', email: E.BREVO_REMITENTE || 'contacto@skynetgenesis.com' }, to: [{ email: para }], subject: asunto,
        htmlContent: `<div style="font-family:Arial,sans-serif;color:#15232B">${html}<p style="font-size:12px;color:#5B6B73;margin-top:24px">FamilIA Salud · ${SKYNET}</p></div>` })
    });
    if (!r.ok) console.error('Brevo', r.status, await r.text());
  } catch (e) { console.error('Brevo', e.message); }
}

/* ---------- Bold ---------- */
// Plan del firmador central según el tipo de pago
function planDe(tipo, monto, extra = {}) {
  if (tipo === 'consulta') return `${APP_BOLD}:paq_cien-x${Math.round(monto / 100)}`;
  if (tipo === 'prueba') return `${APP_BOLD}:prueba`;
  if (tipo === 'registro_medico') return `${APP_BOLD}:${extra.fundador ? 'fund' : 'esp'}`;
  if (tipo === 'renovacion_medico') return `${APP_BOLD}:esp`;
  const ad = extra.adicionales || 0;   // afiliación o renovación familiar
  return ad > 0 ? `${APP_BOLD}:paq_afil_adic-x${ad}` : `${APP_BOLD}:afil`;
}
async function firmar(plan, orden, monto) {
  const u = `${FIRMADOR}?plan=${encodeURIComponent(plan)}&empresa=${encodeURIComponent(orden)}&meses=1&volver=${encodeURIComponent(FRONT + '/')}`;
  let d;
  try { const r = await fetch(u, { headers: { 'User-Agent': UA, Accept: 'application/json' } }); d = await r.json(); }
  catch (e) { throw new Fallo('La pasarela de pago no respondió. Intente de nuevo en un momento.', 502); }
  const valor = Number(d.amount ?? d.valor ?? d.monto);
  if (!d || d.error || !valor) { console.error('firmador', JSON.stringify(d)); throw new Fallo('No se pudo preparar el pago. Intente de nuevo.', 502); }
  if (valor !== monto) { console.error('firmador: valor distinto', plan, valor, monto); throw new Fallo('El precio no coincide con la pasarela. Avísenos por WhatsApp.', 409); }
  const orderId = d.orderId || d.order_id || d.orden;
  return { orderId, bold: { orderId, currency: 'COP', amount: String(valor), apiKey: d.apiKey || d.api_key || d.llave, integritySignature: d.signature || d.integritySignature || d.integrity_signature || d.firma, description: d.description || d.descripcion || 'FamilIA Salud', redirectionUrl: d.redirectionUrl || d.redirection_url || FRONT + '/' } };
}
async function crearOrden(tipo, monto, datos, extra = {}) {
  const orden = 'FS' + Date.now().toString(36).toUpperCase() + crypto.randomBytes(3).toString('hex').toUpperCase();
  const claim = crypto.randomBytes(16).toString('hex');
  const plan = planDe(tipo, monto, extra);
  await q(`INSERT INTO pagos(orden,tipo,claim,monto,comision,neto,estado,datos,prestador_id,familia_id,cita_id,plan) VALUES($1,$2,$3,$4,$5,$6,'pendiente',$7,$8,$9,$10,$11)`,
    [orden, tipo, claim, monto, extra.comision || 0, extra.neto || 0, datos || {}, extra.prestador || null, extra.familia || null, extra.cita || null, plan]);
  const base = { orden, claim, monto, descripcion: extra.desc || 'FamilIA Salud' };
  // Oferta sin costo (ej. primer año gratis del Especialista Fundador): se aplica sin pasarela
  if (monto === 0 && tipo === 'registro_medico') { await aplicarPago(orden, 'GRATIS'); return { ...base, gratis: true }; }
  if (DEMO_PAGOS || extra.demo) { await q('UPDATE pagos SET demo=true WHERE orden=$1', [orden]); return { ...base, demo: true }; }
  const f = await firmar(plan, orden, monto);
  await q('UPDATE pagos SET bold_ref=$2 WHERE orden=$1', [orden, f.orderId]);
  return { ...base, bold: f.bold };
}

// Confirma con el verificador central lo que Bold aprobó y lo aplica (idempotente)
async function confirmarBold(params) {
  const u = `${VERIFICADOR}?${new URLSearchParams({ ...params, app: APP_BOLD })}`;
  let j;
  try { const r = await fetch(u, { headers: { 'User-Agent': UA, Accept: 'application/json' } }); j = await r.json(); }
  catch (e) { return { estado: 'sin_respuesta' }; }
  const o = j.orden || j.order || j.data || j;
  if (!o || !(o.empresa || o.company)) return { estado: 'no_encontrado' };
  const orden = String(o.empresa || o.company).split('__')[0];
  const pagoId = String(o.pago_id || o.payment_id || o.pago || params.pago || '');
  const valor = Number(o.valor ?? o.amount ?? o.monto ?? 0), plan = String(o.plan || '');
  const p = await q1('SELECT * FROM pagos WHERE orden=$1', [orden]);
  if (!p) return { estado: 'no_encontrado' };
  if (['aprobado', 'retenido', 'liberado', 'por_reembolsar', 'reembolsado'].includes(p.estado)) {
    if (pagoId && p.bold_id && p.bold_id !== pagoId) {
      const nuevo = await q1(`INSERT INTO pagos_extra(pago_id,orden,valor,nota) VALUES($1,$2,$3,$4) ON CONFLICT(pago_id) DO NOTHING RETURNING pago_id`, [pagoId, orden, valor, 'Segundo pago del mismo pedido: devolver o abonar']);
      if (nuevo) correo(DUENO_CORREO, 'FamilIA Salud: pago doble para revisar', `<p>Llegó un segundo pago (${hx(pagoId)}) por ${dinero(valor)} de la orden ${hx(orden)}, que ya estaba pagada. Revíselo en Administración → Pagos y retiros.</p>`);
      return { estado: 'revisar', orden };
    }
    return { estado: 'aplicado', orden };
  }
  if ((p.plan && plan && p.plan !== plan) || valor < p.monto) {
    await q(`UPDATE pagos SET estado='revisar', nota=$2 WHERE orden=$1 AND estado='pendiente'`, [orden, `Bold reportó plan ${plan} por ${valor}`]);
    correo(DUENO_CORREO, 'FamilIA Salud: pago para revisar', `<p>El pago ${hx(pagoId)} de la orden ${hx(orden)} no cuadra (plan ${hx(plan)}, valor ${dinero(valor)}, esperado ${dinero(p.monto)}).</p>`);
    return { estado: 'revisar', orden };
  }
  await aplicarPago(orden, pagoId || 'BOLD');
  return { estado: 'aplicado', orden };
}
async function revisarPendientes() {
  try { for (const r of await q(`SELECT bold_ref FROM pagos WHERE estado='pendiente' AND bold_ref IS NOT NULL AND creado>now()-interval '3 days' AND creado<now()-interval '2 minutes'`)) await confirmarBold({ ref: r.bold_ref }); }
  catch (e) { console.error('pendientes', e.message); }
}

/* ---------- Saldo a favor de la familia ---------- */
async function acreditar(cx, familiaId, monto, concepto) {
  if (!monto) return;
  await cx.query('UPDATE familias SET saldo=coalesce(saldo,0)+$2 WHERE id=$1', [familiaId, monto]);
  await cx.query('INSERT INTO saldo_mov(id,familia_id,monto,concepto) VALUES($1,$2,$3,$4)', [uid('m'), familiaId, monto, concepto]);
}
// Devuelve una consulta pagada al saldo de la familia (dentro de una transacción con el pago bloqueado)
async function devolverConsulta(citaId, estadoCita, concepto) {
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const pg = (await c.query(`SELECT * FROM pagos WHERE cita_id=$1 AND estado='retenido' FOR UPDATE`, [citaId])).rows[0];
    await c.query('UPDATE citas SET estado=$2 WHERE id=$1', [citaId, estadoCita]);
    if (pg) { await c.query(`UPDATE pagos SET estado='acreditado' WHERE orden=$1`, [pg.orden]); if (!pg.demo) await acreditar(c, pg.familia_id, pg.monto, concepto); }
    await c.query('COMMIT'); return pg;
  } catch (e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); }
}
const minutosHasta = (fecha, hora) => { const A = ahoraBog(); return diasEntre(A.fecha, fecha) * 1440 + (Number(hora.slice(0, 2)) * 60 + Number(hora.slice(3))) - (Number(A.hora.slice(0, 2)) * 60 + Number(A.hora.slice(3))); };
async function bloqueosDe(correos) { return correos.length ? q(`SELECT correo,desde,hasta FROM bloqueos WHERE lower(correo)=ANY($1) AND hasta>=$2`, [correos.map(x => String(x || '').toLowerCase()), hoy()]) : []; }
const bloqueado = (bls, correo, fecha) => bls.some(b => b.correo.toLowerCase() === String(correo || '').toLowerCase() && fecha >= b.desde && fecha <= b.hasta);
const claveQR = carnet => crypto.createHmac('sha256', E.CLAVE_QR || crypto.createHash('sha256').update(String(E.DATABASE_URL || 'fs')).digest('hex')).update(carnet).digest('hex').slice(0, 16);

/* ---------- Pagadores ---------- */
async function pagadorDe(p) {
  if (p.familia_id) { const f = await q1('SELECT titular nombre, correo FROM familias WHERE id=$1', [p.familia_id]); if (f) return f; }
  if (p.prestador_id) { const m = await q1('SELECT nombre, correo FROM prestadores WHERE id=$1', [p.prestador_id]); if (m) return m; }
  return { nombre: (p.datos || {}).titular || (p.datos || {}).nombre || '', correo: (p.datos || {}).correo || '' };
}
const metodoDe = b => b === 'DEMO' ? 'Demostración' : b === 'SALDO' ? 'Saldo a favor' : String(b || '').startsWith('MANUAL') ? 'Corrección del Superadministrador' : 'Pago en línea';
const NOMBRE_TIPO = { prueba: 'Pago de prueba', afiliacion: 'Afiliación familiar', renovacion_familia: 'Renovación familiar', registro_medico: 'Registro de especialista', renovacion_medico: 'Renovación de especialista', consulta: 'Consulta' };

async function aplicarPago(orden, boldId = null) {
  const c = await pool.connect();
  let aviso = null;
  try {
    await c.query('BEGIN');
    const p = (await c.query('SELECT * FROM pagos WHERE orden=$1 FOR UPDATE', [orden])).rows[0];
    if (!p || !['pendiente', 'revisar'].includes(p.estado)) { await c.query('COMMIT'); return p; }
    const d = p.datos || {}; const H = hoy();
    if (p.tipo === 'prueba') await c.query(`UPDATE pagos SET estado='aprobado',aprobado=now(),bold_id=$2 WHERE orden=$1`, [orden, boldId]);
    const yaExiste = p.tipo === 'afiliacion' ? (await c.query('SELECT id,vence FROM familias WHERE lower(correo)=lower($1)', [d.correo])).rows[0] : null;
    if (p.tipo === 'prueba') { /* solo queda aprobado */ }
    else if (yaExiste) {
      await c.query('UPDATE familias SET vence=$2 WHERE id=$1', [yaExiste.id, masAnio(yaExiste.vence >= H ? yaExiste.vence : H)]);
      await c.query(`UPDATE pagos SET estado='aprobado',familia_id=$2,aprobado=now(),bold_id=$3 WHERE orden=$1`, [orden, yaExiste.id, boldId]);
    } else if (p.tipo === 'afiliacion') {
      const fid = uid('f');
      await c.query('INSERT INTO familias(id,titular,correo,telefono,ciudad,vence,activada,aceptacion) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [fid, d.titular, d.correo, d.telefono, d.ciudad, masAnio(H), H, d.aceptacion || null]);
      for (const [i, m] of (d.miembros || []).entries()) await c.query('INSERT INTO miembros(familia_id,orden,nombre,doc,parentesco) VALUES($1,$2,$3,$4,$5)', [fid, i, m.nombre, m.doc, m.parentesco]);
      await c.query(`UPDATE pagos SET estado='aprobado',familia_id=$2,aprobado=now(),bold_id=$3 WHERE orden=$1`, [orden, fid, boldId]);
      aviso = () => enviarEnlace(d.correo, 'familia', 'crear').then(() => correo(d.correo, 'Su carnet FamilIA Salud está activo', `<h2>¡Bienvenidos a FamilIA Salud!</h2><p>El carnet de ${d.miembros.length} persona(s) quedó activo hasta el ${masAnio(H)}.</p><p>En otro correo le enviamos el enlace para crear su contraseña.</p>`));
    } else if (p.tipo === 'renovacion_familia') {
      const f = (await c.query('SELECT vence FROM familias WHERE id=$1', [p.familia_id])).rows[0];
      await c.query('UPDATE familias SET vence=$2 WHERE id=$1', [p.familia_id, masAnio(f.vence >= H ? f.vence : H)]);
      await c.query(`UPDATE pagos SET estado='aprobado',aprobado=now(),bold_id=$2 WHERE orden=$1`, [orden, boldId]);
    } else if (p.tipo === 'registro_medico') {
      const pid = uid('d');
      await c.query(`INSERT INTO prestadores(id,nombre,cedula,servicio,ciudad,sede,correo,celular,rethus,reps,mensaje,tarifa,particular,dias,horas,banco,propio,estado,vence,fundador,doc_data,doc_tipo,doc_nombre,selfie_data,aceptacion)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,'verificando',$18,$19,$20,$21,$22,$23,$24)`,
        [pid, d.nombre, d.cedula, d.servicio, d.ciudad, d.sede, d.correo, d.celular, d.rethus, d.reps, d.mensaje, d.tarifa, d.particular, d.dias, d.horas, d.banco, /reina elizabeth/i.test(d.sede || ''), masAnio(H), !!d.fundador, d.doc, d.docTipo, d.docNombre, d.selfie, d.aceptacion || null]);
      await c.query(`UPDATE pagos SET estado='aprobado',prestador_id=$2,aprobado=now(),bold_id=$3,datos=$4 WHERE orden=$1`, [orden, pid, boldId, { correo: d.correo, nombre: d.nombre, ciudad: d.ciudad, fundador: !!d.fundador }]);
      if (d.solicitud) await c.query(`UPDATE solicitudes SET estado='registrado' WHERE id=$1`, [d.solicitud]);
      aviso = () => enviarEnlace(d.correo, 'medico', 'crear').then(() => correo(d.correo, 'Recibimos su registro en FamilIA Salud', `<h2>Gracias, ${hx(d.nombre)}</h2><p>Recibimos su registro. Nuestro equipo está confirmando su registro profesional en el ReTHUS; le avisaremos apenas quede habilitado. En otro correo le enviamos el enlace para crear su contraseña.</p>`));
    } else if (p.tipo === 'renovacion_medico') {
      const rows = (await c.query('SELECT id,vence FROM prestadores WHERE id = ANY($1)', [d.ids])).rows;
      for (const r of rows) await c.query('UPDATE prestadores SET vence=$2 WHERE id=$1', [r.id, masAnio(r.vence >= H ? r.vence : H)]);
      await c.query(`UPDATE pagos SET estado='aprobado',aprobado=now(),bold_id=$2 WHERE orden=$1`, [orden, boldId]);
    } else if (p.tipo === 'consulta') {
      await c.query(`UPDATE citas SET estado='confirmada' WHERE id=$1`, [p.cita_id]);
      await c.query(`UPDATE pagos SET estado='retenido',aprobado=now(),bold_id=$2 WHERE orden=$1`, [orden, boldId]);
      const ct = (await c.query('SELECT c.*,p.correo pc,p.servicio,p.nombre pn,p.sede,f.correo fc FROM citas c JOIN prestadores p ON p.id=c.prestador_id JOIN familias f ON f.id=c.familia_id WHERE c.id=$1', [p.cita_id])).rows[0];
      if (!ct.demo) aviso = async () => {
        await correo(ct.pc, ct.inmediata ? 'Paciente en camino: atención inmediata' : 'Nueva consulta confirmada', `<h2>${ct.inmediata ? 'Un paciente va en camino' : 'Nueva consulta confirmada'}</h2><p>${hx(ct.miembro)} (carnet ${ct.carnet}) · ${hx(ct.servicio)}<br>${ct.inmediata ? 'Atención inmediata' : ct.fecha + ' a las ' + ct.hora}</p><p>Al terminar, pida el código de atención y regístrelo en su portal para recibir el pago.</p>`);
        await correo(ct.fc, 'Consulta confirmada · FamilIA Salud', `<h2>Consulta confirmada</h2><p>${hx(ct.miembro)} · ${hx(ct.servicio)}<br>Profesional: ${hx(ct.pn)}<br>${ct.inmediata ? 'Diríjase ahora mismo' : ct.fecha + ' a las ' + ct.hora}<br>Dirección: ${hx(ct.sede)}</p><p>Código de atención: <b style="font-size:20px;letter-spacing:3px">${ct.codigo}</b><br>Entréguelo al profesional al terminar la consulta.</p>`);
      };
    }
    await c.query('COMMIT');
  } catch (e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); }
  if (aviso) aviso().catch(() => {});
  return q1('SELECT * FROM pagos WHERE orden=$1', [orden]);
}

/* ---------- Sesiones ---------- */
async function sesion(req, tipo) {
  const t = (req.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!t) return null;
  return (await q1('SELECT * FROM sesiones WHERE token=$1 AND tipo=$2 AND expira>now()', [t, tipo])) || null;
}
const requiere = tipo => async (req, res, next) => {
  try { const s = await sesion(req, tipo); if (!s) return res.status(401).json({ error: 'Su sesión terminó. Ingrese de nuevo.' }); req.s = s; next(); }
  catch (e) { console.error(e); res.status(500).json({ error: 'Error del servidor.' }); }
};
async function crearSesion(tipo, ref, rol = null) {
  const token = crypto.randomBytes(24).toString('hex');
  await q(`INSERT INTO sesiones(token,tipo,ref,rol,expira) VALUES($1,$2,$3,$4,now()+interval '${tipo === 'admin' ? '12 hours' : '30 days'}')`, [token, tipo, ref, rol]);
  return token;
}

/* ---------- Aplicación ---------- */
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);
const ipDe = req => String(req.get('cf-connecting-ip') || (req.get('x-forwarded-for') || '').split(',')[0] || req.ip || '').trim();
// Intentos de ingreso por correo + IP (5 fallos = 15 minutos) y tope por correo desde cualquier IP (30 por hora)
const INTENTOS = new Map();
function intento(clave, max, ventanaMs) {
  const ahora = Date.now(), r = INTENTOS.get(clave) || { n: 0, desde: ahora, hasta: 0 };
  if (r.hasta > ahora) return { bloqueado: true, r };
  if (ahora - r.desde > ventanaMs) { r.n = 0; r.desde = ahora; r.hasta = 0; }
  r.n++; if (r.n >= max) r.hasta = ahora + 15 * 60e3;
  INTENTOS.set(clave, r); return { bloqueado: false, r };
}
setInterval(() => { const a = Date.now(); for (const [k, r] of INTENTOS) if (r.hasta < a && a - r.desde > 3600e3) INTENTOS.delete(k); }, 600e3);
app.use((req, res, next) => {
  const o = req.get('origin');
  if (o && (ORIGENES.includes(o) || /^https:\/\/[a-z0-9-]+\.skynetgenesis\.com$/.test(o) || (DEMO && /^https:\/\/([a-z0-9-]+\.)*claude(usercontent)?\.(ai|com)$/.test(o)))) {
    res.set('Access-Control-Allow-Origin', o); res.set('Vary', 'Origin');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json({ limit: '6mb' }));
// El receptor central de skynetgenesis.com avisa aquí; se confirma consultando el verificador central
app.post('/api/bold/aplicar', async (req, res) => {
  try {
    const b = req.body || {};
    const pago = String(b.pago_id || b.payment_id || b.pago || b.id || '');
    const ref = String(b.referencia || b.reference || b.orderId || b.order_id || '');
    if (!pago && !ref) return res.status(400).json({ ok: false });
    const r = await confirmarBold(pago ? { pago } : { ref });
    if (r.estado === 'aplicado' || r.estado === 'revisar') return res.json({ ok: true });
    res.status(404).json({ ok: false, estado: r.estado });
  } catch (e) { console.error('aplicar', e); res.status(500).json({ ok: false }); }
});
app.get('/api/bold/volver', async (req, res) => {
  try { const ref = limpio(req.query.ref, 80); if (!ref) return res.status(400).json({ ok: false }); res.json(await confirmarBold({ ref })); }
  catch (e) { console.error('volver', e); res.status(500).json({ ok: false }); }
});
app.get('/api/ping', (req, res) => res.json({ ok: true, hora: ahoraBog() }));

/* ----- Ingreso con contraseña (como el panel de skynetgenesis.com) ----- */
const hashClave = clave => new Promise((ok, mal) => { const sal = crypto.randomBytes(16); crypto.scrypt(clave, sal, 64, (e, k) => e ? mal(e) : ok(sal.toString('hex') + ':' + k.toString('hex'))); });
let HASH_FALSO = 'aa:' + 'b'.repeat(128);
const verificarClave = (clave, h) => new Promise(ok => { if (!h) return ok(false); const [sal, k] = h.split(':'); crypto.scrypt(clave, Buffer.from(sal, 'hex'), 64, (e, r) => ok(!e && crypto.timingSafeEqual(r, Buffer.from(k, 'hex')))); });
async function existeCuenta(correoU, tipo) {
  if (tipo === 'familia') return q1('SELECT id ref FROM familias WHERE lower(correo)=$1 AND (demo=false OR $2)', [correoU, DEMO]);
  if (tipo === 'medico') return q1(`SELECT lower(correo) ref FROM prestadores WHERE lower(correo)=$1 AND estado<>'rechazado' AND (demo=false OR $2) LIMIT 1`, [correoU, DEMO]);
  return q1('SELECT lower(correo) ref, rol FROM equipo WHERE lower(correo)=$1 AND (demo=false OR $2)', [correoU, DEMO]);
}
const TIPOS = ['familia', 'medico', 'admin'];
const NOMBRE_CUENTA = { familia: 'Mi familia', medico: 'Portal médico', admin: 'Acceso SkyNet Genesis' };
async function enviarEnlace(correoU, tipo, motivo = 'crear o cambiar') {
  const token = crypto.randomBytes(24).toString('hex');
  await q(`INSERT INTO enlaces(token,correo,tipo,expira) VALUES($1,$2,$3,now()+interval '1 hour')`, [crypto.createHash('sha256').update(token).digest('hex'), correoU, tipo]);
  const destino = DUENO_CUENTAS.includes(correoU) ? DUENO_CORREO : correoU;
  await correo(destino, 'Su contraseña de FamilIA Salud', `<p>Recibimos una solicitud para ${motivo} la contraseña de la cuenta <b>${hx(correoU)}</b> (${NOMBRE_CUENTA[tipo]}).</p><p><a href="${FRONT}/#/clave/${tipo}/${token}" style="background:#14A38B;color:#fff;padding:12px 18px;border-radius:10px;text-decoration:none;font-weight:bold">Crear mi contraseña</a></p><p>El enlace sirve una sola vez y vence en 1 hora. Si usted no lo pidió, ignore este mensaje.</p>`);
  if (!E.BREVO_API_KEY) console.log(`[enlace] ${correoU} (${tipo}): ${FRONT}/#/clave/${tipo}/${token}`);
}
app.post('/api/auth/entrar', h(async (req, res) => {
  const correoU = limpio(req.body.correo, 120).toLowerCase(), tipo = req.body.tipo, clave = String(req.body.clave || '');
  if (!correoOk(correoU) || !TIPOS.includes(tipo)) throw new Fallo('Escriba un correo válido.');
  const k1 = intento(`${tipo}|${correoU}|${ipDe(req)}`, 5, 15 * 60e3), k2 = intento(`${tipo}|${correoU}`, 30, 3600e3);
  if (k1.bloqueado || k2.bloqueado) throw new Fallo('Demasiados intentos. Espere 15 minutos e intente de nuevo.', 429);
  const ent = await existeCuenta(correoU, tipo);
  const c = await q1('SELECT * FROM cuentas WHERE correo=$1 AND tipo=$2', [correoU, tipo]);
  const okClave = await verificarClave(clave, (c && c.hash) || HASH_FALSO) && !!ent && !!(c && c.hash);
  if (c && c.bloqueada) throw new Fallo('Esta cuenta está bloqueada. Escríbanos por WhatsApp al 304 437 5758.', 403);
  if (!okClave) {
    const quedan = 5 - k1.r.n;
    throw new Fallo(quedan > 0 && quedan <= 2 ? `El correo o la contraseña no son correctos. Le quedan ${quedan} intento${quedan === 1 ? '' : 's'} antes de esperar 15 minutos.` : quedan <= 0 ? 'Demasiados intentos. Espere 15 minutos e intente de nuevo.' : 'El correo o la contraseña no son correctos. Si es su primera vez, toque "Primera vez u olvidó su contraseña".', 401);
  }
  INTENTOS.delete(`${tipo}|${correoU}|${ipDe(req)}`);
  await q('UPDATE cuentas SET intentos=0, bloqueo=NULL, ultimo=now() WHERE correo=$1 AND tipo=$2', [correoU, tipo]);
  res.json({ token: await crearSesion(tipo, ent.ref, ent.rol || null), rol: ent.rol || null });
}));
app.post('/api/auth/enlace', h(async (req, res) => {
  const correoU = limpio(req.body.correo, 120).toLowerCase(), tipo = req.body.tipo;
  if (!correoOk(correoU) || !TIPOS.includes(tipo)) throw new Fallo('Escriba un correo válido.');
  const reciente = await q1(`SELECT 1 FROM enlaces WHERE correo=$1 AND tipo=$2 AND expira>now()+interval '59 minutes'`, [correoU, tipo]);
  if (reciente) throw new Fallo('Ya le enviamos un enlace. Revise su correo o espere un minuto.', 429);
  const c = await q1('SELECT bloqueada FROM cuentas WHERE correo=$1 AND tipo=$2', [correoU, tipo]);
  if (await existeCuenta(correoU, tipo) && !(c && c.bloqueada) && !CORREOS_DEMO.includes(correoU)) {
    await q(`INSERT INTO cuentas(correo,tipo) VALUES($1,$2) ON CONFLICT DO NOTHING`, [correoU, tipo]);
    enviarEnlace(correoU, tipo).catch(e => console.error('enlace', e.message));
  }
  // Misma respuesta exista o no la cuenta
  const mostrar = correoU.replace(/^(.{2}).*(@.*)$/, '$1••••••$2');
  res.json({ ok: true, mensaje: `Si ${mostrar} tiene una cuenta, le enviamos un enlace para crear su contraseña. Vence en 1 hora.` });
}));
app.post('/api/auth/clave', h(async (req, res) => {
  const t = crypto.createHash('sha256').update(String(req.body.token || '')).digest('hex'), clave = String(req.body.clave || ''), clave2 = String(req.body.clave2 || '');
  if (clave.length < 10) throw new Fallo('La contraseña debe tener mínimo 10 caracteres.');
  if (clave !== clave2) throw new Fallo('Las dos contraseñas no coinciden.');
  const e = await q1(`UPDATE enlaces SET usado=true WHERE token=$1 AND usado=false AND expira>now() RETURNING correo,tipo`, [t]);
  if (!e) throw new Fallo('El enlace ya se usó o venció. Pida uno nuevo.');
  const ent = await existeCuenta(e.correo, e.tipo); if (!ent) throw new Fallo('La cuenta ya no existe.');
  await q(`INSERT INTO cuentas(correo,tipo,hash,intentos,bloqueo,ultimo) VALUES($1,$2,$3,0,NULL,now()) ON CONFLICT(correo,tipo) DO UPDATE SET hash=$3,intentos=0,bloqueo=NULL,ultimo=now()`, [e.correo, e.tipo, await hashClave(clave)]);
  await q('DELETE FROM sesiones WHERE ref=$1 AND tipo=$2', [ent.ref, e.tipo]);
  res.json({ token: await crearSesion(e.tipo, ent.ref, ent.rol || null), tipo: e.tipo, rol: ent.rol || null });
}));
app.post('/api/auth/cambiar', h(async (req, res) => {
  const tipo = req.body.tipo; if (!TIPOS.includes(tipo)) throw new Fallo('Tipo no válido.');
  const s = await sesion(req, tipo); if (!s) throw new Fallo('Su sesión terminó. Ingrese de nuevo.', 401);
  const correoU = tipo === 'familia' ? (await q1('SELECT lower(correo) c FROM familias WHERE id=$1', [s.ref])).c : s.ref;
  if (CORREOS_DEMO.includes(correoU)) throw new Fallo('En la demostración no se cambia la contraseña.');
  const c = await q1('SELECT hash FROM cuentas WHERE correo=$1 AND tipo=$2', [correoU, tipo]);
  if (c && c.hash && !(await verificarClave(String(req.body.actual || ''), c.hash))) throw new Fallo('La contraseña actual no es correcta.');
  const n = String(req.body.nueva || ''); if (n.length < 10) throw new Fallo('La contraseña nueva debe tener mínimo 10 caracteres.');
  if (n !== String(req.body.nueva2 || '')) throw new Fallo('Las dos contraseñas nuevas no coinciden.');
  await q(`INSERT INTO cuentas(correo,tipo,hash) VALUES($1,$2,$3) ON CONFLICT(correo,tipo) DO UPDATE SET hash=$3`, [correoU, tipo, await hashClave(n)]);
  res.json({ ok: true });
}));
// Manuales: cada cuenta abre solo el suyo; el general es público
const DIR_MAN = path.join(path.dirname(fileURLToPath(import.meta.url)), 'manuales');
const MANUALES = { general: '00-General', familia: '01-Familia', especialista: '02-Especialista', sede: '03-Sede-propia', superior: '04-Superadministrador', verificador: '05-Verificador', contabilidad: '06-Contabilidad', operador: '07-Operador' };
app.get('/api/manual', h(async (req, res) => {
  let m = String(req.query.m || 'general'); const tipo = String(req.query.tipo || '');
  let permitidos = ['general'], propio = 'general';
  if (TIPOS.includes(tipo)) {
    const s = await sesion(req, tipo);
    if (!s) throw new Fallo('Su sesión terminó. Ingrese de nuevo.', 401);
    if (tipo === 'familia') propio = 'familia';
    if (tipo === 'medico') { const p = await q1('SELECT bool_or(institucion) i FROM prestadores WHERE lower(correo)=$1', [s.ref]); propio = p && p.i ? 'sede' : 'especialista'; }
    if (tipo === 'admin') propio = s.rol;
    permitidos = tipo === 'admin' && s.rol === 'superior' ? Object.keys(MANUALES) : ['general', propio];
  }
  if (m === 'mio') m = propio;
  if (!Object.hasOwn(MANUALES, m) || !permitidos.includes(m)) throw new Fallo('Este manual no está disponible para su cuenta.', 403);
  res.set('Content-Type', 'application/pdf'); res.set('Cache-Control', 'no-store');
  res.set('Content-Disposition', `inline; filename="FamilIA-Salud-Manual-${MANUALES[m]}.pdf"`);
  res.send(fs.readFileSync(path.join(DIR_MAN, MANUALES[m] + '.pdf')));
}));
app.post('/api/auth/salir', h(async (req, res) => { const t = (req.get('authorization') || '').replace(/^Bearer\s+/i, ''); if (t) await q('DELETE FROM sesiones WHERE token=$1', [t]); res.json({ ok: true }); }));

/* ----- Pagos ----- */
app.get('/api/pagos/:orden', h(async (req, res) => {
  const p = await q1('SELECT * FROM pagos WHERE orden=$1', [req.params.orden]);
  if (!p) throw new Fallo('Pago no encontrado.', 404);
  const out = { estado: p.estado, tipo: p.tipo, monto: p.monto };
  const listo = ['aprobado', 'retenido', 'liberado'].includes(p.estado);
  if (listo && req.query.claim && req.query.claim === p.claim) {
    if (p.tipo === 'afiliacion') out.token = await crearSesion('familia', p.familia_id);
    if (p.tipo === 'registro_medico') out.token = await crearSesion('medico', String(p.datos.correo).toLowerCase());
    if (p.tipo === 'consulta') {
      const c = await q1('SELECT c.miembro,c.fecha,c.hora,c.inmediata,c.codigo,p.servicio,p.nombre,p.sede FROM citas c JOIN prestadores p ON p.id=c.prestador_id WHERE c.id=$1', [p.cita_id]);
      out.cita = c;
    }
  }
  res.json(out);
}));
app.post('/api/pagos/:orden/simular', h(async (req, res) => {
  const p = await q1('SELECT claim,demo FROM pagos WHERE orden=$1', [req.params.orden]);
  if (!p || p.claim !== req.body.claim) throw new Fallo('Pago no encontrado.', 404);
  if (!DEMO_PAGOS && !p.demo) throw new Fallo('Este pago es real: se hace en la pasarela.', 403);
  await aplicarPago(req.params.orden, 'DEMO');
  res.json({ ok: true });
}));

/* ----- Público ----- */
app.get('/api/publico/config', h(async (req, res) => {
  const a = await ajustes();
  const ps = await q(`SELECT ciudad,servicio,institucion,ahora,ahora_desde,urgencias,estado,vence,fundador FROM prestadores WHERE ${VIS_SQL}`);
  const fundadores = {}, ahora = {}, conRed = {}, espCiudad = {}, espTodas = new Set();
  for (const p of ps) {
    if (p.fundador) fundadores[p.ciudad] = (fundadores[p.ciudad] || 0) + 1;
    if (!visible(p)) continue;
    conRed[p.ciudad] = (conRed[p.ciudad] || 0) + 1;
    if (puedeRecibir(p)) { (espCiudad[p.ciudad] = espCiudad[p.ciudad] || new Set()).add(p.servicio); espTodas.add(p.servicio); }
    if (puedeRecibir(p) && (ahoraVigente(p) || p.urgencias)) ahora[p.ciudad] = (ahora[p.ciudad] || 0) + 1;
  }
  const ips = [...new Set(ps.filter(p => p.institucion).map(p => p.servicio))];
  const especialidades = Object.fromEntries(Object.entries(espCiudad).map(([c, st]) => [c, st.size]));
  res.json({ ciudadesAbiertas: a.ciudadesAbiertas, ajustes: a, fundadores, ahora, conRed, ips, especialidades, especialidadesTotal: espTodas.size, catalogo: CATALOGO, ciudades: CIUDADES, demo: DEMO, demoPagos: DEMO_PAGOS });
}));
async function familiaActiva(req) {
  const s = await sesion(req, 'familia'); if (!s) return null;
  const f = await q1('SELECT * FROM familias WHERE id=$1', [s.ref]);
  return f && estadoVigencia(f.vence).k !== 'cerrada' ? f : null;
}
app.get('/api/publico/ciudad/:ciudad', h(async (req, res) => {
  const ciudad = req.params.ciudad; if (!CIUDADES.includes(ciudad)) throw new Fallo('Ciudad no válida.', 404);
  const fam = await familiaActiva(req);
  const rows = (await q(`SELECT id,correo,servicio,ciudad,institucion,propio,domicilio,urgencias,ahora,ahora_desde,dias,horas,tarifa,particular,mensaje,nota,vence,estado FROM prestadores WHERE ciudad=$1 AND ${fam && fam.demo ? VIS_DEMO : VIS_SQL}`, [ciudad])).filter(visible);
  const ids = rows.map(r => r.id), H = hoy();
  const ocup = ids.length ? await q(`SELECT prestador_id,fecha,hora FROM citas WHERE prestador_id=ANY($1) AND fecha>=$2 AND demo=$3 AND (estado='confirmada' OR (estado='pendiente_pago' AND creado>now()-interval '30 minutes'))`, [ids, H, !!(fam && fam.demo)]) : [];
  const reps = ids.length ? await q(`SELECT prestador_id,avg(estrellas)::float prom,count(*)::int n,sum(CASE WHEN estrellas>=4 THEN 1 ELSE 0 END)::int buenas FROM resenas WHERE prestador_id=ANY($1) GROUP BY prestador_id`, [ids]) : [];
  const bls = await bloqueosDe([...new Set(rows.map(r => r.correo))]);
  const prestadores = rows.map(p => {
    const misBl = bls.filter(b => b.correo.toLowerCase() === String(p.correo || '').toLowerCase()).map(b => [b.desde, b.hasta]);
    const hoyBl = misBl.some(([d, h2]) => H >= d && H <= h2);
    const base = { id: p.id, bloqueos: misBl, servicio: p.servicio, propio: p.propio || p.institucion, urgencias: p.urgencias, ahora: ahoraVigente(p) && !hoyBl, dias: p.dias, horas: p.horas, recibe: puedeRecibir(p), ocupados: ocup.filter(o => o.prestador_id === p.id).map(o => o.fecha + '|' + o.hora) };
    if (!fam) return base;
    const r = reps.find(x => x.prestador_id === p.id);
    return { ...base, ciudad: p.ciudad, domicilio: p.domicilio, tarifa: p.tarifa, particular: p.particular, mensaje: p.mensaje, nota: p.nota, rep: r ? { prom: r.prom, n: r.n, rec: Math.round(r.buenas * 100 / r.n) } : null };
  });
  const preguntas = await q(`SELECT texto,respuesta,servicio FROM preguntas WHERE ciudad=$1 AND respuesta IS NOT NULL AND respuesta<>'' ORDER BY respondida DESC LIMIT 30`, [ciudad]);
  const a = await ajustes();
  res.json({ prestadores, preguntas, familia: !!fam, abierta: a.ciudadesAbiertas.includes(ciudad), ahora: ahoraBog() });
}));
app.post('/api/publico/espera', h(async (req, res) => {
  const ciudad = req.body.ciudad, correoU = limpio(req.body.correo, 120).toLowerCase();
  if (!CIUDADES.includes(ciudad) || !correoOk(correoU)) throw new Fallo('Escriba un correo válido.');
  await q(`INSERT INTO espera(correo,ciudad,nombre,celular) VALUES($1,$2,$3,$4) ON CONFLICT(correo,ciudad) DO NOTHING`, [correoU, ciudad, limpio(req.body.nombre, 120), limpio(req.body.celular, 30)]);
  res.json({ ok: true });
}));
app.get('/api/verificar/:carnet/:k', h(async (req, res) => {
  const carnet = limpio(req.params.carnet, 20).toUpperCase();
  if (!/^FS-[A-Z0-9]{4}-\d{2}$/.test(carnet) || req.params.k !== claveQR(carnet)) return res.json({ valido: false });
  const f = (await q(`SELECT id,vence FROM familias WHERE upper(right(id,4))=$1`, [carnet.slice(3, 7)]))[0];
  const i = Number(carnet.slice(-2)) - 1;
  const m = f ? (await q('SELECT nombre,doc FROM miembros WHERE familia_id=$1 ORDER BY orden', [f.id]))[i] : null;
  if (!f || !m) return res.json({ valido: false });
  const st = estadoVigencia(f.vence);
  res.json({ valido: true, vigente: st.k !== 'cerrada', vence: f.vence, nombre: m.nombre.split(' ').map(w => w[0] + '.').join(' '), doc: '•••' + String(m.doc).slice(-4) });
}));
app.post('/api/publico/pregunta', h(async (req, res) => {
  const ciudad = req.body.ciudad, servicio = req.body.servicio, texto = limpio(req.body.texto, 400);
  if (!CIUDADES.includes(ciudad) || !ESPECIALIDADES.includes(servicio) || texto.length < 10) throw new Fallo('Escriba su pregunta con un poco más de detalle.');
  await q('INSERT INTO preguntas(id,ciudad,servicio,texto) VALUES($1,$2,$3,$4)', [uid('q'), ciudad, servicio, texto]);
  res.json({ ok: true });
}));

/* ----- Familias ----- */
app.post('/api/familias/activar', h(async (req, res) => {
  const a = await ajustes(), b = req.body;
  const d = { titular: limpio(b.titular, 120), correo: limpio(b.correo, 120).toLowerCase(), telefono: limpio(b.telefono, 30), ciudad: b.ciudad, miembros: [] };
  if (!d.titular || !correoOk(d.correo)) throw new Fallo('Escriba el nombre del titular y un correo válido.');
  if (!CIUDADES.includes(d.ciudad)) throw new Fallo('Elija una ciudad.');
  if (!a.ciudadesAbiertas.includes(d.ciudad)) throw new Fallo('El programa aún no está abierto en esa ciudad. Déjenos su correo en la página de la ciudad y le avisamos.');
  if (b.acepto !== true) throw new Fallo('Acepte los términos y el tratamiento de datos para continuar.');
  d.aceptacion = { version: '2026-11', fecha: new Date().toISOString(), ip: ipDe(req), nombre: d.titular };
  const ms = Array.isArray(b.miembros) ? b.miembros : [];
  if (!ms.length) throw new Fallo('Agregue al menos una persona.');
  if (ms.length > a.incluidos + a.maxAdicionales) throw new Fallo(`El máximo es ${a.incluidos + a.maxAdicionales} personas por carnet. Active un segundo grupo familiar.`);
  for (const m of ms) { const x = { nombre: limpio(m.nombre, 120), doc: limpio(m.doc, 20).replace(/[.\s]/g, ''), parentesco: limpio(m.parentesco, 30) }; if (!x.nombre || !x.doc) throw new Fallo('Cada persona necesita nombre y documento.'); d.miembros.push(x); }
  if (new Set(d.miembros.map(m => m.doc)).size !== d.miembros.length) throw new Fallo('Hay un documento repetido.');
  const otra = await q1(`SELECT m.doc FROM miembros m JOIN familias f ON f.id=m.familia_id WHERE m.doc=ANY($1) AND f.demo=false AND lower(f.correo)<>$2 AND f.vence>=$3 LIMIT 1`, [d.miembros.map(m => m.doc), d.correo, hoy()]);
  if (otra) throw new Fallo(`El documento ${otra.doc} ya está en otro carnet vigente. Cada persona puede estar en un solo carnet.`);
  if (await q1('SELECT 1 FROM familias WHERE lower(correo)=$1', [d.correo])) throw new Fallo('Ese correo ya tiene un carnet. Ingrese en "Mi familia".');
  const p = precioPlan(a, d.miembros.length);
  res.json(await crearOrden('afiliacion', p.enLinea, d, { adicionales: Math.max(0, d.miembros.length - a.incluidos), desc: `Afiliación anual FamilIA Salud · ${d.miembros.length} persona(s)` }));
}));
app.get('/api/familia/yo', requiere('familia'), h(async (req, res) => {
  const f = await q1('SELECT * FROM familias WHERE id=$1', [req.s.ref]); if (!f) throw new Fallo('Familia no encontrada.', 401);
  const a = await ajustes();
  const miembros = await q('SELECT nombre,doc,parentesco FROM miembros WHERE familia_id=$1 ORDER BY orden', [f.id]);
  const citas = await q(`SELECT c.id,c.prestador_id,c.miembro,c.carnet,c.fecha,c.hora,c.inmediata,c.estado,c.codigo,c.reprog,p.servicio,p.nombre,p.sede,p.ciudad,pg.monto,pg.fecha_pago,pg.estado pago_estado,
      EXISTS(SELECT 1 FROM resenas r WHERE r.cita_id=c.id) calificada
    FROM citas c JOIN prestadores p ON p.id=c.prestador_id LEFT JOIN LATERAL (SELECT monto,estado,to_char(aprobado AT TIME ZONE 'America/Bogota','YYYY-MM-DD') fecha_pago FROM pagos WHERE cita_id=c.id ORDER BY creado DESC LIMIT 1) pg ON true
    WHERE c.familia_id=$1 AND c.estado<>'pendiente_pago' ORDER BY c.fecha DESC,c.hora DESC`, [f.id]);
  const ahora = (await q(`SELECT servicio,ahora,ahora_desde,urgencias,estado,vence,institucion FROM prestadores WHERE ciudad=$1 AND ${VIS_SQL}`, [f.ciudad])).filter(p => puedeRecibir(p) && (ahoraVigente(p) || p.urgencias)).map(p => p.servicio);
  const pagos = (await q(`SELECT orden,tipo,monto,estado,bold_id,to_char(coalesce(aprobado,creado) AT TIME ZONE 'America/Bogota','YYYY-MM-DD') fecha FROM pagos WHERE familia_id=$1 AND estado NOT IN ('pendiente','abandonado') ORDER BY creado DESC`, [f.id]))
    .map(x => ({ orden: x.orden, concepto: NOMBRE_TIPO[x.tipo], monto: x.monto, estado: x.estado, metodo: metodoDe(x.bold_id), referencia: x.bold_id && !/^(DEMO|MANUAL)/.test(x.bold_id) ? x.bold_id : '', fecha: x.fecha }));
  const movs = await q(`SELECT monto,concepto,to_char(creado AT TIME ZONE 'America/Bogota','YYYY-MM-DD') fecha FROM saldo_mov WHERE familia_id=$1 ORDER BY creado DESC LIMIT 50`, [f.id]);
  const devs = await q(`SELECT monto,estado,to_char(creado AT TIME ZONE 'America/Bogota','YYYY-MM-DD') fecha FROM devoluciones WHERE familia_id=$1 ORDER BY creado DESC`, [f.id]);
  const carnets = miembros.map((m, i) => { const n = `FS-${f.id.slice(-4).toUpperCase()}-${String(i + 1).padStart(2, '0')}`; return { ...m, carnet: n, qr: `${FRONT}/#/verificar/${n}/${claveQR(n)}` }; });
  const cambios = (f.cambios || []).filter(x => x.slice(0, 4) === hoy().slice(0, 4)).length;
  for (const c of citas) { c.minutos = c.estado === 'confirmada' ? minutosHasta(c.fecha, c.hora) : null; }
  res.json({ familia: { id: f.id, titular: f.titular, correo: f.correo, ciudad: f.ciudad, vence: f.vence, saldo: f.saldo || 0 }, estado: estadoVigencia(f.vence), miembros: carnets, cambiosUsados: cambios, cambiosMax: 2, citas, ahora, renovacion: precioPlan(a, miembros.length).enLinea, pagos, movimientos: movs, devoluciones: devs });
}));
app.post('/api/familia/renovar', requiere('familia'), h(async (req, res) => {
  const a = await ajustes(); const n = Number((await q1('SELECT count(*)::int n FROM miembros WHERE familia_id=$1', [req.s.ref])).n);
  const fd = await q1('SELECT demo FROM familias WHERE id=$1', [req.s.ref]);
  res.json(await crearOrden('renovacion_familia', precioPlan(a, n).enLinea, {}, { demo: fd && fd.demo, familia: req.s.ref, adicionales: Math.max(0, n - a.incluidos), desc: 'Renovación anual FamilIA Salud' }));
}));
app.post('/api/familia/cita', requiere('familia'), h(async (req, res) => {
  const f = await q1('SELECT * FROM familias WHERE id=$1', [req.s.ref]);
  if (estadoVigencia(f.vence).k === 'cerrada') throw new Fallo('Su carnet está vencido. Renuévelo para ser atendido.');
  const p = await q1(`SELECT * FROM prestadores WHERE id=$1 AND ${f.demo ? VIS_DEMO : VIS_SQL}`, [req.body.prestador]);
  if (!p || !puedeRecibir(p) || p.urgencias) throw new Fallo('Este profesional no está recibiendo pacientes por ahora.');
  const miembros = await q('SELECT nombre,doc FROM miembros WHERE familia_id=$1 ORDER BY orden', [f.id]);
  const i = Number(req.body.miembro); if (!miembros[i]) throw new Fallo('Elija para quién es la consulta.');
  const A = ahoraBog(); let fecha = req.body.fecha, hora = req.body.hora, inmediata = false;
  if (hora === 'ahora') { if (!ahoraVigente(p) || bloqueado(await bloqueosDe([p.correo]), p.correo, A.fecha)) throw new Fallo('El profesional ya no está disponible ahora. Elija un turno.'); fecha = A.fecha; hora = A.hora; inmediata = true; }
  else {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || fecha < A.fecha || fecha > sumarDias(A.fecha, 7)) throw new Fallo('Fecha no válida.');
    if (fecha === A.fecha && hora <= A.hora) throw new Fallo('Ese turno ya pasó. Elija otro.');
    if (!p.dias.includes(diaSemana(fecha)) || !p.horas.includes(hora)) throw new Fallo('Ese turno no está disponible.');
    if (bloqueado(await bloqueosDe([p.correo]), p.correo, fecha)) throw new Fallo('El profesional no atiende ese día. Elija otra fecha.');
    if (await q1(`SELECT 1 FROM citas WHERE prestador_id=$1 AND fecha=$2 AND hora=$3 AND demo=$4 AND (estado='confirmada' OR (estado='pendiente_pago' AND creado>now()-interval '30 minutes'))`, [p.id, fecha, hora, !!f.demo])) throw new Fallo('Ese turno acaba de ser tomado. Elija otro.');
  }
  const a = await ajustes();
  const cid = uid('c'), carnet = `FS-${f.id.slice(-4).toUpperCase()}-${String(i + 1).padStart(2, '0')}`;
  await q(`INSERT INTO citas(id,familia_id,miembro,carnet,prestador_id,fecha,hora,inmediata,estado,codigo,demo,doc) VALUES($1,$2,$3,$4,$5,$6,$7,$8,'pendiente_pago',$9,$10,$11)`, [cid, f.id, miembros[i].nombre, carnet, p.id, fecha, hora, inmediata, codigo6(), !!f.demo, miembros[i].doc]);
  const com = Math.round(p.tarifa * a.comision / 100);
  if (req.body.conSaldo && !f.demo) {
    // Paga todo con el saldo a favor: se descuenta en la misma transacción que confirma la cita
    const c = await pool.connect();
    try {
      await c.query('BEGIN');
      const ok = (await c.query('UPDATE familias SET saldo=saldo-$2 WHERE id=$1 AND saldo>=$2 RETURNING saldo', [f.id, p.tarifa])).rows[0];
      if (!ok) { await c.query('ROLLBACK'); await q('DELETE FROM citas WHERE id=$1', [cid]); throw new Fallo('Su saldo no alcanza para esta consulta.'); }
      await c.query('INSERT INTO saldo_mov(id,familia_id,monto,concepto) VALUES($1,$2,$3,$4)', [uid('m'), f.id, -p.tarifa, `Consulta de ${p.servicio}`]);
      const orden = 'FS' + Date.now().toString(36).toUpperCase() + crypto.randomBytes(3).toString('hex').toUpperCase(), claim = crypto.randomBytes(16).toString('hex');
      await c.query(`INSERT INTO pagos(orden,tipo,claim,monto,comision,neto,estado,datos,prestador_id,familia_id,cita_id,plan) VALUES($1,'consulta',$2,$3,$4,$5,'pendiente','{}',$6,$7,$8,'saldo')`, [orden, claim, p.tarifa, com, p.tarifa - com, p.id, f.id, cid]);
      await c.query('COMMIT');
      await aplicarPago(orden, 'SALDO');
      return res.json({ orden, claim, monto: p.tarifa, pagadoConSaldo: true });
    } catch (e) { await c.query('ROLLBACK').catch(() => {}); throw e; } finally { c.release(); }
  }
  res.json(await crearOrden('consulta', p.tarifa, {}, { demo: f.demo || p.demo, prestador: p.id, familia: f.id, cita: cid, comision: com, neto: p.tarifa - com, desc: `Consulta de ${p.servicio}` }));
}));
app.post('/api/familia/cancelar', requiere('familia'), h(async (req, res) => {
  const c = await q1(`SELECT * FROM citas WHERE id=$1 AND familia_id=$2 AND estado='confirmada'`, [req.body.cita, req.s.ref]);
  if (!c) throw new Fallo('Consulta no encontrada.');
  if (c.inmediata) throw new Fallo('Las consultas inmediatas no se pueden cancelar desde la app. Escríbanos por WhatsApp.');
  const A = ahoraBog(); const min = (diasEntre(A.fecha, c.fecha) * 1440) + (Number(c.hora.slice(0, 2)) * 60 + Number(c.hora.slice(3))) - (Number(A.hora.slice(0, 2)) * 60 + Number(A.hora.slice(3)));
  if (min < 120) throw new Fallo('Faltan menos de 2 horas. Escríbanos por WhatsApp para reprogramar.');
  await devolverConsulta(c.id, 'cancelada', 'Consulta cancelada por la familia');
  res.json({ ok: true });
}));
app.post('/api/familia/reprogramar', requiere('familia'), h(async (req, res) => {
  const c = await q1(`SELECT * FROM citas WHERE id=$1 AND familia_id=$2 AND estado='confirmada'`, [req.body.cita, req.s.ref]);
  if (!c) throw new Fallo('Consulta no encontrada.');
  if (c.inmediata) throw new Fallo('Las consultas inmediatas no se reprograman.');
  if ((c.reprog || 0) >= 2) throw new Fallo('Esta consulta ya se reprogramó 2 veces. Puede cancelarla y el valor queda como saldo a favor.');
  if (minutosHasta(c.fecha, c.hora) < 120) throw new Fallo('Faltan menos de 2 horas. Escríbanos por WhatsApp.');
  const p = await q1('SELECT * FROM prestadores WHERE id=$1', [c.prestador_id]);
  const fecha = req.body.fecha, hora = req.body.hora, A = ahoraBog();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || fecha < A.fecha || fecha > sumarDias(A.fecha, 7)) throw new Fallo('Fecha no válida.');
  if ((fecha === A.fecha && hora <= A.hora) || !p.dias.includes(diaSemana(fecha)) || !p.horas.includes(hora)) throw new Fallo('Ese turno no está disponible.');
  if (bloqueado(await bloqueosDe([p.correo]), p.correo, fecha)) throw new Fallo('El profesional no atiende ese día.');
  const ok = await q1(`UPDATE citas SET fecha=$2,hora=$3,reprog=coalesce(reprog,0)+1 WHERE id=$1 AND estado='confirmada' AND NOT EXISTS (SELECT 1 FROM citas x WHERE x.prestador_id=$4 AND x.fecha=$2 AND x.hora=$3 AND x.demo=$5 AND x.id<>$1 AND (x.estado='confirmada' OR (x.estado='pendiente_pago' AND x.creado>now()-interval '30 minutes'))) RETURNING id`, [c.id, fecha, hora, p.id, !!c.demo]);
  if (!ok) throw new Fallo('Ese turno acaba de ser tomado. Elija otro.');
  if (!c.demo) correo(p.correo, 'Consulta reprogramada · FamilIA Salud', `<p>La consulta de ${hx(c.miembro)} (carnet ${c.carnet}) pasó del ${c.fecha} ${c.hora} al <b>${fecha} a las ${hora}</b>.</p>`);
  res.json({ ok: true });
}));
app.post('/api/familia/no-atendido', requiere('familia'), h(async (req, res) => {
  const c = await q1(`SELECT * FROM citas WHERE id=$1 AND familia_id=$2 AND estado='confirmada'`, [req.body.cita, req.s.ref]);
  if (!c) throw new Fallo('Consulta no encontrada.');
  const pasaron = -minutosHasta(c.fecha, c.hora);
  if (pasaron < (c.inmediata ? 180 : 60)) throw new Fallo('Puede reportarlo una hora después de la hora de la cita (3 horas si era inmediata).');
  await devolverConsulta(c.id, 'no_atendida', 'Consulta no atendida');
  await q(`UPDATE citas SET nota=$2 WHERE id=$1`, [c.id, limpio(req.body.motivo, 300)]);
  const p = await q1('SELECT correo,nombre FROM prestadores WHERE id=$1', [c.prestador_id]);
  if (!c.demo) { correo(p.correo, 'Consulta reportada como no atendida', `<p>La familia reportó que la consulta de ${hx(c.miembro)} del ${c.fecha} ${c.hora} no se realizó. El valor se le devolvió como saldo a favor. Si sí la atendió, escríbanos con el código de atención.</p>`); correo(DUENO_CORREO, 'FamilIA Salud: consulta no atendida', `<p>${hx(p.nombre)} · ${hx(c.miembro)} · ${c.fecha} ${c.hora}. Motivo: ${hx(req.body.motivo || '')}</p>`); }
  res.json({ ok: true });
}));
app.post('/api/familia/devolucion', requiere('familia'), h(async (req, res) => {
  const cuentaT = limpio(req.body.cuenta, 200); if (cuentaT.length < 8) throw new Fallo('Escriba banco, tipo y número de cuenta, y el nombre y documento del titular.');
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const f = (await c.query('SELECT id,saldo,demo FROM familias WHERE id=$1 FOR UPDATE', [req.s.ref])).rows[0];
    if (f.demo) throw new Fallo('En la demostración no se hacen devoluciones.');
    if (!(f.saldo > 0)) throw new Fallo('No tiene saldo a favor.');
    await c.query('UPDATE familias SET saldo=0 WHERE id=$1', [f.id]);
    await c.query('INSERT INTO saldo_mov(id,familia_id,monto,concepto) VALUES($1,$2,$3,$4)', [uid('m'), f.id, -f.saldo, 'Devolución a cuenta bancaria']);
    await c.query('INSERT INTO devoluciones(id,familia_id,monto,cuenta) VALUES($1,$2,$3,$4)', [uid('v'), f.id, f.saldo, cuentaT]);
    await c.query('COMMIT'); res.json({ ok: true, monto: f.saldo });
  } catch (e) { await c.query('ROLLBACK').catch(() => {}); throw e; } finally { c.release(); }
}));
app.post('/api/familia/miembro', requiere('familia'), h(async (req, res) => {
  const a = await ajustes(), b = req.body;
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const f = (await c.query('SELECT * FROM familias WHERE id=$1 FOR UPDATE', [req.s.ref])).rows[0];
    if (f.demo) throw new Fallo('En la demostración no se cambia el grupo familiar.');
    if (b.accion === 'quitar' && Number(b.i) === 0) throw new Fallo('El titular no se puede quitar.');
    const usados = (f.cambios || []).filter(x => x.slice(0, 4) === hoy().slice(0, 4));
    if (usados.length >= 2) throw new Fallo('Ya hizo los 2 cambios del año. Escríbanos por WhatsApp si necesita otro.');
    const ms = (await c.query('SELECT * FROM miembros WHERE familia_id=$1 ORDER BY orden', [f.id])).rows;
    if (b.accion === 'quitar') {
      const i = Number(b.i); if (!ms[i] || i === 0) throw new Fallo('El titular no se puede quitar.');
      if ((await c.query(`SELECT 1 FROM citas WHERE familia_id=$1 AND carnet=$2 AND estado='confirmada'`, [f.id, `FS-${f.id.slice(-4).toUpperCase()}-${String(i + 1).padStart(2, '0')}`])).rows.length) throw new Fallo('Esa persona tiene una consulta pendiente.');
      await c.query('DELETE FROM miembros WHERE familia_id=$1 AND orden=$2', [f.id, ms[i].orden]);
      const resto = ms.filter((_, k) => k !== i);
      for (const [k, m] of resto.entries()) await c.query('UPDATE miembros SET orden=$3 WHERE familia_id=$1 AND orden=$2', [f.id, m.orden, k + 1000]);
      await c.query('UPDATE miembros SET orden=orden-1000 WHERE familia_id=$1 AND orden>=1000', [f.id]);
    } else {
      const x = { nombre: limpio(b.nombre, 120), doc: limpio(b.doc, 20).replace(/[.\s]/g, ''), parentesco: limpio(b.parentesco, 30) };
      if (!x.nombre || !x.doc) throw new Fallo('Escriba nombre y documento.');
      if (ms.length >= a.incluidos + a.maxAdicionales) throw new Fallo(`El carnet ya tiene ${ms.length} personas, el máximo.`);
      if (ms.some(m => m.doc === x.doc)) throw new Fallo('Esa persona ya está en el carnet.');
      if ((await c.query(`SELECT 1 FROM miembros m JOIN familias f ON f.id=m.familia_id WHERE m.doc=$1 AND f.demo=false AND f.vence>=$2`, [x.doc, hoy()])).rows.length) throw new Fallo('Ese documento ya está en otro carnet vigente.');
      await c.query('INSERT INTO miembros(familia_id,orden,nombre,doc,parentesco) VALUES($1,$2,$3,$4,$5)', [f.id, ms.length, x.nombre, x.doc, x.parentesco]);
    }
    await c.query(`UPDATE familias SET cambios=coalesce(cambios,'[]'::jsonb)||to_jsonb($2::text) WHERE id=$1`, [f.id, new Date().toISOString()]);
    await c.query('COMMIT'); res.json({ ok: true });
  } catch (e) { await c.query('ROLLBACK').catch(() => {}); throw e; } finally { c.release(); }
}));
app.post('/api/familia/resena', requiere('familia'), h(async (req, res) => {
  const c = await q1(`SELECT * FROM citas WHERE id=$1 AND familia_id=$2 AND estado='atendida'`, [req.body.cita, req.s.ref]);
  if (!c) throw new Fallo('Solo puede calificar consultas atendidas.');
  const est = Math.min(5, Math.max(1, Number(req.body.estrellas) || 5));
  await q('INSERT INTO resenas(id,prestador_id,cita_id,estrellas,texto) VALUES($1,$2,$3,$4,$5) ON CONFLICT(cita_id) DO NOTHING', [uid('s'), c.prestador_id, c.id, est, limpio(req.body.texto, 300)]);
  res.json({ ok: true });
}));

/* ----- Especialistas ----- */
app.post('/api/medicos/solicitud', h(async (req, res) => {
  const b = req.body, d = { nombre: limpio(b.nombre, 120), servicio: b.servicio, ciudad: b.ciudad, rethus: limpio(b.rethus, 40), correo: limpio(b.correo, 120).toLowerCase(), celular: limpio(b.celular, 30) };
  if (!d.nombre || !d.rethus || !correoOk(d.correo) || !d.celular) throw new Fallo('Complete todos los datos de la solicitud.');
  if (!ESPECIALIDADES.includes(d.servicio) || !CIUDADES.includes(d.ciudad)) throw new Fallo('Elija su especialidad y su ciudad.');
  if (await q1(`SELECT 1 FROM solicitudes WHERE lower(correo)=$1 AND estado<>'rechazada'`, [d.correo])) throw new Fallo('Ya hay una solicitud con ese correo. Le escribiremos pronto.');
  await q(`INSERT INTO solicitudes(id,nombre,servicio,ciudad,rethus,correo,celular,estado) VALUES($1,$2,$3,$4,$5,$6,$7,'pendiente')`, [uid('s'), d.nombre, d.servicio, d.ciudad, d.rethus, d.correo, d.celular]);
  if (E.ADMIN_CORREO) correo(E.ADMIN_CORREO, 'Nueva solicitud de especialista', `<p>${hx(d.nombre)} · ${hx(d.servicio)} · ${hx(d.ciudad)}<br>ReTHUS ${hx(d.rethus)}</p><p>Revísela en <a href="${FRONT}/#/admin">Administración → Solicitudes de acceso</a>.</p>`);
  res.json({ ok: true });
}));
app.post('/api/medicos/invitacion', h(async (req, res) => {
  const s2 = await q1(`SELECT nombre,servicio,ciudad,rethus,correo,celular FROM solicitudes WHERE lower(correo)=$1 AND codigo=$2 AND estado='invitado'`, [limpio(req.body.correo, 120).toLowerCase(), limpio(req.body.codigo, 12).toUpperCase()]);
  if (!s2) throw new Fallo('El correo o el código no son válidos. Revise el mensaje que le enviamos.');
  res.json(s2);
}));
app.post('/api/medicos/registro', h(async (req, res) => {
  const a = await ajustes(), b = req.body;
  const inv = await q1(`SELECT * FROM solicitudes WHERE lower(correo)=$1 AND codigo=$2 AND estado='invitado'`, [limpio(b.correo, 120).toLowerCase(), limpio(b.codigo, 12).toUpperCase()]);
  if (!inv) throw new Fallo('Necesita un código de invitación válido para registrarse.');
  Object.assign(b, { nombre: inv.nombre, servicio: inv.servicio, ciudad: inv.ciudad, rethus: inv.rethus, correo: inv.correo });
  const d = { rethus: limpio(b.rethus, 40), nombre: limpio(b.nombre, 120), cedula: limpio(b.cedula, 20), servicio: b.servicio, ciudad: b.ciudad, sede: limpio(b.sede, 160) || 'Por confirmar',
    correo: limpio(b.correo, 120).toLowerCase(), celular: limpio(b.celular, 30), reps: limpio(b.reps, 40), mensaje: limpio(b.mensaje, 200), banco: limpio(b.banco, 120),
    tarifa: Math.round(Number(b.tarifa)), particular: Math.round(Number(b.particular)),
    dias: (Array.isArray(b.dias) ? b.dias : []).map(Number).filter(x => x >= 0 && x <= 6),
    horas: (Array.isArray(b.horas) ? b.horas : []).filter(x => /^\d{2}:\d{2}$/.test(x)).slice(0, 24),
    doc: String(b.doc || ''), docTipo: limpio(b.docTipo, 60), docNombre: limpio(b.docNombre, 120), selfie: String(b.selfie || '') };
  if (!d.rethus) throw new Fallo('Escriba su número de registro profesional (ReTHUS).');
  if (!d.nombre || !d.cedula || !correoOk(d.correo) || !d.mensaje) throw new Fallo('Complete nombre, cédula, correo y su mensaje para las familias.');
  if (!ESPECIALIDADES.includes(d.servicio)) throw new Fallo('Elija su especialidad de la lista.');
  if (!CIUDADES.includes(d.ciudad)) throw new Fallo('Elija una ciudad.');
  if (!(d.tarifa > 0 && d.particular > 0) || d.tarifa >= d.particular) throw new Fallo('El precio con descuento debe ser menor que el precio real.');
  if (d.tarifa % 100 !== 0) throw new Fallo('El precio con descuento debe terminar en 00 (por ejemplo 85.000).');
  if (!d.doc.startsWith('data:') || !d.selfie.startsWith('data:image/')) throw new Fallo('Adjunte la copia del ReTHUS y la foto con su cédula.');
  if (d.doc.length > 2.2e6 || d.selfie.length > 2.2e6) throw new Fallo('Cada archivo debe pesar menos de 1,5 MB.');
  if (await q1(`SELECT 1 FROM prestadores WHERE lower(correo)=$1 AND estado<>'rechazado'`, [d.correo])) throw new Fallo('Ese correo ya está registrado. Ingrese al portal médico.');
  d.fundador = (await fundadoresEn(d.ciudad)) < a.cupoFundadores;
  d.solicitud = inv.id;
  const cuota = d.fundador ? a.cuotaFundador : a.cuotaMedico;
  if (req.body.acepto !== true) throw new Fallo('Debe aceptar las condiciones.');
  d.aceptacion = { version: '2026-11', fecha: new Date().toISOString(), ip: ipDe(req), nombre: d.nombre };
  res.json(await crearOrden('registro_medico', cuota, d, { demo: DEMO && CORREOS_DEMO.includes(d.correo), fundador: d.fundador, desc: d.fundador ? (cuota === 0 ? 'Primer año gratis · Especialista Fundador' : 'Cuota primer año · Especialista Fundador') : 'Cuota anual de registro FamilIA Salud' }));
}));
async function cuenta(req) {
  const ps = await q('SELECT * FROM prestadores WHERE lower(correo)=$1 AND estado<>$2 ORDER BY institucion, servicio', [req.s.ref, 'rechazado']);
  if (!ps.length) throw new Fallo('Cuenta no encontrada.', 401);
  return ps;
}
const ocultar = t => { t = String(t || ''); if (!t) return 'sin registrar'; const d = t.replace(/\D/g, ''); return t.replace(/\d/g, '•').replace(/•{1,4}$/, '') + (d ? d.slice(-4) : ''); };
app.get('/api/medico/yo', requiere('medico'), h(async (req, res) => {
  const ps = await cuenta(req), ids = ps.map(p => p.id), a = await ajustes();
  const citas = await q(`SELECT c.id,c.miembro,c.doc,c.carnet,c.fecha,c.hora,c.inmediata,c.estado,p.servicio,pg.monto,pg.neto FROM citas c JOIN prestadores p ON p.id=c.prestador_id
    LEFT JOIN pagos pg ON pg.cita_id=c.id AND pg.estado IN ('retenido','liberado','por_reembolsar','reembolsado') WHERE c.prestador_id=ANY($1) AND c.demo=$2 AND c.estado IN ('confirmada','atendida','no_asistio') ORDER BY c.fecha DESC,c.hora DESC LIMIT 200`, [ids, !!ps[0].demo]);
  const movs = await q(`SELECT to_char(creado AT TIME ZONE 'America/Bogota','YYYY-MM-DD') fecha,monto,comision,neto,estado,nota,(liberado<=now()-make_interval(days=>$2::int)) libre FROM pagos WHERE tipo='consulta' AND prestador_id=ANY($1) AND estado NOT IN ('pendiente','abandonado') ORDER BY creado DESC LIMIT 100`, [ids, a.diasRetiro]);
  const ret = await q(`SELECT id,monto,estado,to_char(creado AT TIME ZONE 'America/Bogota','YYYY-MM-DD') fecha FROM retiros WHERE prestador_id=ANY($1) ORDER BY creado DESC`, [ids]);
  const sum = (arr, k) => arr.reduce((s, x) => s + Number(x[k] || 0), 0);
  const retenido = sum(movs.filter(m => m.estado === 'retenido'), 'neto'), liberado = sum(movs.filter(m => m.estado === 'liberado'), 'neto');
  const libre = sum(movs.filter(m => m.estado === 'liberado' && m.libre), 'neto');
  const disponible = Math.max(0, libre - sum(ret, 'monto')), espera = liberado - libre;
  const resenas = await q(`SELECT estrellas,texto,to_char(creado,'YYYY-MM-DD') fecha FROM resenas WHERE prestador_id=ANY($1) ORDER BY creado DESC LIMIT 50`, [ids]);
  const pares = ps.map(p => [p.servicio, p.ciudad]);
  const preguntas = (await q(`SELECT id,texto,servicio,ciudad FROM preguntas WHERE (respuesta IS NULL OR respuesta='') ORDER BY creado DESC LIMIT 200`)).filter(x => pares.some(([s, c]) => s === x.servicio && c === x.ciudad));
  const perfiles = ps.map(p => ({ id: p.id, nombre: p.nombre, servicio: p.servicio, ciudad: p.ciudad, sede: p.sede, tarifa: p.tarifa, particular: p.particular, mensaje: p.mensaje, dias: p.dias, horas: p.horas, ahora: ahoraVigente(p), estado: p.estado, vence: p.vence, fundador: p.fundador, institucion: p.institucion, banco: ocultar(p.banco), vigencia: p.institucion ? { k: 'activo', txt: 'Activa' } : estadoMedico(p.vence) }));
  res.json({ perfiles, citas, movimientos: movs, retiros: ret, saldo: { retenido, liberado, disponible, espera }, diasRetiro: a.diasRetiro, inasistencia: a.inasistencia, bloqueos: await q(`SELECT id,desde,hasta,motivo FROM bloqueos WHERE lower(correo)=$1 AND hasta>=$2 ORDER BY desde`, [req.s.ref, hoy()]), resenas, preguntas, comision: a.comision, cuotaMedico: a.cuotaMedico });
}));
async function propio(req, id) { const ps = await cuenta(req); const p = ps.find(x => x.id === id); if (!p) throw new Fallo('Perfil no encontrado.', 404); return { p, ps }; }
app.post('/api/medico/ahora', requiere('medico'), h(async (req, res) => {
  const { p } = await propio(req, req.body.id);
  if (p.estado !== 'aprobado' || !puedeRecibir(p)) throw new Fallo('Su perfil no puede recibir pacientes en este momento.');
  if (!ahoraVigente(p) && bloqueado(await bloqueosDe([p.correo]), p.correo, hoy())) throw new Fallo('Hoy tiene la agenda bloqueada. Quite el bloqueo primero.');
  const nuevo = !ahoraVigente(p);
  await q('UPDATE prestadores SET ahora=$2, ahora_desde=CASE WHEN $2 THEN now() ELSE NULL END WHERE id=$1', [p.id, nuevo]); res.json({ ok: true, ahora: nuevo });
}));
app.post('/api/medico/perfil', requiere('medico'), h(async (req, res) => {
  const { p } = await propio(req, req.body.id); const b = req.body;
  const t = Math.round(Number(b.tarifa)), pr = Math.round(Number(b.particular));
  if (!(t > 0 && pr > 0) || t >= pr) throw new Fallo('El precio con descuento debe ser menor que el precio real.');
  if (t % 100 !== 0) throw new Fallo('El precio con descuento debe terminar en 00 (por ejemplo 85.000).');
  const dias = (Array.isArray(b.dias) ? b.dias : []).map(Number).filter(x => x >= 0 && x <= 6);
  const horas = (Array.isArray(b.horas) ? b.horas : []).filter(x => /^\d{2}:\d{2}$/.test(x)).slice(0, 24);
  await q('UPDATE prestadores SET tarifa=$2,particular=$3,mensaje=$4,dias=$5,horas=$6 WHERE id=$1', [p.id, t, pr, limpio(b.mensaje, 200), dias, horas]);
  res.json({ ok: true });
}));
app.post('/api/medico/atender', requiere('medico'), h(async (req, res) => {
  const ps = await cuenta(req);
  const c = await q1(`SELECT * FROM citas WHERE id=$1 AND prestador_id=ANY($2) AND estado='confirmada'`, [req.body.cita, ps.map(p => p.id)]);
  if (!c) throw new Fallo('Consulta no encontrada.');
  if (limpio(req.body.codigo, 10) !== c.codigo) throw new Fallo('El código no coincide. El paciente lo tiene en "Mis consultas".');
  await q(`UPDATE citas SET estado='atendida' WHERE id=$1`, [c.id]);
  const pg = await q1(`UPDATE pagos SET estado='liberado',liberado=now() WHERE cita_id=$1 AND estado='retenido' RETURNING neto`, [c.id]);
  res.json({ ok: true, neto: pg ? pg.neto : 0 });
}));
app.post('/api/medico/no-llego', requiere('medico'), h(async (req, res) => {
  const ps = await cuenta(req), a = await ajustes();
  const ct = await q1(`SELECT * FROM citas WHERE id=$1 AND prestador_id=ANY($2) AND estado='confirmada'`, [req.body.cita, ps.map(p => p.id)]);
  if (!ct) throw new Fallo('Consulta no encontrada.');
  if (-minutosHasta(ct.fecha, ct.hora) < (ct.inmediata ? 120 : 30)) throw new Fallo('Puede marcarlo 30 minutos después de la hora de la cita (2 horas si era inmediata).');
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const pg = (await c.query(`SELECT * FROM pagos WHERE cita_id=$1 AND estado='retenido' FOR UPDATE`, [ct.id])).rows[0];
    await c.query(`UPDATE citas SET estado='no_asistio' WHERE id=$1`, [ct.id]);
    if (pg) {
      const parte = Math.round(pg.monto * a.inasistencia / 100), com = Math.round(parte * a.comision / 100);
      await c.query(`UPDATE pagos SET estado='liberado',liberado=now(),comision=$2,neto=$3,nota=$4 WHERE orden=$1`, [pg.orden, com, parte - com, `Inasistencia: el profesional cobra el ${a.inasistencia}%`]);
      if (!pg.demo) await acreditar(c, pg.familia_id, pg.monto - parte, 'Devolución por inasistencia (parte no cobrada)');
    }
    await c.query('COMMIT');
  } catch (e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); }
  res.json({ ok: true });
}));
app.post('/api/medico/cancelar', requiere('medico'), h(async (req, res) => {
  const ps = await cuenta(req), motivo = limpio(req.body.motivo, 200);
  if (motivo.length < 5) throw new Fallo('Escriba el motivo: la familia lo verá.');
  const ct = await q1(`SELECT c.*,f.correo fc FROM citas c JOIN familias f ON f.id=c.familia_id WHERE c.id=$1 AND c.prestador_id=ANY($2) AND c.estado='confirmada'`, [req.body.cita, ps.map(p => p.id)]);
  if (!ct) throw new Fallo('Consulta no encontrada.');
  await devolverConsulta(ct.id, 'cancelada_medico', 'Consulta cancelada por el profesional');
  await q(`UPDATE citas SET nota=$2 WHERE id=$1`, [ct.id, motivo]);
  await q('UPDATE prestadores SET cancelaciones=coalesce(cancelaciones,0)+1 WHERE id=$1', [ct.prestador_id]);
  if (!ct.demo) correo(ct.fc, 'Su consulta fue cancelada por el profesional', `<p>La consulta de ${hx(ct.miembro)} del ${ct.fecha} a las ${ct.hora} fue cancelada por el profesional. Motivo: ${hx(motivo)}.</p><p>El valor quedó como <b>saldo a favor</b> en su cuenta: puede usarlo en otra consulta o pedir la devolución a su cuenta bancaria.</p>`);
  res.json({ ok: true });
}));
app.post('/api/medico/bloqueo', requiere('medico'), h(async (req, res) => {
  const ps = await cuenta(req), desde = req.body.desde, hasta = req.body.hasta || req.body.desde, H = hoy();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(desde) || !/^\d{4}-\d{2}-\d{2}$/.test(hasta) || hasta < desde || desde < H || hasta > sumarDias(H, 365)) throw new Fallo('Revise las fechas.');
  const choques = await q(`SELECT fecha,hora,miembro FROM citas WHERE prestador_id=ANY($1) AND estado='confirmada' AND fecha>=$2 AND fecha<=$3 ORDER BY fecha,hora`, [ps.map(p => p.id), desde, hasta]);
  if (choques.length) throw new Fallo(`Tiene ${choques.length} consulta(s) confirmada(s) en esas fechas (la primera: ${choques[0].fecha} ${choques[0].hora}). Cancélelas primero en su agenda; el valor queda como saldo a favor de la familia.`);
  await q('INSERT INTO bloqueos(id,correo,desde,hasta,motivo) VALUES($1,$2,$3,$4,$5)', [uid('b'), req.s.ref, desde, hasta, limpio(req.body.motivo, 120)]);
  if (desde === H) await q('UPDATE prestadores SET ahora=false,ahora_desde=NULL WHERE lower(correo)=$1', [req.s.ref]);
  res.json({ ok: true });
}));
app.post('/api/medico/bloqueo-quitar', requiere('medico'), h(async (req, res) => {
  await q('DELETE FROM bloqueos WHERE id=$1 AND lower(correo)=$2', [req.body.id, req.s.ref]); res.json({ ok: true });
}));
app.post('/api/medico/retiro', requiere('medico'), h(async (req, res) => {
  const ps = await cuenta(req), ids = ps.map(p => p.id);
  if (ps[0].demo) throw new Fallo('En la demostración no se hacen retiros de dinero.');
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    await c.query('SELECT id FROM prestadores WHERE id=ANY($1) FOR UPDATE', [ids]);
    const lib = Number((await c.query(`SELECT coalesce(sum(neto),0)::int s FROM pagos WHERE tipo='consulta' AND estado='liberado' AND prestador_id=ANY($1) AND liberado<=now()-make_interval(days=>$2::int)`, [ids, (await ajustes()).diasRetiro])).rows[0].s);
    const ret = Number((await c.query(`SELECT coalesce(sum(monto),0)::int s FROM retiros WHERE prestador_id=ANY($1)`, [ids])).rows[0].s);
    if (lib - ret <= 0) { await c.query('ROLLBACK'); throw new Fallo('No tiene saldo disponible. Cada consulta se puede retirar 8 días después de atendida.'); }
    await c.query(`INSERT INTO retiros(id,prestador_id,monto,estado) VALUES($1,$2,$3,'solicitado')`, [uid('w'), ids[0], lib - ret]);
    await c.query('COMMIT');
    res.json({ ok: true, monto: lib - ret });
  } catch (e) { await c.query('ROLLBACK').catch(() => {}); throw e; } finally { c.release(); }
}));
app.post('/api/medico/renovar', requiere('medico'), h(async (req, res) => {
  const ps = (await cuenta(req)).filter(p => !p.institucion); if (!ps.length) throw new Fallo('Esta cuenta no paga anualidad.');
  const a = await ajustes();
  res.json(await crearOrden('renovacion_medico', a.cuotaMedico, { ids: ps.map(p => p.id) }, { demo: ps[0].demo, prestador: ps[0].id, desc: 'Renovación anual del registro FamilIA Salud' }));
}));
app.post('/api/medico/responder', requiere('medico'), h(async (req, res) => {
  const ps = await cuenta(req); const t = limpio(req.body.texto, 700);
  const pr = await q1('SELECT * FROM preguntas WHERE id=$1', [req.body.pregunta]);
  if (!pr || !ps.some(p => p.servicio === pr.servicio && p.ciudad === pr.ciudad)) throw new Fallo('Pregunta no encontrada.');
  if (t.length < 20) throw new Fallo('Escriba una respuesta un poco más completa.');
  if (ps[0].demo) throw new Fallo('En la demostración las respuestas no se publican en la página real.');
  await q('UPDATE preguntas SET respuesta=$2,respondida=now() WHERE id=$1', [pr.id, t]); res.json({ ok: true });
}));

/* ----- Administración ----- */
const permisos = r => ({ datos: r === 'superior' || r === 'contabilidad', aprobar: r === 'superior', precios: r === 'superior', dinero: r === 'superior' || r === 'contabilidad', verificar: r === 'superior' || r === 'verificador' });
const exige = (req, k) => { if (!permisos(req.s.rol)[k]) throw new Fallo('Su rol no tiene permiso para esta acción.', 403); };
app.get('/api/admin/datos', requiere('admin'), h(async (req, res) => {
  const pm = permisos(req.s.rol), a = await ajustes(), anio = hoy().slice(0, 4);
  const fams = await q(`SELECT f.id,f.titular,f.correo,f.telefono,f.ciudad,f.vence,(SELECT count(*)::int FROM miembros m WHERE m.familia_id=f.id) personas FROM familias f WHERE demo=false ORDER BY f.creado DESC LIMIT 500`);
  const familias = fams.map(f => ({ id: f.id, ciudad: f.ciudad, personas: f.personas, vence: f.vence, estado: estadoVigencia(f.vence), ...(pm.datos ? { titular: f.titular, correo: f.correo, telefono: f.telefono } : { titular: 'Familia FS-' + f.id.slice(-4).toUpperCase() }) }));
  const ps = await q(`SELECT id,nombre,servicio,ciudad,estado,vence,fundador,institucion,cedula,rethus,reps,correo,celular,banco,tarifa,particular,ahora,dias,horas,verificacion,(doc_data IS NOT NULL) tiene_doc,(selfie_data IS NOT NULL) tiene_selfie FROM prestadores WHERE demo=false ORDER BY creado DESC`);
  const ficha = p => {
    const base = { id: p.id, servicio: p.servicio, ciudad: p.ciudad, estado: p.estado, fundador: p.fundador, vence: p.vence, vigencia: estadoMedico(p.vence) };
    return pm.datos ? { ...base, nombre: p.nombre, cedula: p.cedula, rethus: p.rethus, reps: p.reps, correo: p.correo, celular: p.celular, banco: p.banco, tarifa: p.tarifa, particular: p.particular, verificacion: p.verificacion } : base;
  };
  const pendientes = ps.filter(p => p.estado === 'verificando').map(p => pm.verificar ? { ...ficha(p), nombre: p.nombre, cedula: p.cedula, rethus: p.rethus, reps: p.reps, tieneDoc: p.tiene_doc, tieneSelfie: p.tiene_selfie } : ficha(p));
  const red = ps.filter(p => p.estado === 'aprobado' && !p.institucion).map(ficha);
  const activas = familias.filter(f => f.estado.k !== 'cerrada');
  const out = { yo: req.s.ref, rol: req.s.rol, permisos: pm, ajustes: a, familias, pendientes, red,
    kpis: { familias: activas.length, personas: activas.reduce((s, f) => s + f.personas, 0), especialistas: red.filter(p => p.vigencia.k !== 'bloqueado').length } };
  if (pm.verificar) out.solicitudes = await q(`SELECT id,nombre,servicio,ciudad,rethus,correo,celular,estado,codigo,to_char(creado AT TIME ZONE 'America/Bogota','YYYY-MM-DD') fecha FROM solicitudes ORDER BY creado DESC LIMIT 200`);
  const fund = {}; ps.filter(p => p.fundador).forEach(p => fund[p.ciudad] = (fund[p.ciudad] || 0) + 1); out.fundadores = fund;
  if (pm.dinero) {
    const s = async (cond) => Number((await q1(`SELECT coalesce(sum(monto),0)::bigint s FROM pagos WHERE demo=false AND ${cond}`)).s);
    out.kpis.afiliaciones = await s(`tipo IN ('afiliacion','renovacion_familia') AND estado='aprobado' AND to_char(aprobado,'YYYY')='${anio}'`);
    out.kpis.cuotas = await s(`tipo IN ('registro_medico','renovacion_medico') AND estado='aprobado' AND to_char(aprobado,'YYYY')='${anio}'`);
    out.kpis.comisiones = Number((await q1(`SELECT coalesce(sum(comision),0)::bigint s FROM pagos WHERE demo=false AND tipo='consulta' AND estado='liberado'`)).s);
    out.kpis.custodia = await s(`tipo='consulta' AND estado='retenido'`);
    out.retiros = await q(`SELECT r.id,r.monto,r.estado,to_char(r.creado AT TIME ZONE 'America/Bogota','YYYY-MM-DD') fecha,p.nombre,p.banco FROM retiros r JOIN prestadores p ON p.id=r.prestador_id ORDER BY r.creado DESC LIMIT 200`);
    out.reembolsos = await q(`SELECT d.id,d.monto,d.cuenta,d.estado,to_char(d.creado AT TIME ZONE 'America/Bogota','YYYY-MM-DD') fecha,f.titular,f.correo,f.telefono FROM devoluciones d JOIN familias f ON f.id=d.familia_id WHERE d.estado='solicitada' ORDER BY d.creado`);
    out.saldoFamilias = Number((await q1(`SELECT coalesce(sum(saldo),0)::int s FROM familias WHERE demo=false`)).s);
    out.revisar = (await q(`SELECT e.pago_id orden,'Pago doble' tipo,e.valor monto,e.nota,to_char(e.creado AT TIME ZONE 'America/Bogota','YYYY-MM-DD HH24:MI') fecha FROM pagos_extra e WHERE e.resuelto=false ORDER BY e.creado`)).map(x => ({ ...x, nombre: 'Orden ' + x.orden, correo: '' }));
    for (const r of await q(`SELECT orden,tipo,monto,nota,bold_ref,familia_id,prestador_id,datos,to_char(creado AT TIME ZONE 'America/Bogota','YYYY-MM-DD HH24:MI') fecha FROM pagos WHERE estado='revisar' ORDER BY creado`)) {
      const w = await pagadorDe(r); out.revisar.push({ orden: r.orden, tipo: NOMBRE_TIPO[r.tipo], monto: r.monto, nota: r.nota, fecha: r.fecha, nombre: w.nombre, correo: w.correo });
    }
    out.pagos = [];
    for (const r of await q(`SELECT orden,tipo,monto,estado,bold_id,llave_ref,familia_id,prestador_id,datos,to_char(coalesce(aprobado,creado) AT TIME ZONE 'America/Bogota','YYYY-MM-DD') fecha FROM pagos WHERE demo=false AND estado NOT IN ('pendiente','abandonado') ORDER BY creado DESC LIMIT 150`)) {
      const w = await pagadorDe(r); out.pagos.push({ orden: r.orden, concepto: NOMBRE_TIPO[r.tipo], monto: r.monto, estado: r.estado, metodo: metodoDe(r.bold_id), referencia: r.bold_id && !/^(DEMO|MANUAL)/.test(r.bold_id) ? r.bold_id : '', fecha: r.fecha, nombre: w.nombre });
    }
    out.reservadas = await q(`SELECT pg.orden,pg.monto,c.miembro,c.fecha,c.hora,p.servicio,p.nombre FROM pagos pg JOIN citas c ON c.id=pg.cita_id JOIN prestadores p ON p.id=c.prestador_id WHERE pg.demo=false AND pg.estado='retenido' AND c.estado='confirmada' AND c.fecha<=$1 ORDER BY c.fecha`, [hoy()]);
    out.pendientesPago = await q(`SELECT orden,tipo,monto,to_char(creado AT TIME ZONE 'America/Bogota','YYYY-MM-DD HH24:MI') fecha FROM pagos WHERE demo=false AND estado='pendiente' AND bold_ref IS NOT NULL AND creado>now()-interval '7 days' AND creado<now()-interval '10 minutes' ORDER BY creado DESC LIMIT 100`);
  }
  if (pm.precios) {
    out.ips = ps.filter(p => p.institucion).map(p => ({ id: p.id, servicio: p.servicio, tarifa: p.tarifa, particular: p.particular, ahora: p.ahora, dias: p.dias, horas: p.horas }));
    out.equipo = await q('SELECT correo,rol,nombre FROM equipo WHERE (demo=false OR $1) ORDER BY rol', [DEMO]);
  }
  res.json(out);
}));
app.post('/api/admin/invitar', requiere('admin'), h(async (req, res) => {
  exige(req, 'verificar');
  const cod = crypto.randomBytes(4).toString('hex').slice(0, 6).toUpperCase();
  const s2 = await q1(`UPDATE solicitudes SET estado='invitado',codigo=$2 WHERE id=$1 AND estado='pendiente' RETURNING *`, [req.body.id, cod]);
  if (!s2) throw new Fallo('Solicitud no encontrada.');
  correo(s2.correo, 'Su código de acceso a FamilIA Salud', `<h2>¡Bienvenido, ${hx(s2.nombre)}!</h2><p>Su solicitud fue aprobada. Para registrarse en la red ingrese a <a href="${FRONT}/#/especialistas">${FRONT}/#/especialistas</a>, toque "¿Ya tiene su código?" y escriba:</p><p>Correo: ${s2.correo}<br>Código: <b style="font-size:22px;letter-spacing:4px">${cod}</b></p>`);
  res.json({ ok: true, codigo: cod });
}));
app.post('/api/admin/solicitud-rechazar', requiere('admin'), h(async (req, res) => {
  exige(req, 'verificar'); await q(`UPDATE solicitudes SET estado='rechazada' WHERE id=$1 AND estado='pendiente'`, [req.body.id]); res.json({ ok: true });
}));
app.get('/api/admin/doc/:id/:cual', requiere('admin'), h(async (req, res) => {
  exige(req, 'verificar');
  const p = await q1('SELECT nombre,doc_data,doc_tipo,doc_nombre,selfie_data FROM prestadores WHERE id=$1', [req.params.id]);
  if (!p) throw new Fallo('No encontrado.', 404);
  res.json(req.params.cual === 'selfie' ? { data: p.selfie_data, tipo: 'image/*', nombre: 'Foto con cédula' } : { data: p.doc_data, tipo: p.doc_tipo, nombre: p.doc_nombre });
}));
app.post('/api/admin/verificar', requiere('admin'), h(async (req, res) => {
  exige(req, 'verificar');
  const esp = limpio(req.body.especialidad, 120);
  if (req.body.checks !== 4) throw new Fallo('Marque las cuatro comprobaciones. Si alguna no se cumple, rechace el registro.');
  if (!esp) throw new Fallo('Escriba la especialidad tal como aparece en el ReTHUS.');
  const p = await q1(`UPDATE prestadores SET estado='aprobado',verificacion=$2 WHERE id=$1 AND estado='verificando' RETURNING correo,nombre,ciudad`, [req.body.id, { fecha: hoy(), por: req.s.ref, especialidad: esp }]);
  if (!p) throw new Fallo('Registro no encontrado.');
  correo(p.correo, 'Ya está habilitado en FamilIA Salud', `<h2>¡Bienvenido a la red, ${hx(p.nombre)}!</h2><p>Confirmamos su registro profesional. Su perfil ya aparece para las familias de ${p.ciudad}. Ingrese a <a href="${FRONT}/#/medico">su portal</a> y active "Estoy disponible ahora" cuando tenga espacio.</p>`);
  res.json({ ok: true });
}));
app.post('/api/admin/rechazar', requiere('admin'), h(async (req, res) => {
  exige(req, 'verificar');
  const p = await q1(`UPDATE prestadores SET estado='rechazado' WHERE id=$1 AND estado='verificando' RETURNING correo,nombre`, [req.body.id]);
  if (!p) throw new Fallo('Registro no encontrado.');
  correo(p.correo, 'Sobre su registro en FamilIA Salud', `<p>${hx(p.nombre)}, no pudimos confirmar su registro profesional con los datos enviados. Escríbanos para revisarlo y gestionar la devolución de su cuota.</p>`);
  res.json({ ok: true });
}));
app.post('/api/admin/vence', requiere('admin'), h(async (req, res) => {
  exige(req, 'dinero'); const f = req.body.fecha;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(f)) throw new Fallo('Fecha no válida.');
  await q(`UPDATE ${req.body.tipo === 'm' ? 'prestadores' : 'familias'} SET vence=$2 WHERE id=$1`, [req.body.id, f]);
  res.json({ ok: true });
}));
app.post('/api/admin/prueba-bold', requiere('admin'), h(async (req, res) => {
  exige(req, 'precios');
  res.json(await crearOrden('prueba', 1000, { correo: req.s.ref }, { desc: 'FamilIA Salud - Pago de prueba' }));
}));
app.post('/api/admin/retiro', requiere('admin'), h(async (req, res) => { exige(req, 'dinero'); await q(`UPDATE retiros SET estado='transferido' WHERE id=$1`, [req.body.id]); res.json({ ok: true }); }));
app.post('/api/admin/reembolsar-consulta', requiere('admin'), h(async (req, res) => {
  exige(req, 'dinero');
  const pg = await q1(`SELECT cita_id FROM pagos WHERE orden=$1 AND estado='retenido'`, [req.body.orden]);
  if (!pg) throw new Fallo('Esa consulta ya no está reservada.');
  await devolverConsulta(pg.cita_id, 'no_atendida', 'Consulta no atendida (revisada por administración)'); res.json({ ok: true });
}));
app.post('/api/admin/reembolso', requiere('admin'), h(async (req, res) => { exige(req, 'dinero'); await q(`UPDATE devoluciones SET estado='transferida' WHERE id=$1 AND estado='solicitada'`, [req.body.id]); res.json({ ok: true }); }));
app.get('/api/admin/ciudades', requiere('admin'), h(async (req, res) => {
  const a = await ajustes();
  const esp = await q(`SELECT ciudad,count(DISTINCT lower(correo))::int n FROM prestadores WHERE estado='aprobado' AND demo=false AND NOT institucion GROUP BY ciudad`);
  const ins = await q(`SELECT ciudad,count(*)::int n FROM prestadores WHERE estado='aprobado' AND institucion GROUP BY ciudad`);
  const esp2 = await q(`SELECT ciudad,count(*)::int n FROM espera WHERE NOT avisado GROUP BY ciudad`);
  const fam = await q(`SELECT ciudad,count(*)::int n FROM familias WHERE demo=false AND vence>=$1 GROUP BY ciudad`, [hoy()]);
  const v = (arr, c) => (arr.find(x => x.ciudad === c) || {}).n || 0;
  res.json(CIUDADES.map(c => ({ ciudad: c, abierta: a.ciudadesAbiertas.includes(c), especialistas: v(esp, c), sede: v(ins, c), espera: v(esp2, c), familias: v(fam, c) })));
}));
app.post('/api/admin/ciudad', requiere('admin'), h(async (req, res) => {
  exige(req, 'precios'); const c = req.body.ciudad; if (!CIUDADES.includes(c)) throw new Fallo('Ciudad no válida.');
  const a = await ajustes(); const set = new Set(a.ciudadesAbiertas);
  if (req.body.abrir) set.add(c); else set.delete(c);
  const nuevo = { ...(await ajustesBase()), ciudadesAbiertas: [...set] };
  await q('UPDATE ajustes SET datos=$1 WHERE id=1', [nuevo]); cacheAjustes = null;
  let avisados = 0;
  if (req.body.abrir) for (const e of await q(`SELECT correo FROM espera WHERE ciudad=$1 AND NOT avisado LIMIT 200`, [c])) {
    await correo(e.correo, `FamilIA Salud ya está en ${c}`, `<h2>¡Ya llegamos a ${hx(c)}!</h2><p>Usted pidió que le avisáramos. Ya puede activar el carnet de su familia y ser atendido por especialistas con precio preferencial.</p><p><a href="${FRONT}/#/activar">Activar el carnet de mi familia</a></p>`);
    await q('UPDATE espera SET avisado=true WHERE correo=$1 AND ciudad=$2', [e.correo, c]); avisados++;
  }
  res.json({ ok: true, avisados });
}));
app.post('/api/admin/aprobar-pago', requiere('admin'), h(async (req, res) => {
  exige(req, 'dinero');
  const p = await q1('SELECT * FROM pagos WHERE orden=$1', [req.body.orden]); if (!p) throw new Fallo('Pago no encontrado.');
  if (DEMO_PAGOS) { await aplicarPago(p.orden, 'MANUAL:' + req.s.ref); return res.json({ ok: true, estado: 'aplicado' }); }
  if (!p.bold_ref) throw new Fallo('Ese pago nunca se envió a la pasarela.');
  const r = await confirmarBold({ ref: p.bold_ref });
  if (r.estado !== 'aplicado') throw new Fallo('Bold no confirma ese pago como aprobado. No se puede aplicar.');
  res.json({ ok: true, estado: r.estado });
}));
app.post('/api/admin/ajustes', requiere('admin'), h(async (req, res) => {
  exige(req, 'precios'); const a = { ...(await ajustes()) };
  for (const k of ['precioRegular', 'precioEnLinea', 'incluidos', 'adicional', 'maxAdicionales', 'comision', 'cuotaMedico', 'cuotaFundador', 'cupoFundadores']) {
    const v = Number(req.body[k]); if (!(v >= 0)) throw new Fallo('Revise los valores.'); a[k] = Math.round(v);
  }
  a.ciudadesAbiertas = (await ajustes()).ciudadesAbiertas;
  a.inasistencia = Math.min(100, Math.max(0, Math.round(Number(req.body.inasistencia ?? 50))));
  a.diasRetiro = Math.min(30, Math.max(0, Math.round(Number(req.body.diasRetiro ?? 8))));
  if (a.precioEnLinea > a.precioRegular) throw new Fallo('El precio en línea no puede ser mayor que el precio regular.');
  if (a.comision > 50 || a.incluidos < 1) throw new Fallo('Revise la comisión y el número de personas incluidas.');
  if (a.cuotaFundador > a.cuotaMedico) throw new Fallo('La cuota de Fundador no puede ser mayor que la cuota normal.');
  await q('UPDATE ajustes SET datos=$1 WHERE id=1', [a]); cacheAjustes = null; res.json({ ok: true });
}));
app.post('/api/admin/ips', requiere('admin'), h(async (req, res) => {
  exige(req, 'precios'); const b = req.body; const t = Math.round(Number(b.tarifa)), pr = Math.round(Number(b.particular));
  if (!(t > 0 && pr > 0) || t >= pr) throw new Fallo('El precio con descuento debe ser menor que el precio real.');
  if (t % 100 !== 0) throw new Fallo('El precio con descuento debe terminar en 00.');
  const horas = (Array.isArray(b.horas) ? b.horas : []).filter(x => /^\d{2}:\d{2}$/.test(x));
  await q('UPDATE prestadores SET tarifa=$2,particular=$3,ahora=$4,horas=$5 WHERE id=$1 AND institucion', [b.id, t, pr, !!b.ahora, horas]);
  res.json({ ok: true });
}));
app.get('/api/admin/cuentas', requiere('admin'), h(async (req, res) => {
  exige(req, 'precios');
  const filas = await q(`
    SELECT 'familia' tipo, lower(f.correo) correo, f.titular nombre, 'Familia · '||f.ciudad perfil FROM familias f WHERE (f.demo=false OR $1)
    UNION ALL SELECT DISTINCT ON (lower(p.correo)) 'medico', lower(p.correo), p.nombre, CASE WHEN p.institucion THEN 'Sede propia' ELSE 'Especialista · '||p.servicio END FROM prestadores p WHERE p.estado<>'rechazado' AND (p.demo=false OR $1)
    UNION ALL SELECT 'admin', lower(e.correo), coalesce(e.nombre,''), e.rol FROM equipo e WHERE (e.demo=false OR $1)`, [DEMO]);
  const cs = await q('SELECT correo,tipo,(hash IS NOT NULL) tiene,ultimo,bloqueada,motivo FROM cuentas');
  res.json(filas.map(f => { const c = cs.find(x => x.correo === f.correo && x.tipo === f.tipo) || {}; return { ...f, clave: !!c.tiene, ultimo: c.ultimo || null, bloqueada: !!c.bloqueada, motivo: c.motivo || '' }; }));
}));
app.post('/api/admin/cuenta-enlace', requiere('admin'), h(async (req, res) => {
  exige(req, 'precios'); const c = limpio(req.body.correo, 120).toLowerCase(), t = req.body.tipo;
  if (!TIPOS.includes(t) || !(await existeCuenta(c, t))) throw new Fallo('Cuenta no encontrada.');
  await q(`INSERT INTO cuentas(correo,tipo) VALUES($1,$2) ON CONFLICT DO NOTHING`, [c, t]); await enviarEnlace(c, t); res.json({ ok: true });
}));
app.post('/api/admin/cuenta-bloquear', requiere('admin'), h(async (req, res) => {
  exige(req, 'precios'); const c = limpio(req.body.correo, 120).toLowerCase(), t = req.body.tipo, b = !!req.body.bloquear, m = limpio(req.body.motivo, 200);
  if (b && !m) throw new Fallo('Escriba el motivo del bloqueo.');
  if (c === req.s.ref && t === 'admin') throw new Fallo('No puede bloquearse a sí mismo.');
  await q(`INSERT INTO cuentas(correo,tipo,bloqueada,motivo) VALUES($1,$2,$3,$4) ON CONFLICT(correo,tipo) DO UPDATE SET bloqueada=$3,motivo=$4`, [c, t, b, b ? m : null]);
  if (b) { const ent = await existeCuenta(c, t); if (ent) await q('DELETE FROM sesiones WHERE ref=$1 AND tipo=$2', [ent.ref, t]); }
  res.json({ ok: true });
}));
app.get('/api/admin/respaldo', requiere('admin'), h(async (req, res) => {
  exige(req, 'precios');
  const out = { app: 'FamilIA Salud', generado: new Date().toISOString(), por: req.s.ref, nota: SKYNET };
  for (const t of ['ajustes', 'equipo', 'familias', 'miembros', 'prestadores', 'citas', 'pagos', 'retiros', 'resenas', 'preguntas', 'solicitudes', 'cuentas']) out[t] = await q(`SELECT * FROM ${t}`);
  res.json(out);
}));
app.post('/api/admin/equipo', requiere('admin'), h(async (req, res) => {
  exige(req, 'precios'); const c = limpio(req.body.correo, 120).toLowerCase(), rol = req.body.rol;
  if (req.body.quitar) { if (c === req.s.ref) throw new Fallo('No puede quitarse a sí mismo.'); await q('DELETE FROM equipo WHERE lower(correo)=$1', [c]); return res.json({ ok: true }); }
  if (!correoOk(c) || !['superior', 'contabilidad', 'verificador', 'operador'].includes(rol)) throw new Fallo('Escriba un correo y elija un rol.');
  await q('INSERT INTO equipo(correo,rol,nombre) VALUES($1,$2,$3) ON CONFLICT(correo) DO UPDATE SET rol=$2,nombre=$3', [c, rol, limpio(req.body.nombre, 80)]);
  res.json({ ok: true });
}));

/* ---------- Base de datos ---------- */
const ESQUEMA = `
CREATE TABLE IF NOT EXISTS ajustes (id int PRIMARY KEY, datos jsonb NOT NULL);
CREATE TABLE IF NOT EXISTS equipo (correo text PRIMARY KEY, rol text NOT NULL, nombre text, demo boolean DEFAULT false);
CREATE TABLE IF NOT EXISTS familias (id text PRIMARY KEY, titular text, correo text UNIQUE, telefono text, ciudad text, vence text, activada text, demo boolean DEFAULT false, creado timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS miembros (id serial PRIMARY KEY, familia_id text REFERENCES familias(id) ON DELETE CASCADE, orden int, nombre text, doc text, parentesco text);
CREATE TABLE IF NOT EXISTS prestadores (id text PRIMARY KEY, nombre text, servicio text, ciudad text, sede text, tarifa int, particular int, dias int[] DEFAULT '{}', horas text[] DEFAULT '{}', ahora boolean DEFAULT false, propio boolean DEFAULT false, institucion boolean DEFAULT false, domicilio boolean DEFAULT false, urgencias boolean DEFAULT false, estado text, vence text, correo text, celular text, cedula text, rethus text, reps text, banco text, mensaje text, nota text, fundador boolean DEFAULT false, verificacion jsonb, doc_data text, doc_tipo text, doc_nombre text, selfie_data text, demo boolean DEFAULT false, creado timestamptz DEFAULT now());
CREATE INDEX IF NOT EXISTS prestadores_ciudad ON prestadores(ciudad);
ALTER TABLE prestadores ADD COLUMN IF NOT EXISTS ahora_desde timestamptz;
CREATE TABLE IF NOT EXISTS citas (id text PRIMARY KEY, familia_id text, miembro text, carnet text, prestador_id text, fecha text, hora text, inmediata boolean DEFAULT false, estado text, codigo text, creado timestamptz DEFAULT now());
CREATE INDEX IF NOT EXISTS citas_prestador ON citas(prestador_id, fecha);
ALTER TABLE citas ADD COLUMN IF NOT EXISTS demo boolean DEFAULT false;
ALTER TABLE citas ADD COLUMN IF NOT EXISTS doc text;
ALTER TABLE citas ADD COLUMN IF NOT EXISTS reprog int DEFAULT 0;
ALTER TABLE citas ADD COLUMN IF NOT EXISTS nota text;
ALTER TABLE familias ADD COLUMN IF NOT EXISTS saldo int DEFAULT 0;
ALTER TABLE familias ADD COLUMN IF NOT EXISTS cambios jsonb DEFAULT '[]'::jsonb;
ALTER TABLE familias ADD COLUMN IF NOT EXISTS aceptacion jsonb;
ALTER TABLE prestadores ADD COLUMN IF NOT EXISTS aceptacion jsonb;
ALTER TABLE prestadores ADD COLUMN IF NOT EXISTS cancelaciones int DEFAULT 0;
CREATE TABLE IF NOT EXISTS bloqueos (id text PRIMARY KEY, correo text, desde text, hasta text, motivo text, creado timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS saldo_mov (id text PRIMARY KEY, familia_id text, monto int, concepto text, creado timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS devoluciones (id text PRIMARY KEY, familia_id text, monto int, cuenta text, estado text DEFAULT 'solicitada', creado timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS espera (correo text, ciudad text, nombre text, celular text, avisado boolean DEFAULT false, creado timestamptz DEFAULT now(), PRIMARY KEY(correo, ciudad));
CREATE TABLE IF NOT EXISTS avisos (clave text PRIMARY KEY, creado timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS pagos (orden text PRIMARY KEY, tipo text, claim text, monto int, comision int DEFAULT 0, neto int DEFAULT 0, estado text, datos jsonb, prestador_id text, familia_id text, cita_id text, bold_id text, creado timestamptz DEFAULT now(), aprobado timestamptz, liberado timestamptz);
CREATE INDEX IF NOT EXISTS pagos_cita ON pagos(cita_id);
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS plan text;
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS demo boolean DEFAULT false;
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS bold_ref text;
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS nota text;
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS llave_ref text;
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS comprobante text;
CREATE TABLE IF NOT EXISTS retiros (id text PRIMARY KEY, prestador_id text, monto int, estado text, creado timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS resenas (id text PRIMARY KEY, prestador_id text, cita_id text UNIQUE, estrellas int, texto text, creado timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS preguntas (id text PRIMARY KEY, ciudad text, servicio text, texto text, respuesta text, creado timestamptz DEFAULT now(), respondida timestamptz);
CREATE TABLE IF NOT EXISTS solicitudes (id text PRIMARY KEY, nombre text, servicio text, ciudad text, rethus text, correo text, celular text, estado text, codigo text, creado timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS cuentas (correo text, tipo text, hash text, intentos int DEFAULT 0, intentos2 int DEFAULT 0, bloqueo timestamptz, bloqueada boolean DEFAULT false, motivo text, ultimo timestamptz, creado timestamptz DEFAULT now(), PRIMARY KEY(correo, tipo));
CREATE TABLE IF NOT EXISTS pagos_extra (pago_id text PRIMARY KEY, orden text, valor int, nota text, resuelto boolean DEFAULT false, creado timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS enlaces (token text PRIMARY KEY, correo text, tipo text, expira timestamptz, usado boolean DEFAULT false);
CREATE TABLE IF NOT EXISTS sesiones (token text PRIMARY KEY, tipo text, ref text, rol text, expira timestamptz);
`;
const AJUSTES_INICIALES = { ciudadesAbiertas: ['Santa Marta'], inasistencia: 50, diasRetiro: 8, precioRegular: 495000, precioEnLinea: 98000, incluidos: 7, adicional: 30000, maxAdicionales: 0, comision: 18, cuotaMedico: 380000, cuotaFundador: 190000, cupoFundadores: 100 };
async function iniciar() {
  HASH_FALSO = await hashClave(crypto.randomBytes(12).toString('hex'));
  await pool.query(ESQUEMA);
  await q(`INSERT INTO ajustes(id,datos) VALUES(1,$1) ON CONFLICT(id) DO NOTHING`, [AJUSTES_INICIALES]);
  await q(`INSERT INTO equipo(correo,rol,nombre) VALUES($1,'superior','Superadministrador') ON CONFLICT(correo) DO UPDATE SET rol='superior'`, [SUPERADMIN]);
  // (6 nov 2026) La sede propia no presta urgencias: se retira el servicio si existía
  await q(`UPDATE prestadores SET estado='rechazado' WHERE institucion AND urgencias`);
  // Servicios de la sede propia (precios de ejemplo: se editan en Administración → Sede propia)
  if (!(await q1('SELECT 1 FROM prestadores WHERE institucion LIMIT 1'))) {
    const RE = 'Clínica Reina Elizabeth IPS · Calle 22 No. 18-18, Santa Marta';
    const T = [0, 1, 2, 3, 4, 5, 6], L = [1, 2, 3, 4, 5, 6];
    const turnos = ['07:00', '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const s = [['Medicina general', 35000, T, turnos, { ahora: true }], ['Medicina general a domicilio', 90000, T, ['08:00', '10:00', '12:00', '15:00', '17:00'], { domicilio: true }],
      ['Sala de procedimientos básicos', 60000, L, ['08:00', '10:00', '14:00', '16:00']], ['Curaciones', 30000, T, ['08:00', '09:00', '10:00', '15:00', '16:00']], ['Enfermería a domicilio', 60000, T, ['08:00', '10:00', '14:00', '16:00'], { domicilio: true }],
      ['Vacunación especializada', 25000, L, ['08:00', '09:00', '10:00', '11:00', '14:00'], { nota: 'Valor de la aplicación y asesoría; el biológico se paga aparte.' }], ['Psicología', 55000, L, ['14:00', '15:00', '16:00', '17:00']],
      ['Autismo y neurodivergencia', 150000, L, ['08:00', '10:00', '14:00']], ['Terapia conductual', 50000, L, ['08:00', '09:00', '10:00', '14:00']], ['Terapia sensorial', 50000, L, ['09:00', '10:00', '15:00']],
      ['Terapia física', 45000, L, ['07:00', '08:00', '09:00', '16:00']], ['Terapia ocupacional', 45000, L, ['08:00', '09:00', '14:00', '15:00']]];
    for (const [serv, t, dias, horas, x = {}] of s)
      await q(`INSERT INTO prestadores(id,nombre,servicio,ciudad,sede,tarifa,particular,dias,horas,ahora,propio,institucion,domicilio,urgencias,estado,vence,correo,nota) VALUES($1,'Clínica Reina Elizabeth IPS',$2,'Santa Marta',$3,$4,$5,$6,$7,$8,true,true,$9,$10,'aprobado','2099-12-31',$11,$12)`,
        [uid('r'), serv, RE, t, Math.round(t * 1.6 / 5000) * 5000, dias, horas, !!x.ahora, !!x.domicilio, !!x.urgencias, (E.IPS_CORREO || 'contacto@reinaelizabeth.com').toLowerCase(), x.nota || null]);
  }
  if (DEMO) {
    // El Superadministrador NO va en la demostración
    await q(`DELETE FROM equipo WHERE correo='demo@skynetgenesis.com'`);
    for (const [c, rol, n] of [['contabilidad@skynetgenesis.com', 'contabilidad', 'Demo · Contabilidad'], ['verificador@skynetgenesis.com', 'verificador', 'Demo · Verificador ReTHUS'], ['operador@skynetgenesis.com', 'operador', 'Demo · Operador']])
      await q(`INSERT INTO equipo(correo,rol,nombre,demo) VALUES($1,$2,$3,true) ON CONFLICT(correo) DO NOTHING`, [c, rol, n]);
    const hd = await hashClave(CLAVE_DEMO);
    for (const [c, t] of [['demo@skynetgenesis.com', 'familia'], ['demo@skynetgenesis.com', 'medico'], ['contabilidad@skynetgenesis.com', 'admin'], ['verificador@skynetgenesis.com', 'admin'], ['operador@skynetgenesis.com', 'admin']])
      await q(`INSERT INTO cuentas(correo,tipo,hash) VALUES($1,$2,$3) ON CONFLICT(correo,tipo) DO NOTHING`, [c, t, hd]);
    if (!(await q1(`SELECT 1 FROM familias WHERE correo='demo@skynetgenesis.com'`))) {
      await q(`INSERT INTO familias(id,titular,correo,telefono,ciudad,vence,activada,demo) VALUES('fdemo','Familia Demo','demo@skynetgenesis.com','3000000000','Santa Marta',$1,$2,true)`, [masAnio(hoy()), hoy()]);
      for (const [i, m] of [['Ana Demo', '1000001', 'Titular'], ['Carlos Demo', '1000002', 'Cónyuge'], ['Sofía Demo', '1000003', 'Hija']].entries()) await q('INSERT INTO miembros(familia_id,orden,nombre,doc,parentesco) VALUES($1,$2,$3,$4,$5)', ['fdemo', i, ...m]);
    }
    await q(`INSERT INTO solicitudes(id,nombre,servicio,ciudad,rethus,correo,celular,estado,codigo) VALUES('sdemo','Dr. Nuevo Especialista (demo)','Cardiología','Santa Marta','RETHUS-DEMO-011','nuevo@skynetgenesis.com','3015551111','invitado','FS2026') ON CONFLICT(id) DO NOTHING`);
    if (!(await q1(`SELECT 1 FROM prestadores WHERE correo='demo@skynetgenesis.com'`)))
      await q(`INSERT INTO prestadores(id,nombre,servicio,ciudad,sede,tarifa,particular,dias,horas,ahora,propio,estado,vence,correo,celular,cedula,rethus,banco,mensaje,fundador,demo) VALUES('ddemo','Dra. Laura Méndez (demo)','Pediatría','Santa Marta','Consultorio 3, Clínica Reina Elizabeth IPS',90000,135000,'{0,1,2,3,4,5,6}','{08:00,09:00,10:00,11:00,15:00,16:00,17:00}',true,true,'aprobado',$1,'demo@skynetgenesis.com','3000000001','1000000001','RETHUS-DEMO-001','Bancolombia · ahorros · 000-123456-1234','Acompaño a su hijo desde el primer día con paciencia y explicaciones claras.',true,true)`, [masAnio(hoy())]);
  }
  await limpiar(); setInterval(limpiar, 6 * 3600e3);
  setInterval(revisarPendientes, 20 * 60e3);
  recordatorios(); setInterval(recordatorios, 15 * 60e3);
  brevoVivo(); setInterval(brevoVivo, 24 * 3600e3);
}
// Recordatorios: citas (24 h y 2 h antes), agenda del día del profesional, vencimientos (30, 7 y 1 días)
async function una(clave, fn) { const r = await q1('INSERT INTO avisos(clave) VALUES($1) ON CONFLICT DO NOTHING RETURNING clave', [clave]); if (r) await fn(); }
const horarioComercial = () => { const A = ahoraBog(), d = diaSemana(A.fecha), h2 = Number(A.hora.slice(0, 2)); return d === 0 ? false : d === 6 ? h2 >= 8 && h2 < 15 : h2 >= 7 && h2 < 19; };
async function recordatorios() {
  try {
    const A = ahoraBog(), H = A.fecha;
    const cs = await q(`SELECT c.id,c.miembro,c.fecha,c.hora,c.carnet,p.servicio,p.nombre pn,p.sede,f.correo fc FROM citas c JOIN prestadores p ON p.id=c.prestador_id JOIN familias f ON f.id=c.familia_id WHERE c.estado='confirmada' AND NOT c.inmediata AND c.demo=false AND c.fecha>=$1 AND c.fecha<=$2`, [H, sumarDias(H, 1)]);
    for (const c of cs) {
      const m = minutosHasta(c.fecha, c.hora);
      const txt = `<p>${hx(c.miembro)} · ${hx(c.servicio)} con ${hx(c.pn)}<br><b>${c.fecha} a las ${c.hora}</b><br>Dirección: ${hx(c.sede)}</p><p>Lleve su documento y su código de atención (está en "Mis consultas"). Si no puede asistir, reprograme o cancele con 2 horas de anticipación.</p>`;
      if (m > 120 && m <= 1440) await una('r24:' + c.id, () => correo(c.fc, 'Recordatorio: su consulta es mañana · FamilIA Salud', txt));
      else if (m > 0 && m <= 120) await una('r2:' + c.id, () => correo(c.fc, 'Su consulta es en menos de 2 horas · FamilIA Salud', txt));
    }
    if (Number(A.hora.slice(0, 2)) >= 6) {
      const ag = await q(`SELECT lower(p.correo) pc,c.fecha,c.hora,c.miembro,c.carnet,p.servicio FROM citas c JOIN prestadores p ON p.id=c.prestador_id WHERE c.estado='confirmada' AND c.demo=false AND c.fecha=$1 ORDER BY c.hora`, [H]);
      for (const pc of [...new Set(ag.map(x => x.pc))]) await una(`ag:${pc}:${H}`, () => correo(pc, `Su agenda de hoy · FamilIA Salud`, `<h2>Pacientes de hoy</h2><ul>${ag.filter(x => x.pc === pc).map(x => `<li>${x.hora} · ${hx(x.miembro)} (carnet ${x.carnet}) · ${hx(x.servicio)}</li>`).join('')}</ul><p>Pida a cada paciente su documento y su código de atención, y regístrelo en su portal.</p>`));
    }
    if (horarioComercial()) {
      const etapa = n => n > 7 ? 30 : n > 1 ? 7 : 1;
      for (const f of await q(`SELECT id,correo,titular,vence FROM familias WHERE demo=false AND vence>=$1 AND vence<=$2`, [H, sumarDias(H, 30)])) {
        const n = diasEntre(H, f.vence);
        await una(`vf:${f.id}:${f.vence}:${etapa(n)}`, () => correo(f.correo, n <= 1 ? 'Su carnet FamilIA Salud vence mañana' : `Su carnet FamilIA Salud vence en ${n} días`, `<p>${hx(f.titular)}, el carnet de su familia vence el ${f.vence}. Renueve sin perder días en <a href="${FRONT}/#/familia">Mi familia</a>.</p>`));
      }
      for (const p of await q(`SELECT DISTINCT ON (lower(correo)) correo,nombre,vence FROM prestadores WHERE demo=false AND NOT institucion AND estado='aprobado' AND vence>=$1 AND vence<=$2`, [H, sumarDias(H, 30)])) {
        const n = diasEntre(H, p.vence);
        await una(`vm:${p.correo.toLowerCase()}:${p.vence}:${etapa(n)}`, () => correo(p.correo, `Su registro en FamilIA Salud vence en ${n} día${n === 1 ? '' : 's'}`, `<p>${hx(p.nombre)}, su anualidad vence el ${p.vence}. Al vencer, las familias ya no podrán pedirle citas. Renueve en <a href="${FRONT}/#/medico">su portal</a>.</p>`));
      }
    }
  } catch (e) { console.error('recordatorios', e.message); }
}
// La clave de Brevo caduca tras 30 días sin uso: una consulta diaria la mantiene viva
async function brevoVivo() {
  if (!E.BREVO_API_KEY) return;
  try { await fetch('https://api.brevo.com/v3/account', { headers: { 'api-key': E.BREVO_API_KEY } }); } catch (e) { console.error('brevo', e.message); }
}
async function limpiar() {
  try {
    await q(`DELETE FROM sesiones WHERE expira<now()`);
    await q(`DELETE FROM enlaces WHERE expira<now()-interval '1 day'`);
    await q(`UPDATE citas SET estado='abandonada' WHERE estado='pendiente_pago' AND creado<now()-interval '1 day'`);
    await q(`UPDATE pagos SET estado='abandonado', datos='{}'::jsonb WHERE estado='pendiente' AND creado<now()-interval '3 days'`);
    if (DEMO) {
      await q(`DELETE FROM citas WHERE demo AND creado<now()-interval '1 day'`);
      await q(`DELETE FROM pagos WHERE demo AND creado<now()-interval '1 day'`);
      await q(`UPDATE prestadores SET ahora=true, ahora_desde=NULL, tarifa=90000, particular=135000, mensaje='Acompaño a su hijo desde el primer día con paciencia y explicaciones claras.' WHERE id='ddemo'`);
      const hd = await hashClave(CLAVE_DEMO);
      await q(`UPDATE cuentas SET hash=$1, bloqueada=false WHERE correo=ANY($2)`, [hd, CORREOS_DEMO]);
    }
  } catch (e) { console.error('limpieza', e.message); }
}

app.use('/api', (req, res) => res.status(404).json({ error: 'No encontrado.' }));
app.use((err, req, res, next) => { if (err && err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Datos mal formados.' }); if (err && err.type === 'entity.too.large') return res.status(413).json({ error: 'El archivo es demasiado grande.' }); console.error(err); res.status(500).json({ error: 'Error del servidor.' }); });
const PUERTO = Number(E.PORT || 3000);
iniciar().then(() => app.listen(PUERTO, () => console.log(`FamilIA Salud API en el puerto ${PUERTO} · demo=${DEMO} · pagos simulados=${DEMO_PAGOS}`)))
  .catch(e => { console.error('No se pudo iniciar', e); process.exit(1); });
