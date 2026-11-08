/* FamilIA Salud · Frontend (GitHub Pages) · SkyNet Genesis */
const API=(window.FS_API||'').replace(/\/$/,'');
const LOGO='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" aria-hidden="true"><rect x="4" y="4" width="192" height="192" rx="46" fill="#1E3A4C"/><g stroke="#FFFFFF" stroke-linecap="round"><polygon points="100,42 150.2,71 150.2,129 100,158 49.8,129 49.8,71" fill="none" stroke-opacity=".35" stroke-width="4"/><path d="M100 100L100 42M100 100L150.2 71M100 100L150.2 129M100 100L100 158M100 100L49.8 129M100 100L49.8 71" stroke-width="6"/></g><g fill="#FFFFFF"><circle cx="150.2" cy="71" r="10"/><circle cx="150.2" cy="129" r="10"/><circle cx="100" cy="158" r="10"/><circle cx="49.8" cy="129" r="10"/><circle cx="49.8" cy="71" r="10"/></g><circle cx="100" cy="42" r="13" fill="#E0A21A"/><circle cx="100" cy="100" r="20" fill="#E0A21A"/></svg>';
const LOGO_OSCURO=LOGO.replace('<rect x="4" y="4" width="192" height="192" rx="46" fill="#1E3A4C"/>','');
const SKYNET_REF='SkyNet Genesis · contacto@skynetgenesis.com · WhatsApp 304 437 5758';
const WA_SOPORTE='573128886611';
const LEGAL='FamilIA Salud complementa su EPS: conecta a su familia con profesionales independientes para atención inmediata, con precio preferencial. Usted paga solo la consulta que usa. No es medicina prepagada ni un seguro; cada servicio lo presta y factura el profesional o la institución.';

const MARCA='Famil<span class="ia">IA</span> Salud';
const ICO={reloj:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',precio:'<path d="M20 12l-8 8-8-8V4h8z"/><circle cx="8" cy="8" r="1.5"/>',familia:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.5 3-6 6-6s6 2.5 6 6"/><path d="M15 20c0-2.5 1.5-4.5 4-4.5"/>',
 tramite:'<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/><path d="M9.5 12.5l5 5M14.5 12.5l-5 5"/>',escudo:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',candado:'<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/>',
 casa:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M12 13v5M9.5 15.5h5"/>',mapa:'<path d="M12 21s-6-5.5-6-11a6 6 0 0112 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>',estrella:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
 chat:'<path d="M4 5h16v11H9l-5 4z"/>',recibo:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',corazon:'<path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z"/>',
 agenda:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9h16M9 3v4M15 3v4"/>',dinero:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',rayo:'<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',perfil:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'};
const ico=k=>`<span class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">${ICO[k]}</svg></span>`;
const FOTO_HERO=`<img class="foto-hero" src="https://images.pexels.com/photos/32423069/pexels-photo-32423069.jpeg?auto=compress&cs=tinysrgb&w=900&h=680&fit=crop" alt="Familia feliz disfrutando un día soleado en el parque" loading="eager" onerror="this.style.display='none'">`;
const ILUSTRACION=`<svg class="ilustra" viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Familia feliz y protegida">
<circle cx="200" cy="165" r="145" fill="#fff" opacity=".10"/><circle cx="200" cy="165" r="108" fill="#fff" opacity=".10"/>
<path d="M200 34l66 25v49c0 46-30 76-66 92-36-16-66-46-66-92V59z" fill="#fff"/><path d="M190 84h20v24h24v20h-24v24h-20v-24h-24v-20h24z" fill="#14A38B"/>
<path d="M80 92c0-8 10-11 14-4 4-7 14-4 14 4 0 9-14 16-14 16s-14-7-14-16z" fill="#FFB4A8"/><path d="M300 70c0-6 8-8 11-3 3-5 11-3 11 3 0 7-11 12-11 12s-11-5-11-12z" fill="#FFD6A5"/>
<ellipse cx="200" cy="302" rx="165" ry="12" fill="#000" opacity=".13"/>
<rect x="97" y="262" width="15" height="38" rx="7" fill="#24476E"/><rect x="118" y="262" width="15" height="38" rx="7" fill="#24476E"/>
<rect x="88" y="188" width="54" height="84" rx="24" fill="#8FE3D3"/><path d="M138 206l26 42" stroke="#C98B62" stroke-width="10" stroke-linecap="round"/>
<circle cx="115" cy="162" r="23" fill="#C98B62"/><path d="M92 158q2-26 23-26t23 26q-6-12-23-12t-23 12z" fill="#2E2018"/>
<circle cx="107" cy="163" r="2.4" fill="#1C2B39"/><circle cx="123" cy="163" r="2.4" fill="#1C2B39"/><path d="M107 172q8 7 16 0" stroke="#1C2B39" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="M259 168q0-36 26-36t26 36v34h-52z" fill="#5A3B2A"/>
<path d="M262 196h46l14 78h-74z" fill="#FFC48C"/><rect x="273" y="270" width="12" height="30" rx="6" fill="#E8B48F"/><rect x="292" y="270" width="12" height="30" rx="6" fill="#E8B48F"/>
<path d="M264 214l-26 40" stroke="#E8B48F" stroke-width="10" stroke-linecap="round"/>
<circle cx="285" cy="168" r="21" fill="#E8B48F"/><path d="M264 166q4-22 21-22t21 22q-8-10-21-10t-21 10z" fill="#5A3B2A"/>
<circle cx="278" cy="169" r="2.3" fill="#1C2B39"/><circle cx="292" cy="169" r="2.3" fill="#1C2B39"/><path d="M278 177q7 6 14 0" stroke="#1C2B39" stroke-width="2.3" fill="none" stroke-linecap="round"/>
<rect x="164" y="276" width="10" height="24" rx="5" fill="#D9A07A"/><rect x="178" y="276" width="10" height="24" rx="5" fill="#D9A07A"/>
<rect x="157" y="232" width="38" height="50" rx="15" fill="#FF9F9F"/><path d="M193 248l22 8" stroke="#D9A07A" stroke-width="8" stroke-linecap="round"/>
<circle cx="157" cy="206" r="8" fill="#3A2A20"/><circle cx="195" cy="206" r="8" fill="#3A2A20"/><circle cx="176" cy="214" r="17" fill="#D9A07A"/><path d="M159 210q3-17 17-17t17 17q-6-8-17-8t-17 8z" fill="#3A2A20"/>
<circle cx="170" cy="215" r="2" fill="#1C2B39"/><circle cx="182" cy="215" r="2" fill="#1C2B39"/><path d="M170 222q6 5 12 0" stroke="#1C2B39" stroke-width="2" fill="none" stroke-linecap="round"/>
<rect x="218" y="280" width="9" height="20" rx="4.5" fill="#F0C29B"/><rect x="231" y="280" width="9" height="20" rx="4.5" fill="#F0C29B"/>
<rect x="213" y="246" width="32" height="40" rx="13" fill="#9AD0FF"/>
<circle cx="229" cy="231" r="15" fill="#F0C29B"/><path d="M214 228q3-14 15-14t15 14q-5-7-15-7t-15 7z" fill="#6B4A33"/>
<circle cx="224" cy="232" r="1.9" fill="#1C2B39"/><circle cx="234" cy="232" r="1.9" fill="#1C2B39"/><path d="M224 238q5 4 10 0" stroke="#1C2B39" stroke-width="1.9" fill="none" stroke-linecap="round"/>
</svg>`;
/* ---------- Utilidades ---------- */
const pad=n=>String(n).padStart(2,'0');
const ymd=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const hoy=()=>{const d=new Date();d.setHours(0,0,0,0);return d};
const masDias=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const fmt=s=>{if(!s)return'—';const[y,m,d]=String(s).slice(0,10).split('-');return`${d}/${m}/${y}`};
const dinero=n=>(n<0?'−$':'$')+Math.abs(Math.round(Number(n)||0)).toLocaleString('es-CO');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DIAS=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const hora12=h=>{const [a,b]=String(h).split(':').map(Number);return `${((a+11)%12)+1}:${pad(b)} ${a<12?'a. m.':'p. m.'}`};
const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,'-');
const estrellas=n=>'★★★★★'.slice(0,Math.round(n))+'☆☆☆☆☆'.slice(0,5-Math.round(n));
const tok={get:t=>{try{return localStorage.getItem('fs_tok_'+t)}catch(e){return null}},set:(t,v)=>{try{v?localStorage.setItem('fs_tok_'+t,v):localStorage.removeItem('fs_tok_'+t)}catch(e){}}};

async function api(path,{method='GET',body,auth}={}){
  const h={'Content-Type':'application/json'}; if(auth){const t=tok.get(auth);if(t)h.Authorization='Bearer '+t}
  let r; try{r=await fetch(API+path,{method,headers:h,body:body?JSON.stringify(body):undefined})}
  catch(e){throw new Error('No hay conexión con el servidor. Si es la primera visita del día, espere un minuto mientras se activa y vuelva a intentar.')}
  const d=await r.json().catch(()=>({}));
  if(r.status===401&&auth) tok.set(auth,null);
  if(!r.ok) throw new Error(d.error||'Ocurrió un error. Intente de nuevo.');
  return d;
}
let CFG=null;
async function config(forzar){if(!CFG||forzar)CFG=await api('/api/publico/config');return CFG}
const ui={vistaFam:'carnets',vistaMed:'agenda',vistaAdm:'resumen',servicio:'',ciudadServ:'',nuevos:[],login:{},perfil:0};

function toast(m){document.querySelectorAll('.toast').forEach(x=>x.remove());const t=document.createElement('div');t.className='toast';t.setAttribute('role','status');t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),Math.max(5500,m.length*80))}
function cerrarModal(){document.getElementById('capa').innerHTML=''}
function modal(h){document.getElementById('capa').innerHTML=`<div class="modal-fondo"><div class="modal" role="dialog" aria-modal="true"><button class="cerrar-x" aria-label="Cerrar" onclick="cerrarModal()">×</button>${h}</div></div>`}
const ir=h=>{if(location.hash===h)render();else location.hash=h};
function ruta(){const h=(location.hash||'#/').slice(2).split('/');return {p:h[0]||'',a:decodeURIComponent(h[1]||'')}}
async function accion(fn,okMsg){try{const r=await fn();if(okMsg)toast(okMsg);await render();return r}catch(e){toast(e.message)}}

/* ---------- Pagos con Bold ---------- */
function cargarBold(){return new Promise((ok,mal)=>{if(window.BoldCheckout)return ok();const s=document.createElement('script');s.src='https://checkout.bold.co/library/boldPaymentButton.js';s.onload=()=>ok();s.onerror=()=>mal(new Error('No se pudo cargar Bold.'));document.head.appendChild(s)})}
async function iniciarPago(o){
  ui.ordenActual=o;
  try{localStorage.setItem('fs_orden',JSON.stringify({orden:o.orden,claim:o.claim,t:Date.now()}))}catch(e){}
  if(o.gratis){esperarPago();return;}
  if(o.demo){
    modal(`<h3>Pago en línea</h3><p>${esc(o.descripcion)}</p><div class="precio-gr">${dinero(o.monto)}</div>
      <p class="suave" style="margin-top:.6rem">Puede pagar con tarjeta débito o crédito, PSE, Nequi y todos los medios de pago.</p>
      <p class="recordatorio pequeno">Demostración: no se hace ningún cobro real. Al tocar el botón, el pago se aprueba de mentiras para que vea cómo sigue.</p>
      <div class="fila"><button class="btn btn-a" id="btnPagar">Simular el pago de ${dinero(o.monto)}</button><button class="btn btn-l" onclick="cerrarModal()">← Volver</button></div>`);
    document.getElementById('btnPagar').onclick=async()=>{try{await api(`/api/pagos/${o.orden}/simular`,{method:'POST',body:{claim:o.claim}});cerrarModal();esperarPago()}catch(e){toast(e.message)}};
    return;
  }
  modal(`<h3>Confirme su pago</h3><p>${esc(o.descripcion)}</p><div class="precio-gr">${dinero(o.monto)}</div>
    <p class="suave" style="margin-top:.6rem">Se abrirá la pasarela segura de pagos: tarjeta débito o crédito, PSE, Nequi y todos los medios de pago. Al aprobarse, todo se activa solo.</p>
    <div class="fila"><button class="btn btn-a" id="btnPagar">Pagar ${dinero(o.monto)}</button><button class="btn btn-l" onclick="cerrarModal()">← Volver</button></div>`);
  document.getElementById('btnPagar').onclick=async()=>{try{await cargarBold();cerrarModal();new window.BoldCheckout(o.bold).open()}catch(e){toast(e.message||'No se pudo abrir el pago.')}};
}
async function esperarPago(){
  let p; try{p=JSON.parse(localStorage.getItem('fs_orden'))}catch(e){}
  const qs=new URLSearchParams(location.search), ref=qs.get('bold-order-id');
  if(ref){try{await api('/api/bold/volver?ref='+encodeURIComponent(ref))}catch(e){}}
  if(!p)return;
  ui.esperando=true;
  modal(`<h3>Confirmando su pago…</h3><p class="suave">En cuanto la pasarela apruebe el pago, todo se activa automáticamente.</p><button class="btn btn-l" onclick="ui.esperando=false;cerrarModal()">Seguir navegando</button>`);
  for(let i=0;i<60&&ui.esperando;i++){
    try{
      const r=await api(`/api/pagos/${p.orden}${p.claim?'?claim='+p.claim:''}`);
      if(['aprobado','retenido','liberado'].includes(r.estado)){
        try{localStorage.removeItem('fs_orden')}catch(e){}
        if(location.search)history.replaceState(null,'',location.pathname+location.hash);
        CFG=null; return pagoAprobado(r);
      }
    }catch(e){}
    await new Promise(z=>setTimeout(z,3000));
  }
  if(!ui.esperando)return;
  modal(`<h3>Su pago sigue en proceso</h3><p>La pasarela aún no confirma el pago. Si ya pagó, en unos minutos quedará activo. Si tiene dudas, escríbanos.</p><div class="fila"><a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/${WA_SOPORTE}">Soporte por WhatsApp</a><button class="btn btn-l" onclick="cerrarModal()">Cerrar</button></div>`);
}
function pagoAprobado(r){
  cerrarModal();
  if(r.tipo==='afiliacion'){if(r.token)tok.set('familia',r.token);ui.nuevos=[];ui.vistaFam='carnets';ir('#/familia');toast('Pago aprobado. Los carnets de su familia ya están activos.');return}
  if(r.tipo==='registro_medico'){if(r.token)tok.set('medico',r.token);ui.invitacion=null;ir('#/medico');toast(r.monto===0?'Registro recibido. Su primer año es gratis; nuestro equipo está confirmando su ReTHUS.':'Pago recibido. Nuestro equipo está confirmando su ReTHUS.');return}
  if(r.tipo==='consulta'&&r.cita){const c=r.cita;
    modal(`<h3>Consulta confirmada</h3><p>${esc(c.miembro)} · ${esc(c.servicio)}<br>Profesional: <strong>${esc(c.nombre)}</strong><br>${c.inmediata?'<strong>Diríjase ahora mismo.</strong> El profesional ya fue avisado.':`${fmt(c.fecha)} a las ${hora12(c.hora)}`}<br>Dirección: ${esc(c.sede)}</p><p class="pequeno">Su código de atención. Entréguelo al profesional al terminar la consulta:</p><div class="cod-at">${esc(c.codigo)}</div><div class="fila" style="margin-top:1rem"><button class="btn btn-p" onclick="cerrarModal();ui.vistaFam='citas';ir('#/familia')">Ver mis consultas</button></div>`);return}
  toast('Pago aprobado.'); render();
}

/* ---------- Reglas en pantalla ---------- */
function precioPlan(n){const a=CFG.ajustes,extra=Math.max(0,n-a.incluidos)*a.adicional;return {regular:a.precioRegular+extra,enLinea:a.precioEnLinea+extra,extra,ahorro:a.precioRegular-a.precioEnLinea}}
const maxPersonas=()=>CFG.ajustes.incluidos+CFG.ajustes.maxAdicionales;
const netoMedico=t=>Math.round(t*(1-CFG.ajustes.comision/100));
function cupos(p,max=6){
  const out=[],ahora=new Date(),oc=new Set(p.ocupados||[]);
  for(let i=0;i<7&&out.length<max;i++){
    const d=masDias(hoy(),i); if(!(p.dias||[]).includes(d.getDay())) continue;
    if((p.bloqueos||[]).some(([a,b])=>ymd(d)>=a&&ymd(d)<=b)) continue;
    for(const hr of p.horas||[]){const [hh,mm]=hr.split(':').map(Number);const t=new Date(d);t.setHours(hh,mm);
      if(t<=ahora||oc.has(ymd(d)+'|'+hr)) continue; out.push({fecha:ymd(d),hora:hr,dia:d,i}); if(out.length>=max) break;}
  }
  return out;
}
const etiquetaTurno=c=>c.i===0?`Hoy ${hora12(c.hora)}`:c.i===1?`Mañana ${hora12(c.hora)}`:`${DIAS[c.dia.getDay()]} ${c.dia.getDate()} · ${hora12(c.hora)}`;
function disponibilidad(p){
  if(!p.recibe) return {r:9,txt:'No recibe pacientes por ahora'};
  if(p.urgencias) return {r:0,txt:'Atención inmediata 24 horas'};
  if(p.ahora) return {r:0,txt:'Disponible ahora'};
  const c=cupos(p,1)[0]; if(!c) return {r:9,txt:'Sin turnos esta semana'};
  return {r:c.i===0?1:c.i===1?2:3,txt:`Próximo turno: ${etiquetaTurno(c)}`};
}
const etqDisp=r=>r===0?'etq-ok':r<9?'etq-av':'etq-no';
const txtRango=r=>r===0?'Disponible ahora':r===1?'Disponible hoy':r===2?'Disponible mañana':r===3?'Disponible esta semana':'Sin turnos esta semana';

/* ---------- Marco ---------- */
async function render(){
  const r=ruta();
  document.getElementById('marca').innerHTML=`${LOGO}<span>Famil<b>IA</b> Salud</span>`;
  const links=[['','Inicio'],['familia','Mi familia'],['ciudades','Especialistas por ciudad'],['especialistas','Soy especialista'],['medico','Portal médico']];
  const actual=r.p==='ciudad'?'ciudades':r.p==='activar'?'familia':r.p;
  document.getElementById('nav').innerHTML=links.map(([k,t])=>`<a href="#/${k}" ${k==='familia'?'class="prioridad"':''} ${actual===k?'aria-current="page"':''}>${t}</a>`).join('');
  document.getElementById('pie').innerHTML=`${LOGO}<div><div>Desarrollado por <strong>SkyNet Genesis</strong> · contacto@skynetgenesis.com · WhatsApp 304 437 5758</div><div class="legal">${LEGAL}</div><div class="fila" style="margin-top:.5rem"><a href="#/terminos">Términos y condiciones</a><a href="#/terminos">Tratamiento de datos personales</a><a href="javascript:void 0" onclick="abrirManual('','general')">📘 Cómo funciona (manual)</a><a class="btn btn-l btn-chico" href="#/admin">Acceso SkyNet Genesis</a></div></div>`;
  const act=document.querySelector('#nav a[aria-current="page"]'); if(act&&act.scrollIntoView) act.scrollIntoView({block:'nearest',inline:'center'});
  const app=document.getElementById('app');
  const lento=setTimeout(()=>{if(app.dataset.cargando)app.innerHTML='<div class="panel">Despertando el servidor… la primera visita del día puede tardar hasta un minuto.</div>'},3500);
  app.dataset.cargando='1'; if(!app.innerHTML.trim()) app.innerHTML='<div class="panel">Cargando…</div>';
  const vistas={'':vInicio,ciudades:vCiudades,ciudad:()=>vCiudad(r.a),activar:vActivar,especialistas:vEspecialistas,familia:vFamilia,medico:vMedico,admin:vAdmin,terminos:vTerminos,ingresar:vIngresar,verificar:()=>vVerificar(location.hash.split('/')[2]||'',location.hash.split('/')[3]||''),clave:()=>vClave(r.a,(location.hash.split('/')[3]||''))};
  let html; try{await config();html=await (vistas[r.p]||vInicio)()}catch(e){html=`<div class="panel"><h3>No se pudo cargar</h3><p>${esc(e.message)}</p><button class="btn btn-p" onclick="render()">Reintentar</button></div>`}
  clearTimeout(lento); delete app.dataset.cargando;
  app.innerHTML=html;
  barraDemo(r.p);
  if(r.p==='especialistas') ofertaCiudad();
  if(r.p==='admin'&&ui.vistaAdm==='proyeccion') calcProy();
  if(document.querySelector('[data-qr]')) pintarQR();
}
function barraDemo(p){
  let b=document.getElementById('barraDemo'); const enDemo=CFG&&CFG.demo&&((p==='familia'&&ui.fam&&ui.fam.familia.correo==='demo@skynetgenesis.com'&&tok.get('familia'))||(p==='medico'&&tok.get('medico')&&ui.med&&ui.med.perfiles[0].nombre.includes('(demo)')));
  if(!enDemo){if(b)b.remove();document.body.style.paddingBottom='';return}
  if(!b){b=document.createElement('div');b.id='barraDemo';b.className='barra-demo';document.body.appendChild(b)}
  b.innerHTML=p==='familia'?`<span><strong>¿Quiere esto para su familia?</strong> Hasta 7 personas por ${dinero(CFG.ajustes.precioEnLinea)} al año.</span><span class="fila"><a class="btn btn-a btn-chico" href="#/activar" onclick="salir('familia')">Activar mi carnet</a><a class="btn btn-wa btn-chico" target="_blank" rel="noopener" href="https://wa.me/573044375758?text=${encodeURIComponent('Hola, quiero información de FamilIA Salud')}">Asesor</a></span>`
    :`<span><strong>¿Es especialista?</strong> Únase a la red y reciba pacientes con pago asegurado.</span><span class="fila"><a class="btn btn-a btn-chico" href="#/especialistas" onclick="salir('medico')">Solicitar acceso</a><a class="btn btn-wa btn-chico" target="_blank" rel="noopener" href="https://wa.me/573044375758?text=${encodeURIComponent('Hola, soy especialista y quiero unirme a FamilIA Salud')}">Asesor</a></span>`;
  document.body.style.paddingBottom='5.5rem';
}
window.addEventListener('hashchange',()=>{cerrarModal();if(ruta().p!=='ciudad')ui.servicio='';window.scrollTo(0,0);render()});

/* ---------- Ingreso con contraseña ---------- */
const OJO='<button type="button" class="btn btn-l btn-chico ojo" onclick="const i=this.previousElementSibling;i.type=i.type===\'password\'?\'text\':\'password\';this.textContent=i.type===\'password\'?\'Mostrar\':\'Ocultar\'">Mostrar</button>';
function vLogin(tipo,titulo,extra=''){
  const L=ui.login[tipo]||{};
  if(L.paso==='olvido') return `<section class="panel" style="max-width:480px"><h2>Crear o recuperar su contraseña</h2><p class="suave">Escriba su correo. Si tiene una cuenta, le enviaremos un enlace para crear una contraseña nueva (sirve una vez y vence en 1 hora).</p>
    <label for="lg_${tipo}">Correo</label><input id="lg_${tipo}" type="email" autocomplete="email" value="${esc(L.correo||'')}">
    <div class="fila" style="margin-top:.8rem"><button class="btn btn-a" onclick="pedirEnlace('${tipo}')">Enviar enlace</button><button class="btn btn-l" onclick="ui.login['${tipo}']={};render()">← Volver</button></div>${L.msg?`<p class="recordatorio" style="margin-top:.8rem">${esc(L.msg)}</p>`:''}</section>`;
  return `<section class="panel" style="max-width:480px"><h2>${titulo}</h2>
    <label for="lg_${tipo}">Correo</label><input id="lg_${tipo}" type="email" autocomplete="email" value="${esc(L.correo||'')}">
    <label for="cl_${tipo}">Contraseña</label><div class="fila" style="flex-wrap:nowrap"><input id="cl_${tipo}" type="password" autocomplete="current-password" onkeydown="if(event.key==='Enter')entrar('${tipo}')">${OJO}</div>
    <div class="fila" style="margin-top:.8rem"><button class="btn btn-a" onclick="entrar('${tipo}')">Ingresar</button>${CFG.demo&&tipo!=='admin'?`<button class="btn btn-l" onclick="document.getElementById('lg_${tipo}').value='demo@skynetgenesis.com';document.getElementById('cl_${tipo}').value='demo123456';entrar('${tipo}')">Usar cuenta demo</button>`:''}</div>
    <p style="margin-top:.8rem"><a href="javascript:void 0" onclick="ui.login['${tipo}']={paso:'olvido',correo:document.getElementById('lg_${tipo}').value};render()">Primera vez u olvidó su contraseña</a></p>${extra}</section>`;
}
async function pedirEnlace(tipo){
  const correo=document.getElementById('lg_'+tipo).value.trim();
  try{const r=await api('/api/auth/enlace',{method:'POST',body:{correo,tipo}});ui.login[tipo]={paso:'olvido',correo,msg:r.mensaje};render()}catch(e){toast(e.message)}
}
async function entrar(tipo){
  const correo=document.getElementById('lg_'+tipo).value.trim(), clave=document.getElementById('cl_'+tipo).value;
  try{const r=await api('/api/auth/entrar',{method:'POST',body:{correo,tipo,clave}});tok.set(tipo,r.token);ui.login[tipo]={};render()}catch(e){toast(e.message)}
}
async function salir(tipo){try{await api('/api/auth/salir',{method:'POST',auth:tipo})}catch(e){}tok.set(tipo,null);ir(tipo==='admin'?'#/':location.hash||'#/');render()}
async function vClave(tipo,token){
  return `<section class="panel" style="max-width:480px"><h2>Cree su contraseña</h2><p class="suave">Mínimo 10 caracteres. Escríbala dos veces.</p>
    <label for="nc1">Contraseña nueva</label><div class="fila" style="flex-wrap:nowrap"><input id="nc1" type="password" autocomplete="new-password">${OJO}</div>
    <label for="nc2">Repita la contraseña</label><div class="fila" style="flex-wrap:nowrap"><input id="nc2" type="password" autocomplete="new-password">${OJO}</div>
    <button class="btn btn-a" style="margin-top:.8rem" onclick="guardarClave('${esc(tipo)}','${esc(token)}')">Guardar y entrar</button></section>`;
}
async function guardarClave(tipo,token){
  try{const r=await api('/api/auth/clave',{method:'POST',body:{token,clave:document.getElementById('nc1').value,clave2:document.getElementById('nc2').value}});
    tok.set(r.tipo,r.token);history.replaceState(null,'',location.pathname);toast('Contraseña guardada. Ya está adentro.');ir(r.tipo==='familia'?'#/familia':r.tipo==='medico'?'#/medico':'#/admin')}catch(e){toast(e.message)}
}
function miCuenta(tipo){
  modal(`<h3>Mi cuenta · cambiar contraseña</h3>
    <label for="mc0">Contraseña actual</label><div class="fila" style="flex-wrap:nowrap"><input id="mc0" type="password">${OJO}</div>
    <label for="mc1">Contraseña nueva (mínimo 10)</label><div class="fila" style="flex-wrap:nowrap"><input id="mc1" type="password">${OJO}</div>
    <label for="mc2">Repita la nueva</label><div class="fila" style="flex-wrap:nowrap"><input id="mc2" type="password">${OJO}</div>
    <div class="fila" style="margin-top:.8rem"><button class="btn btn-a" onclick="cambiarClave('${tipo}')">Guardar</button><button class="btn btn-l" onclick="cerrarModal()">← Volver</button></div>`);
}
async function cambiarClave(tipo){
  const v=id=>document.getElementById(id).value;
  try{await api('/api/auth/cambiar',{method:'POST',auth:tipo,body:{tipo,actual:v('mc0'),nueva:v('mc1'),nueva2:v('mc2')}});cerrarModal();toast('Contraseña cambiada.')}catch(e){toast(e.message)}
}
async function abrirManual(tipo,m){
  try{toast('Preparando el manual…');const r=await fetch(`${API}/api/manual?m=${m}&tipo=${tipo}`,{headers:tipo&&tok.get(tipo)?{Authorization:'Bearer '+tok.get(tipo)}:{}});
    if(!r.ok){const d=await r.json().catch(()=>({}));throw new Error(d.error||'No se pudo abrir el manual.')}
    const b=await r.blob(),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=(r.headers.get('content-disposition')||'').split('filename="')[1]?.replace('"','')||'Manual-FamilIA-Salud.pdf';document.body.appendChild(a);a.click();a.remove();toast('Manual descargado en PDF.')}catch(e){toast(e.message)}
}
const barraCuenta=(tipo,quien,perfil)=>`<div class="fila cuenta-barra" style="justify-content:space-between;margin-bottom:.8rem"><div><span class="pequeno suave">Usted está en: <strong>${perfil}</strong></span><h2 style="margin:0">${esc(quien)}</h2></div><div class="fila"><button class="btn btn-l btn-chico" onclick="abrirManual('${tipo}','mio')">📘 Mi manual</button><button class="btn btn-l btn-chico" onclick="miCuenta('${tipo}')">Mi cuenta</button><button class="btn btn-l btn-chico" onclick="salir('${tipo}')">Cerrar sesión</button></div></div>`;

/* ---------- Términos y tratamiento de datos ---------- */
function vIngresar(){
  const c=(ic,t,d,h,b,cl)=>`<a class="panel" href="${h}" style="display:block;text-decoration:none;color:inherit"><div style="font-size:2rem">${ic}</div><h3 style="margin:.3rem 0">${t}</h3><p class="suave">${d}</p><span class="btn ${cl}">${b}</span></a>`;
  return `<section class="panel"><h2>¿Cómo quiere ingresar?</h2><p class="suave">Elija su tipo de cuenta. Todas entran con correo y contraseña; si es la primera vez, use «Primera vez u olvidó su contraseña».</p></section>
  <div class="rejilla">
    ${c('👨‍👩‍👧','Mi familia','Para las familias con carnet: ver el carnet, pedir y pagar consultas, saldo a favor.','#/familia','Ingresar como familia','btn-a')}
    ${c('🩺','Portal médico','Para especialistas y la sede propia: agenda, consultas, precios y retiros.','#/medico','Ingresar como profesional','btn-p')}
    ${c('🔐','Equipo FamilIA Salud','Superadministrador, verificación, contabilidad y operación (SkyNet Genesis).','#/admin','Acceso del equipo','btn-l')}
  </div>
  <p class="pequeno suave" style="margin-top:1rem">¿Aún no tiene cuenta? <a href="#/activar">Active el carnet de su familia</a> o <a href="#/especialistas">únase como especialista</a>.</p>
  <div class="fila" style="margin-top:.6rem"><a class="btn btn-l" href="#/">← Volver</a></div>`;
}
async function vTerminos(){
  const a=CFG.ajustes, P=(t,x)=>`<p><strong>${t}</strong> ${x}</p>`, H=t=>`<h3 style="margin-top:1.1rem">${t}</h3>`;
  return `<section class="panel"><p><a class="btn btn-l btn-chico" href="javascript:history.back()">← Volver</a></p><h2>Términos y condiciones de FamilIA Salud</h2>
  <p class="pequeno suave">Versión del 8 de noviembre de 2026. Al activar el carnet, registrarse como profesional o reservar una consulta, usted declara que leyó y acepta estos términos.</p>
  ${H('1. Quiénes somos y qué es FamilIA Salud')}
  ${P('Operador.','FamilIA Salud es una plataforma tecnológica de SkyNet Genesis S.A.S. (en adelante, «SkyNet Genesis»), contacto@skynetgenesis.com, WhatsApp 304 437 5758.')}
  ${P('Qué hace.','Conecta a las familias afiliadas con profesionales de la salud independientes e instituciones prestadoras que atienden con precio preferencial, y facilita la reserva y el pago en línea de las consultas.')}
  ${P('Qué no es.','No es una EPS, no es medicina prepagada, no es un seguro ni un plan de salud, y no reemplaza la afiliación al Sistema General de Seguridad Social en Salud. SkyNet Genesis no presta servicios de salud: cada servicio lo presta, lo factura y responde por él el profesional o la institución que atiende, conforme a su ética profesional y a la ley.')}
  ${P('Sede propia.','Algunos servicios en Santa Marta los presta la Clínica Reina Elizabeth IPS, institución vinculada a los mismos propietarios de SkyNet Genesis. Se informa para total transparencia; esa IPS responde por sus servicios como cualquier otro prestador.')}
  ${H('2. No atendemos urgencias')}
  <p>FamilIA Salud no es un servicio de urgencias ni de emergencias. Ante un síntoma grave o que ponga en riesgo la vida, acuda de inmediato al servicio de urgencias más cercano o llame a la línea 123. No espere una consulta reservada en la plataforma.</p>
  ${H('3. Afiliación familiar (carnet)')}
  ${P('Cobertura.',`Cubre hasta ${a.incluidos} personas de un mismo núcleo familiar durante 12 meses desde la aprobación del pago. Es personal e intransferible: el carnet solo lo usan las personas inscritas. El titular debe ser mayor de edad y responde por los menores que inscriba.`)}
  ${P('Precio.',`El valor regular es ${dinero(a.precioRegular)}; al activar usted mismo en línea paga ${dinero(a.precioEnLinea)}. La afiliación no incluye consultas: cada consulta se paga aparte. Los precios pueden cambiar para afiliaciones o renovaciones futuras; nunca durante una afiliación ya pagada.`)}
  ${P('Cambios de integrantes.','Puede cambiar integrantes hasta 2 veces por año desde «Mi familia».')}
  ${P('Derecho de retracto.','Por tratarse de una venta a distancia, puede retractarse dentro de los 5 días hábiles siguientes al pago, siempre que no haya reservado ni usado ninguna consulta con el carnet (Ley 1480 de 2011, art. 47). Escríbanos a contacto@skynetgenesis.com y le devolvemos el valor de la afiliación dentro de los 30 días calendario siguientes. Pasado ese plazo, o si ya usó el carnet, la afiliación no es reembolsable.')}
  ${P('Uso indebido.','Prestar el carnet o el código de atención a personas no inscritas, suplantar identidades o dar datos falsos permite cancelar la afiliación sin devolución, sin perjuicio de las acciones legales.')}
  ${H('4. Consultas y pagos')}
  ${P('Precios.','Cada profesional publica su precio real y su precio preferencial para afiliados, y responde por ellos. El precio que usted paga es el que aparece al reservar.')}
  ${P('Pago protegido.','El valor de la consulta se paga en línea al reservar y queda reservado por la plataforma. Solo se entrega al profesional cuando usted le presenta su código de atención el día de la consulta.')}
  ${P('Cancelar o reprogramar.','Puede cancelar o reprogramar desde «Mis consultas» hasta 2 horas antes de la hora reservada; cada consulta se puede reprogramar hasta 2 veces. Si cancela a tiempo, el valor completo queda como saldo a favor. Con menos de 2 horas, escríbanos por WhatsApp.')}
  ${P('Si usted no asiste.',`Si no asiste ni cancela a tiempo, el profesional recibe el ${a.inasistencia}% del valor por el turno reservado y el resto queda como saldo a favor.`)}
  ${P('Si el profesional no lo atiende o cancela.','El valor completo queda como saldo a favor.')}
  ${P('Saldo a favor.','Sirve para pagar sus próximas consultas. También puede pedir que se lo devolvamos a una cuenta bancaria a nombre del titular desde «Mi familia»; la transferencia se hace dentro de los 15 días hábiles siguientes a la solicitud.')}
  ${P('Medios de pago.','Los pagos se procesan con la pasarela Bold (tarjetas, PSE, Nequi y otros). SkyNet Genesis no guarda datos de tarjetas ni claves bancarias.')}
  ${P('Facturación.','SkyNet Genesis factura la afiliación y sus servicios de plataforma. Cada profesional o institución factura la consulta que presta.')}
  ${H('5. Profesionales e instituciones')}
  ${P('Ingreso.','Solo por invitación. Antes de publicar un perfil, una persona del equipo verifica el registro en el ReTHUS, la especialidad y la tarjeta profesional; SkyNet Genesis puede negar o retirar un perfil por datos falsos, quejas fundadas o incumplimiento.')}
  ${P('Independencia y responsabilidad.','Los profesionales son independientes: no son empleados ni contratistas de SkyNet Genesis. Responden por el diagnóstico, el tratamiento, la historia clínica, el consentimiento informado, sus permisos de funcionamiento y su facturación.')}
  ${P('Cuota y comisión.',`La cuota anual es de ${dinero(a.cuotaMedico)} (los primeros ${a.cupoFundadores} especialistas de cada ciudad ${a.cuotaFundador===0?'tienen el primer año gratis':'pagan '+dinero(a.cuotaFundador)+' el primer año'} como Especialista Fundador). Por cada consulta atendida la plataforma descuenta el ${a.comision}% por servicios de plataforma. Al vencer la cuota anual, el perfil deja de recibir pacientes y luego se bloquea.`)}
  ${P('Retiros.',`El valor de cada consulta atendida se puede retirar ${a.diasRetiro} días después de la atención, a la cuenta bancaria registrada a nombre del profesional o la institución.`)}
  ${P('Trato directo.','Los pacientes conseguidos por la plataforma se atienden y cobran a través de ella mientras el perfil esté activo. Desviar pagos fuera de la plataforma permite retirar el perfil.')}
  ${H('6. Responsabilidad de SkyNet Genesis')}
  <p>SkyNet Genesis responde por el buen funcionamiento de la plataforma, la verificación de los profesionales descrita arriba y el manejo correcto de los pagos. No responde por los actos médicos ni por sus resultados, que son responsabilidad de quien atiende, ni por interrupciones causadas por fallas de internet, de la pasarela de pagos o de fuerza mayor. Nada en estos términos limita los derechos que la ley le reconoce como consumidor.</p>
  ${H('7. Peticiones, quejas y reclamos')}
  <p>Escríbanos a contacto@skynetgenesis.com o al WhatsApp 304 437 5758. Respondemos dentro de los 15 días hábiles siguientes. Si no queda satisfecho, puede acudir a la Superintendencia de Industria y Comercio. Las quejas sobre la atención médica también pueden presentarse ante la Secretaría de Salud o la Superintendencia Nacional de Salud.</p>
  ${H('8. Cambios y ley aplicable')}
  <p>Podemos actualizar estos términos; la versión vigente se publica aquí con su fecha y los cambios importantes se avisan por correo. Estos términos se rigen por las leyes de la República de Colombia.</p>
  <h2 style="margin-top:1.4rem">Tratamiento de datos personales</h2>
  ${P('Responsable.','SkyNet Genesis S.A.S., contacto@skynetgenesis.com, WhatsApp 304 437 5758, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015).')}
  ${P('Qué datos recogemos.','Nombres, documentos, parentesco, correo, celular, ciudad, consultas reservadas, pagos y saldo; de los profesionales, además, registro profesional, documentos de soporte y cuenta bancaria.')}
  ${P('Para qué.','Emitir los carnets, reservar y pagar consultas, verificar a los profesionales, enviar avisos y recordatorios, atender peticiones, prevenir fraudes y cumplir obligaciones legales y contables. No vendemos sus datos ni los usamos para publicidad de terceros.')}
  ${P('Datos sensibles y de menores.','Los datos relacionados con la salud (por ejemplo, qué especialidad consultó) y los de niños, niñas y adolescentes son sensibles: usted no está obligado a entregarlos y solo los tratamos con su autorización expresa, para prestar el servicio y respetando el interés superior del menor. La historia clínica la lleva el profesional o la institución que atiende, no la plataforma.')}
  ${P('Quién los ve.','El público solo ve la especialidad y la disponibilidad de los profesionales. El nombre y la dirección del profesional los ve únicamente el paciente que pagó la consulta, y el profesional ve solo los datos del paciente que va a atender. Los datos bancarios los ven solo la administración superior y contabilidad. Las contraseñas se guardan cifradas.')}
  ${P('Dónde se guardan.','En servidores de proveedores de nube (que pueden estar fuera de Colombia) con medidas de seguridad, cifrado de contraseñas y copias de respaldo. Al aceptar, usted autoriza esa transmisión para los fines indicados.')}
  ${P('Sus derechos.','Conocer, actualizar, rectificar y pedir la supresión de sus datos, pedir prueba de la autorización, revocarla y presentar quejas ante la Superintendencia de Industria y Comercio. Escriba a contacto@skynetgenesis.com; las consultas se responden en 10 días hábiles y los reclamos en 15 días hábiles.')}
  <p class="legal">${SKYNET_REF}</p></section>`;
}

/* ---------- Ventajas para las familias ---------- */
function ventajasFamilia(){
  const a=CFG.ajustes,p=precioPlan(1);
  const v=[['reloj','Atención inmediata','Especialistas disponibles ahora mismo o en el próximo turno libre del día. Sin esperar meses.'],['precio','Precio preferencial','Cada consulta con descuento frente al precio real del profesional.'],
    ['familia','Toda la familia en un solo carnet',`Hasta ${a.incluidos} personas por núcleo familiar por ${dinero(p.enLinea)} al año. Cada una con su carnet digital.`],['tramite','Sin trámites de EPS','Sin autorizaciones, sin órdenes y sin filas. Usted elige al especialista.'],
    ['escudo','Especialistas verificados','Nuestro equipo confirma en el ReTHUS la especialidad de cada médico.'],['candado','Pago protegido','El dinero solo se entrega al profesional cuando usted ya fue atendido.'],
    ['casa','Atención en casa','En Santa Marta: médico y enfermería a domicilio con Clínica Reina Elizabeth IPS.'],['mapa','Red en crecimiento en todo el país','Especialistas en las principales ciudades de Colombia, con el mismo carnet.'],
    ['estrella','Opiniones reales','Solo califican los pacientes que fueron atendidos.'],['chat','Pregúntele al especialista','Resuelva dudas generales con especialistas de su ciudad, sin costo.'],
    ['recibo','Recibo de cada pago','Todos sus pagos y consultas quedan registrados, con su recibo.'],['corazon','Complementa su EPS','Siga usando su EPS y use FamilIA Salud cuando no pueda esperar.']];
  return `<section class="panel"><h2>Ventajas de pertenecer a ${MARCA}</h2><ul class="lista-v">${v.map(([k,t,d])=>`<li>${ico(k)}<div><strong>${t}</strong><br><span class="pequeno">${d}</span></div></li>`).join('')}</ul>
  <a class="btn btn-a" style="margin-top:1rem" href="#/activar">Activar el carnet de mi familia · hasta ${a.incluidos} personas</a></section>`;
}

/* ---------- Inicio ---------- */
async function vInicio(){
  const a=CFG.ajustes,p=precioPlan(1),n=CFG.especialidadesTotal||0;
  return `<section class="hero"><div>
    <span class="sello">✓ Sin autorizaciones de EPS</span>
    <h1 style="margin-top:.6rem">Especialistas para toda su familia, sin esperar meses</h1>
    <p>Con el carnet ${MARCA.replace('class="ia"','style="color:#8FE3D3;font-weight:800"')} su familia consulta especialistas particulares hoy mismo y paga cada consulta con precio preferencial.</p>
    <div class="espera"><div class="eps"><span class="pequeno">Con su EPS</span><strong>Meses de espera</strong></div><div class="fs"><span class="pequeno">Con su carnet FamilIA Salud</span><strong>Ahora mismo</strong></div></div>
    <div class="fila"><a class="btn btn-a" href="#/activar">Activar el carnet de mi familia</a><a class="btn btn-l" href="#/ciudades">Ver especialistas</a></div>
    <p class="pequeno" style="margin-top:.8rem;color:#E3EEF9">${n} especialidades y servicios disponibles para usted.</p></div>
    ${FOTO_HERO}</section>
  ${ventajasFamilia()}
  <section class="panel"><h2>Afiliación anual de toda la familia</h2>
    <div class="precio-plan"><span class="precio-gr">${dinero(p.enLinea)}</span><span class="tachado">${dinero(p.regular)}</span><span class="etq etq-ok">Ahorra ${dinero(p.ahorro)} activando usted mismo en línea</span></div>
    <p style="margin-top:.5rem"><strong>Hasta ${a.incluidos} personas por núcleo familiar</strong>, con un solo pago al año. Después, solo paga la consulta que use.</p>
    <p class="pequeno suave">Si su familia tiene más de ${a.incluidos} personas, active un segundo grupo familiar. El precio regular aplica cuando la activación se hace con ayuda de un asesor.</p>
    <a class="btn btn-a" href="#/activar">Activar el carnet de mi familia</a></section>
  <section class="panel"><h2>Así funciona</h2><ol class="pasos">
    <li><div><strong>Active el carnet de su familia.</strong> Paga en línea con tarjeta, PSE, Nequi y todos los medios de pago.</div></li>
    <li><div><strong>Toque su ciudad y elija la especialidad.</strong> Verá quién está disponible ahora.</div></li>
    <li><div><strong>Pague la consulta y quede confirmado.</strong> Recibe al instante el nombre del profesional, la dirección y su código.</div></li>
    <li><div><strong>Entregue el código en la consulta.</strong> Solo entonces se le paga al profesional.</div></li></ol></section>
  ${CFG.ips.length?`<section class="panel"><h2>En Santa Marta: Clínica Reina Elizabeth IPS</h2><p class="suave">Sede propia con atención inmediata en:</p><p>${CFG.ips.map(esc).join(' · ')}</p><a class="btn btn-p" href="#/ciudad/santa-marta">Ver especialistas en Santa Marta</a></section>`:''}
  <section class="panel"><h2>Toque su ciudad</h2><div class="ciudades">${CFG.ciudades.map(c=>`<a class="${CFG.conRed[c]?'con':''}" href="#/ciudad/${slug(c)}">${c}</a>`).join('')}</div></section>`;
}
async function vCiudades(){
  return `<h2>Especialistas por ciudad</h2><p class="suave">Toque su ciudad para abrir el catálogo de especialistas.</p><div class="rejilla">${CFG.ciudades.map(c=>{const n=CFG.ahora[c]||0;return `<a class="panel" style="text-decoration:none;margin:0" href="#/ciudad/${slug(c)}"><h3 style="margin:0">${c}</h3><span class="pequeno ${n?'':'suave'}">${n?`${n} disponible${n>1?'s':''} ahora`:'Ver catálogo'}</span></a>`}).join('')}</div>`;
}

/* ---------- Catálogo por ciudad ---------- */
async function vCiudad(s){
  const c=CFG.ciudades.find(x=>slug(x)===s); if(!c) return `<div class="panel">No encontramos esa ciudad. <a href="#/ciudades">Ver todas</a></div>`;
  document.title=`Especialistas en ${c} · FamilIA Salud`;
  if(ui.ciudadServ!==c){ui.ciudadServ=c;ui.servicio=''}
  const d=await api('/api/publico/ciudad/'+encodeURIComponent(c),{auth:'familia'}); ui.datosCiudad=d;
  const lista=d.prestadores, fam=d.familia;
  let h=`<h1 style="font-size:clamp(2rem,6vw,3rem)">Especialistas en ${c}</h1>`;
  if(!d.abierta) h+=`<section class="panel" style="border-left:5px solid var(--acento)"><h2 style="margin-top:0">Próximamente en ${c}</h2><p>Estamos reuniendo especialistas en ${c}. Le avisamos por correo el día que pueda activar el carnet de su familia aquí.</p><div class="r2"><div><label for="eNom">Nombre</label><input id="eNom"></div><div><label for="eCor">Correo</label><input id="eCor" type="email"></div><div><label for="eCel">Celular</label><input id="eCel" inputmode="tel"></div></div><button class="btn btn-a" style="margin-top:.6rem" onclick="anotarEspera('${c}')">Avisarme</button><p class="pequeno suave" style="margin-top:.6rem">¿Es especialista en ${c}? <a href="#/especialistas">Únase a la red</a>.</p></section>`;
  if(!fam) h+=`<p class="recordatorio pequeno">Ingrese con el carnet de su familia para ver tarifas, horarios y ser atendido. <a href="#/familia">Mi familia</a> · <a href="#/activar">Activar carnet</a></p>`;
  if(!ui.servicio){
    const mejor=sv=>{const xs=lista.filter(x=>x.servicio===sv);return xs.length?Math.min(...xs.map(x=>disponibilidad(x).r)):null};
    const conRed=[...new Set(lista.map(x=>x.servicio))].map(sv=>({sv,r:mejor(sv)})).sort((a,b)=>a.r-b.r||a.sv.localeCompare(b.sv));
    ui.items=conRed.map(x=>x.sv);
    h+=`<label for="buscaEsp">Buscar especialidad</label><input id="buscaEsp" placeholder="Ej. cardiología, pediatría, ortopedia" oninput="filtrarCatalogo(this.value)">`;
    h+= conRed.length?`<h2 style="margin-top:1rem">Disponibles en ${c}</h2><div class="rejilla" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">${conRed.map((it,i)=>`<button class="panel tile" data-n="${esc(it.sv.toLowerCase())}" style="margin:0;text-align:left;cursor:pointer;font:inherit;color:inherit" onclick="ui.servicio=ui.items[${i}];render()"><strong style="font-family:var(--titulo);font-size:1.2rem">${esc(it.sv)}</strong><br><span class="etq ${etqDisp(it.r)}">${txtRango(it.r)}</span></button>`).join('')}</div>`:`<p class="panel">Aún no hay especialistas habilitados en ${c}. Muy pronto.</p>`;
    h+=`<h2 style="margin-top:1.2rem">Catálogo completo</h2>${CFG.catalogo.map(gr=>`<details class="panel" style="margin-bottom:.6rem"><summary style="cursor:pointer;font-weight:700">${esc(gr.g)}</summary><div class="cupos" style="margin-top:.6rem">${gr.e.map(sv=>{const r=mejor(sv);return r==null?`<span class="etq etq-no tile" data-n="${esc(sv.toLowerCase())}">${esc(sv)} · no disponible</span>`:`<button class="tile" data-n="${esc(sv.toLowerCase())}" onclick="ui.servicio=${JSON.stringify(sv).replace(/"/g,'&quot;')};render()">${esc(sv)} · ${txtRango(r).toLowerCase()}</button>`}).join('')}</div></details>`).join('')}`;
    if(fam) h+=vPrecios(c,lista);
    return h+vPreguntas(c,d.preguntas);
  }
  const ver=lista.filter(x=>x.servicio===ui.servicio).sort((a,b)=>disponibilidad(a).r-disponibilidad(b).r);
  h+=`<div class="fila" style="margin-bottom:.8rem"><button class="btn btn-l btn-chico" onclick="ui.servicio='';render()">← Todas las especialidades</button><h2 style="margin:0">${esc(ui.servicio)}</h2></div>`;
  return h+`<div class="rejilla">${ver.map(x=>tarjeta(x,fam)).join('')||'<div class="panel">No disponible por ahora en esta ciudad.</div>'}</div>`;
}
function anotarEspera(c){const v=id=>document.getElementById(id).value;accion(()=>api('/api/publico/espera',{method:'POST',body:{ciudad:c,nombre:v('eNom'),correo:v('eCor'),celular:v('eCel')}}),'Listo. Le avisaremos cuando abramos en '+c+'.')}
function filtrarCatalogo(t){t=t.trim().toLowerCase();document.querySelectorAll('.tile').forEach(e=>{e.style.display=!t||e.dataset.n.includes(t)?'':'none'});if(t)document.querySelectorAll('details').forEach(d=>d.open=true)}
function vPrecios(c,lista){
  const svs=[...new Set(lista.filter(x=>!x.urgencias&&x.tarifa).map(x=>x.servicio))].sort(); if(!svs.length) return '';
  return `<section class="panel" style="margin-top:1rem"><h2>Tarifas de referencia en ${c}</h2><p class="pequeno suave">Promedio del precio preferencial frente al precio real.</p><ul class="lista">${svs.map(sv=>{const xs=lista.filter(x=>x.servicio===sv);return `<li><span>${esc(sv)}</span><span><strong>${dinero(xs.reduce((a,x)=>a+x.tarifa,0)/xs.length)}</strong> <span class="tachado pequeno">${dinero(xs.reduce((a,x)=>a+x.particular,0)/xs.length)}</span></span></li>`}).join('')}</ul></section>`;
}
function tarjeta(p,fam){
  const disp=disponibilidad(p);
  if(!fam) return `<article class="panel esp" style="margin:0"><div class="top"><h3 style="margin:0">${esc(p.servicio)}</h3>${p.propio?'<span class="etq etq-ips">Sede propia</span>':''}</div><div><span class="etq ${etqDisp(disp.r)}">${disp.txt}</span></div><button class="btn btn-l btn-chico" style="align-self:flex-start" onclick="soloAfiliados()">Ver tarifa y ser atendido</button></article>`;
  let acc='';
  if(!p.recibe) acc='<p class="pequeno suave">Este profesional no está recibiendo pacientes por ahora.</p>';
  else if(p.urgencias) acc=`<p class="pequeno">Acuda directamente con su carnet y documento.</p><a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/${WA_SOPORTE}?text=${encodeURIComponent('Hola, soy afiliado de FamilIA Salud y voy en camino a urgencias.')}">Avisar que voy en camino</a>`;
  else{ if(p.ahora) acc+=`<button class="btn btn-a" onclick="pedirCita('${p.id}','','ahora')">Ser atendido ahora</button>`;
    const cs=cupos(p); acc+=cs.length?`<div class="pequeno" style="font-weight:600">${p.ahora?'O elija un turno':'Próximos turnos libres'}</div><div class="cupos">${cs.map(x=>`<button onclick="pedirCita('${p.id}','${x.fecha}','${x.hora}')">${etiquetaTurno(x)}</button>`).join('')}</div>`:(p.ahora?'':'<p class="pequeno suave">Sin turnos libres esta semana.</p>'); }
  const r=p.rep;
  return `<article class="panel esp" style="margin:0;${ui.resaltar===p.id?'outline:3px solid var(--acento)':''}"><div class="top"><h3 style="margin:0">${esc(p.servicio)}</h3>${p.propio?'<span class="etq etq-ips">Sede propia</span>':''}</div>
    <div><span class="etq ${etqDisp(disp.r)}">${disp.txt}</span>${ui.resaltar===p.id?' <span class="etq etq-ok">Ya lo atendió antes</span>':''}</div>${p.mensaje?`<p style="margin:0;font-style:italic">“${esc(p.mensaje)}”</p>`:''}
    <div class="suave pequeno">${esc(p.ciudad)}${p.domicilio?' · lo atendemos en su casa':''} · dirección al confirmar</div>
    ${r?`<div class="pequeno"><span style="color:var(--ambar)">${estrellas(r.prom)}</span> ${r.prom.toFixed(1)} · ${r.n} ${r.n>1?'opiniones':'opinión'} de pacientes atendidos · ${r.rec}% lo recomienda</div>`:''}
    <div><span class="precio">${dinero(p.tarifa)}</span> <span class="tachado">${dinero(p.particular)}</span><div class="pequeno" style="color:var(--wa);font-weight:600">Precio preferencial: ahorra ${dinero(p.particular-p.tarifa)}</div>${p.nota?`<div class="pequeno suave">${esc(p.nota)}</div>`:''}</div>${acc}</article>`;
}
function soloAfiliados(){modal(`<h3>Tarifas y atención para familias afiliadas</h3><p>Las tarifas, los turnos y la atención inmediata se ven al ingresar con el carnet activo de su familia.</p><div class="fila"><a class="btn btn-a" href="#/familia">Mi familia</a><a class="btn btn-l" href="#/activar">Activar carnet</a></div>`)}
async function pedirCita(pid,fecha,hora){
  if(!tok.get('familia')){soloAfiliados();return}
  let yo; try{yo=await api('/api/familia/yo',{auth:'familia'})}catch(e){toast(e.message);return}
  const p=ui.datosCiudad.prestadores.find(x=>x.id===pid), inmediata=hora==='ahora', d=fecha?new Date(fecha+'T00:00:00'):null;
  modal(`<h3>${inmediata?'Atención inmediata':'Confirmar turno'}</h3><p><strong>${esc(p.servicio)}</strong><br>${inmediata?'Ahora mismo':`${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]} a las ${hora12(hora)}`}<br><span class="suave pequeno">${esc(p.ciudad)} · dirección exacta al confirmar</span></p>
    <label for="cMiembro">¿Para quién es la consulta?</label><select id="cMiembro">${yo.miembros.map((m,i)=>`<option value="${i}">${esc(m.nombre)} (${esc(m.parentesco)})</option>`).join('')}</select>
    <p class="pequeno" style="margin-top:.8rem">Precio preferencial: <strong>${dinero(p.tarifa)}</strong> <span class="tachado">${dinero(p.particular)}</span>. Su dinero queda protegido y solo se le paga al profesional cuando usted entregue su código de atención.</p>
    ${yo.familia.saldo>=p.tarifa?`<label style="display:flex;gap:.5rem;align-items:center;font-weight:600"><input type="checkbox" id="cSaldo" checked> Pagar con mi saldo a favor (${dinero(yo.familia.saldo)})</label>`:yo.familia.saldo>0?`<p class="pequeno suave">Tiene ${dinero(yo.familia.saldo)} de saldo a favor; se usa cuando alcanza para la consulta completa.</p>`:''}
    <div class="fila"><button class="btn btn-a" id="btnCita">Pagar y confirmar</button><button class="btn btn-l" onclick="cerrarModal()">Volver</button></div>`);
  document.getElementById('btnCita').onclick=async()=>{try{const cs=document.getElementById('cSaldo');const o=await api('/api/familia/cita',{method:'POST',auth:'familia',body:{prestador:pid,fecha,hora,miembro:Number(document.getElementById('cMiembro').value),conSaldo:!!(cs&&cs.checked)}});cerrarModal();
    if(o.pagadoConSaldo){const r=await api(`/api/pagos/${o.orden}?claim=${o.claim}`);return pagoAprobado(r)} iniciarPago(o)}catch(e){toast(e.message)}};
}
function vPreguntas(c,qs){
  const opciones=CFG.catalogo.flatMap(g=>g.e);
  return `<section class="panel" style="margin-top:1rem"><h2>Pregúntele al especialista</h2><p class="pequeno suave">Dudas generales respondidas por especialistas de ${c}. Es orientación, no reemplaza la consulta. Su nombre no se publica.</p>
  ${qs.length?`<ul class="lista">${qs.map(q=>`<li style="display:block"><strong>${esc(q.texto)}</strong><p style="margin:.4rem 0 0">${esc(q.respuesta)}</p><span class="pequeno suave">Responde: especialista en ${esc(q.servicio)} · ${c}</span></li>`).join('')}</ul>`:'<p class="suave">Aún no hay preguntas respondidas en esta ciudad.</p>'}
  <label for="qServ">Especialidad</label><select id="qServ">${opciones.map(x=>`<option>${esc(x)}</option>`).join('')}</select>
  <label for="qPreg">Su pregunta</label><textarea id="qPreg" rows="3" maxlength="400" placeholder="Escriba su duda sin datos personales"></textarea>
  <button class="btn btn-p" style="margin-top:.6rem" onclick="preguntar('${c}')">Enviar pregunta</button></section>`;
}
function preguntar(c){accion(()=>api('/api/publico/pregunta',{method:'POST',body:{ciudad:c,servicio:document.getElementById('qServ').value,texto:document.getElementById('qPreg').value}}),'Pregunta enviada. Un especialista la responderá y aparecerá aquí.')}

/* ---------- Activación ---------- */
async function vActivar(){
  const a=CFG.ajustes,n=ui.nuevos.length,p=precioPlan(Math.max(n,1)),max=maxPersonas();
  return `<div class="rejilla" style="align-items:start"><section class="panel"><h2>Active el carnet de su familia</h2><p><strong>Hasta ${a.incluidos} personas por núcleo familiar.</strong></p><p class="suave">Se activa en el acto al aprobarse el pago. Vigencia de 12 meses.</p>
    <label for="aTit">Nombre del titular</label><input id="aTit" autocomplete="name">
    <div class="r2"><div><label for="aCor">Correo</label><input id="aCor" type="email" autocomplete="email"></div><div><label for="aTel">Celular (WhatsApp)</label><input id="aTel" inputmode="tel"></div></div>
    <label for="aCiu">Ciudad</label><select id="aCiu">${CFG.ciudades.map(c=>(CFG.ciudadesAbiertas||[]).includes(c)?`<option>${c}</option>`:`<option disabled>${c} (próximamente)</option>`).join('')}</select>
    <h3 style="margin-top:1rem">Personas en el carnet (${n} de ${max})</h3>
    ${n?`<ul class="lista">${ui.nuevos.map((m,i)=>`<li><span>${esc(m.nombre)} · ${esc(m.parentesco)} · ${esc(m.doc)}${i>=a.incluidos?' <span class="etq etq-av">adicional</span>':''}</span><button class="btn btn-l btn-chico" onclick="quitarBenef(${i})">Quitar</button></li>`).join('')}</ul>`:'<p class="suave pequeno">Agregue primero al titular y luego a cada familiar.</p>'}
    ${n<max?`<div class="r2"><div><label for="bNom">Nombre completo</label><input id="bNom"></div><div><label for="bDoc">Documento</label><input id="bDoc" inputmode="numeric"></div><div><label for="bPar">Parentesco</label><select id="bPar">${['Titular','Cónyuge','Hijo(a)','Padre','Madre','Hermano(a)','Abuelo(a)','Nieto(a)','Suegro(a)','Otro'].map(x=>`<option>${x}</option>`).join('')}</select></div></div><button class="btn btn-l" style="margin-top:.6rem" onclick="agregarBenef()">Agregar persona</button>`:`<p class="recordatorio pequeno">Llegó al máximo de ${max} personas por carnet. Para más familiares, active un segundo grupo familiar con otro titular.</p>`}</section>
  <div><section class="panel"><h3>Lo que recibe su familia</h3><ul class="lista pequeno">${['Atención inmediata con especialistas','Precio preferencial en cada consulta','Carnet digital para cada persona','Sin autorizaciones de EPS','Pago protegido hasta ser atendido','Especialistas verificados en el ReTHUS'].map(x=>`<li><span>✓ ${x}</span></li>`).join('')}</ul></section>
  <section class="panel"><h3>Resumen</h3><ul class="lista pequeno"><li><span>Afiliación anual hasta ${a.incluidos} personas</span><span>${dinero(a.precioRegular)}</span></li>${p.extra?`<li><span>${Math.max(0,n-a.incluidos)} persona(s) adicional(es)</span><span>${dinero(p.extra)}</span></li>`:''}<li><span>Descuento por activación en línea</span><span style="color:var(--wa);font-weight:700">−${dinero(p.ahorro)}</span></li></ul>
    <div class="precio-gr" style="margin:.5rem 0">${dinero(p.enLinea)}</div><div class="pequeno suave">Un solo pago por 12 meses. Las consultas se pagan aparte, solo cuando las use.</div>
    <label style="display:flex;gap:.5rem;align-items:flex-start;font-weight:500;margin-top:1rem"><input type="checkbox" id="aAcep"> <span>Acepto los <a href="#/terminos" target="_blank">términos y condiciones</a> y autorizo de forma expresa el <a href="#/terminos" target="_blank">tratamiento de los datos personales</a> míos y de los integrantes de mi familia, incluidos los datos de salud y de menores de edad, para los fines allí descritos. Declaro que soy mayor de edad.</span></label>
    <button class="btn btn-a" style="width:100%;margin-top:.8rem" onclick="activar()">Pagar y activar el carnet</button><p class="legal" style="margin-top:.7rem">${LEGAL}</p></section></div></div>`;
}
const camposAct=['aTit','aCor','aTel','aCiu'];
const leerCampos=()=>camposAct.reduce((o,id)=>{const e=document.getElementById(id);if(e)o[id]=e.value;return o},{});
const ponerCampos=d=>Object.entries(d).forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.value=v});
async function agregarBenef(){const nombre=document.getElementById('bNom').value.trim(),doc=document.getElementById('bDoc').value.trim(),parentesco=document.getElementById('bPar').value;
  if(!nombre||!doc){toast('Escriba el nombre y el documento.');return} if(ui.nuevos.some(m=>m.doc===doc)){toast('Esa persona ya está en el carnet.');return}
  const d=leerCampos();ui.nuevos.push({nombre,doc,parentesco});await render();ponerCampos(d);
  if(ui.nuevos.length===CFG.ajustes.incluidos+1)toast(`Desde la persona ${CFG.ajustes.incluidos+1} se suma ${dinero(CFG.ajustes.adicional)} por cada una.`)}
async function quitarBenef(i){const d=leerCampos();ui.nuevos.splice(i,1);await render();ponerCampos(d)}
async function activar(){const d=leerCampos();if(!document.getElementById('aAcep').checked){toast('Acepte los términos y el tratamiento de datos para continuar.');return}
  try{const o=await api('/api/familias/activar',{method:'POST',body:{titular:d.aTit,correo:d.aCor,telefono:d.aTel,ciudad:d.aCiu,miembros:ui.nuevos,acepto:true}});iniciarPago(o)}catch(e){toast(e.message)}}

/* ---------- Mi familia ---------- */
async function vFamilia(){
  if(!tok.get('familia')) return `<section class="hero"><div><h1>Mi familia</h1><p>Sus carnets, sus consultas y sus pagos en un solo lugar.</p></div>${ILUSTRACION}</section><div class="rejilla" style="align-items:start">${vLogin('familia','Ingresar')}<section class="panel"><h2>¿Aún no tiene carnet?</h2><p>Afilie hasta ${CFG.ajustes.incluidos} personas de su núcleo familiar por ${dinero(precioPlan(1).enLinea)} al año y acceda a especialistas disponibles ahora mismo.</p><a class="btn btn-a" href="#/activar">Activar el carnet de mi familia</a></section></div>${ventajasFamilia()}`;
  let y; try{y=await api('/api/familia/yo',{auth:'familia'})}catch(e){if(!tok.get('familia'))return vFamilia();throw e}
  ui.fam=y; const f=y.familia,st=y.estado;
  const ayuda=`<a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/${WA_SOPORTE}?text=${encodeURIComponent('Hola, necesito ayuda con el carnet FamilIA Salud de '+f.titular)}">Soporte por WhatsApp</a>`;
  if(st.k==='cerrada') return `<section class="aviso"><h3>El carnet de su familia está suspendido</h3><p>Venció el ${fmt(f.vence)}. Renueve para volver a ser atendido. Al aprobarse el pago, se activa de inmediato.</p><div class="fila"><button class="btn btn-a" onclick="renovarFamilia()">Renovar por ${dinero(y.renovacion)}</button>${ayuda}</div></section><button class="btn btn-l" onclick="salir('familia')">Salir</button>`;
  let h='';
  if(st.k==='aviso') h+=`<section class="aviso fila" style="justify-content:space-between"><div style="flex:1;min-width:220px"><h3>Su carnet venció el ${fmt(f.vence)}</h3><p class="pequeno">Si no renueva, el acceso se suspende en ${st.dias} día${st.dias===1?'':'s'}.</p><div class="fila"><button class="btn btn-a" onclick="renovarFamilia()">Renovar por ${dinero(y.renovacion)}</button>${ayuda}</div></div><div style="text-align:center"><div class="cuenta">${st.dias}</div><div class="pequeno">días</div></div></section>`;
  else if(st.porVencer!=null) h+=`<section class="recordatorio fila" style="justify-content:space-between"><span>${st.porVencer===0?'Su carnet vence HOY.':`Su carnet vence en ${st.porVencer} día${st.porVencer===1?'':'s'}.`} Renueve sin perder días.</span><button class="btn btn-a btn-chico" onclick="renovarFamilia()">Renovar</button></section>`;
  h+=`${barraCuenta('familia',f.titular,'Mi familia')}<p class="suave pequeno" style="margin-top:-.6rem">${y.miembros.length} persona${y.miembros.length>1?'s':''} · ${esc(f.ciudad)} · vigente hasta ${fmt(f.vence)}</p>
  <section class="panel" style="border-left:5px solid var(--wa)"><div class="fila" style="justify-content:space-between"><div><h3 style="margin:0">${(CFG.especialidades||{})[f.ciudad]||0} especialidades y servicios disponibles para usted en ${esc(f.ciudad)}</h3><span class="pequeno suave">${y.ahora.slice(0,6).map(esc).join(' · ')}</span></div><a class="btn btn-a" href="#/ciudad/${slug(f.ciudad)}">Ser atendido ahora</a></div></section>
  <div class="sub">${[['carnets','Carnets'],['citas','Mis consultas'],['pagos','Mis pagos y saldo'],['grupo','Grupo familiar']].map(([k,t])=>`<button aria-pressed="${ui.vistaFam===k}" onclick="ui.vistaFam='${k}';render()">${t}</button>`).join('')}<button onclick="ir('#/ciudad/${slug(f.ciudad)}')">Buscar especialista</button></div>`;
  if(y.familia.saldo>0&&ui.vistaFam!=='pagos') h+=`<p class="recordatorio pequeno">Tiene <strong>${dinero(y.familia.saldo)}</strong> de saldo a favor para su próxima consulta. <a href="javascript:void 0" onclick="ui.vistaFam='pagos';render()">Ver o pedir devolución</a></p>`;
  if(ui.vistaFam==='grupo') h+=vGrupo(y);
  else if(ui.vistaFam==='pagos') h+=vSaldo(y)+`<section class="panel"><h3>Mis pagos</h3><p class="pequeno suave">Afiliación, renovaciones y consultas. Descargue el recibo de cada pago.</p>${listaPagos(y.pagos,false)}<div class="fila" style="margin-top:.8rem"><button class="btn btn-a" onclick="renovarFamilia()">Renovar la afiliación anual</button></div></section>`;
  else if(ui.vistaFam==='citas') h+=vMisCitas(y); else h+=`<div class="carnets">${y.miembros.map((m,i)=>carnetHTML(f,m,i,st)).join('')}</div><div class="fila" style="margin-top:1rem"><button class="btn btn-p" onclick="imprimirCarnets()">Descargar carnets en PDF</button></div>`;
  return h;
}
const numCarnet=(f,i)=>`FS-${f.id.slice(-4).toUpperCase()}-${pad(i+1)}`;
function patron(t){let h=2166136261;for(const c of t){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}let s='<svg viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="9" height="9" fill="#fff"/>';for(let y=0;y<9;y++)for(let x=0;x<5;x++){h^=h<<13;h^=h>>>17;h^=h<<5;if((h>>>0)%2===0){s+=`<rect x="${x}" y="${y}" width="1" height="1" fill="#1E3A4C"/>`;if(x<4)s+=`<rect x="${8-x}" y="${y}" width="1" height="1" fill="#1E3A4C"/>`}}return s+'<rect x="3.5" y="3.5" width="2" height="2" fill="#E0A21A"/></svg>'}
function carnetHTML(f,m,i,st){const n=numCarnet(f,i);return `<article class="carnet ${st.k==='cerrada'?'suspendido':''}"><div class="cab"><span>Famil<b>IA</b> Salud</span><span style="font-family:var(--cuerpo);font-size:.75rem;font-weight:600">${esc(m.parentesco)}</span></div><div class="nom">${esc(m.nombre)}</div><div class="dat"><div>Carnet<strong>${n}</strong>Documento ${esc(m.doc)}<br>Vigente hasta ${fmt(f.vence)}</div><div class="codigo" data-qr="${esc(m.qr||'')}">${patron(n)}</div></div></article>`}
let promesaQR=null;
function cargarQR(){if(window.QRCode)return Promise.resolve();if(promesaQR)return promesaQR;promesaQR=new Promise((ok,mal)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';s.onload=ok;s.onerror=()=>{promesaQR=null;mal(new Error('qr'))};setTimeout(()=>{if(!window.QRCode){promesaQR=null;mal(new Error('qr'))}},4000);document.head.appendChild(s)});return promesaQR}
async function pintarQR(){try{await cargarQR();document.querySelectorAll('[data-qr]').forEach(el=>{const u=el.dataset.qr;if(!u||el.dataset.hecho)return;el.innerHTML='';new QRCode(el,{text:u,width:84,height:84,colorDark:'#1C2B39',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M});el.dataset.hecho='1'})}catch(e){}}
async function qrDataURL(u){await cargarQR();const d=document.createElement('div');new QRCode(d,{text:u,width:160,height:160,correctLevel:QRCode.CorrectLevel.M});const c=d.querySelector('canvas');return c?c.toDataURL('image/png'):null}
async function vVerificar(carnet,k){
  let r;try{r=await api(`/api/verificar/${encodeURIComponent(carnet)}/${encodeURIComponent(k)}`)}catch(e){r={valido:false}}
  if(!r.valido) return `<section class="aviso"><h2>Carnet no válido</h2><p>Este código no corresponde a un carnet de FamilIA Salud. Pida al paciente su carnet desde la app.</p></section>`;
  return `<section class="panel" style="max-width:520px;border-left:6px solid ${r.vigente?'var(--wa)':'var(--rojo)'}"><h2 style="margin-top:0">${r.vigente?'✓ Carnet vigente':'✗ Carnet suspendido'}</h2><p>Carnet <strong>${esc(carnet)}</strong><br>Afiliado: <strong>${esc(r.nombre)}</strong> · documento ${esc(r.doc)}<br>Vigente hasta ${fmt(r.vence)}</p><p class="pequeno suave">Compare el documento con la cédula del paciente antes de atenderlo.</p></section>`;
}
/* ---------- PDF con jsPDF (archivo real, no la impresora) ---------- */
function cargarPDF(){return new Promise((ok,mal)=>{if(window.jspdf)return ok(window.jspdf.jsPDF);const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';s.onload=()=>ok(window.jspdf.jsPDF);s.onerror=()=>mal(new Error('No se pudo preparar el PDF. Revise su conexión.'));document.head.appendChild(s)})}
const lat=x=>String(x??'').normalize('NFC').replace(/[^\x00-\xFF]/g,c=>({'—':'-','–':'-','“':'"','”':'"','’':"'",'·':'·','•':'-','−':'-'}[c]||''));
function piePDF(doc){const n=doc.getNumberOfPages();for(let i=1;i<=n;i++){doc.setPage(i);doc.setFontSize(8);doc.setTextColor(93,107,120);doc.text(lat('FamilIA Salud · SkyNet Genesis · contacto@skynetgenesis.com · WhatsApp 304 437 5758'),105,290,{align:'center'});doc.text('Página '+i+' de '+n,200,290,{align:'right'})}}
async function pdfCarnets(){
  try{const J=await cargarPDF(),y=ui.fam,doc=new J({unit:'mm',format:'a4'});doc.setFontSize(16);doc.setTextColor(11,79,138);doc.text(lat('Carnets FamilIA Salud · '+y.familia.titular),15,18);
    for(const [i,m] of y.miembros.entries()){const col=i%2,fil=Math.floor(i/2)%5,x=15+col*95,yy=28+fil*56;if(i>0&&i%10===0){doc.addPage()}
      doc.setFillColor(11,79,138);doc.roundedRect(x,yy,85.6,54,4,4,'F');doc.setFillColor(20,163,139);doc.rect(x,yy+50,85.6,4,'F');
      doc.setTextColor(255,255,255);doc.setFontSize(11);doc.text('FamilIA Salud',x+5,yy+8);doc.setFontSize(8);doc.text(lat(m.parentesco),x+80,yy+8,{align:'right'});
      try{const im=await qrDataURL(m.qr);if(im){doc.setFillColor(255,255,255);doc.rect(x+60,yy+20,22,22,'F');doc.addImage(im,'PNG',x+61,yy+21,20,20)}}catch(e){}
      doc.setFontSize(15);doc.text(lat(m.nombre).slice(0,22),x+5,yy+24);doc.setFontSize(8);doc.text('Carnet '+numCarnet(y.familia,i),x+5,yy+34);doc.text(lat('Documento '+m.doc),x+5,yy+39);doc.text(lat('Vigente hasta '+fmt(y.familia.vence)),x+5,yy+44)}
    doc.setFontSize(8);doc.setTextColor(93,107,120);doc.text(doc.splitTextToSize(lat(LEGAL),180),15,270);piePDF(doc);doc.save('carnets-familiasalud.pdf');toast('PDF de los carnets descargado.')}catch(e){toast(e.message)}
}
async function pdfRecibo(t){
  try{const J=await cargarPDF(),doc=new J({unit:'mm',format:'a4'});doc.setFontSize(18);doc.setTextColor(11,79,138);doc.text('Recibo de pago',15,22);doc.setFontSize(11);doc.setTextColor(28,43,57);
    const f=[['Orden',t.orden],['Pagador',t.nombre||''],['Concepto',t.concepto],['Valor',dinero(t.monto)],['Medio de pago',t.metodo],['Referencia',t.referencia||''],['Fecha',fmt(t.fecha)]].filter(x=>x[1]);
    f.forEach(([k,v],i)=>{doc.setFont(undefined,'bold');doc.text(lat(k),15,38+i*9);doc.setFont(undefined,'normal');doc.text(lat(v),60,38+i*9)});
    piePDF(doc);doc.save('recibo-'+t.orden+'.pdf');toast('Recibo descargado en PDF.')}catch(e){toast(e.message)}
}
function imprimirCarnets(){pdfCarnets()}
function vSaldo(y){
  const f=y.familia;
  return `<section class="panel"><h3>Saldo a favor: ${dinero(f.saldo)}</h3><p class="pequeno suave">Cuando una consulta se cancela con tiempo, el profesional la cancela o usted no fue atendido, el valor queda aquí. Se usa solo al pedir otra consulta, o puede pedir que se lo transfiramos.</p>
    ${f.saldo>0?`<label for="dCta">Datos para la transferencia (banco, tipo y número de cuenta, nombre y documento del titular)</label><textarea id="dCta" rows="2" maxlength="200"></textarea><button class="btn btn-p" style="margin-top:.5rem" onclick="pedirDevolucion()">Pedir devolución de ${dinero(f.saldo)}</button>`:''}
    ${(y.devoluciones||[]).length?`<h3 style="margin-top:1rem">Devoluciones</h3><ul class="lista">${y.devoluciones.map(d=>`<li><span>${fmt(d.fecha)} · ${dinero(d.monto)}</span><span class="etq ${d.estado==='transferida'?'etq-ok':'etq-av'}">${d.estado==='transferida'?'Transferida':'En proceso'}</span></li>`).join('')}</ul>`:''}
    ${(y.movimientos||[]).length?`<h3 style="margin-top:1rem">Movimientos del saldo</h3><ul class="lista">${y.movimientos.map(m=>`<li><span>${fmt(m.fecha)} · ${esc(m.concepto)}</span><strong style="color:${m.monto>0?'var(--wa)':'inherit'}">${m.monto>0?'+':''}${dinero(m.monto)}</strong></li>`).join('')}</ul>`:''}</section>`;
}
function pedirDevolucion(){const c=document.getElementById('dCta').value.trim();if(!confirm('¿Pedir la devolución de todo su saldo a esa cuenta?'))return;accion(()=>api('/api/familia/devolucion',{method:'POST',auth:'familia',body:{cuenta:c}}),'Devolución pedida. Contabilidad la transfiere en los próximos días.')}
function vGrupo(y){
  const max=CFG.ajustes.incluidos+CFG.ajustes.maxAdicionales, quedan=y.cambiosMax-y.cambiosUsados;
  return `<section class="panel"><h3>Grupo familiar</h3><p class="pequeno suave">Hasta ${max} personas. Puede hacer ${y.cambiosMax} cambios al año (agregar o retirar); le quedan <strong>${quedan}</strong>. Cada persona puede estar en un solo carnet.</p>
    <ul class="lista">${y.miembros.map((m,i)=>`<li><div><strong>${esc(m.nombre)}</strong> · ${esc(m.parentesco)}<br><span class="pequeno suave">Documento ${esc(m.doc)} · carnet ${esc(m.carnet)}</span></div>${i>0&&quedan>0?`<button class="btn btn-l btn-chico" onclick="quitarMiembro(${i})">Retirar</button>`:''}</li>`).join('')}</ul>
    ${y.miembros.length<max&&quedan>0?`<h3 style="margin-top:1rem">Agregar una persona</h3><div class="r2"><div><label for="gNom">Nombre completo</label><input id="gNom"></div><div><label for="gDoc">Documento</label><input id="gDoc"></div><div><label for="gPar">Parentesco</label><select id="gPar">${['Esposo(a) o pareja','Hijo(a)','Padre o madre','Hermano(a)','Abuelo(a)','Nieto(a)','Otro familiar'].map(x=>`<option>${x}</option>`).join('')}</select></div></div><button class="btn btn-a" style="margin-top:.6rem" onclick="agregarMiembro()">Agregar al carnet</button>`:''}</section>`;
}
function agregarMiembro(){const v=id=>document.getElementById(id).value.trim();accion(()=>api('/api/familia/miembro',{method:'POST',auth:'familia',body:{accion:'agregar',nombre:v('gNom'),doc:v('gDoc'),parentesco:v('gPar')}}),'Persona agregada. Ya tiene su carnet.')}
function quitarMiembro(i){if(!confirm('¿Retirar a esta persona del carnet? Cuenta como uno de los cambios del año.'))return;accion(()=>api('/api/familia/miembro',{method:'POST',auth:'familia',body:{accion:'quitar',i}}),'Persona retirada del carnet.')}
async function reprogramar(id){
  const c=ui.fam.citas.find(x=>x.id===id);
  try{const d=await api('/api/publico/ciudad/'+encodeURIComponent(c.ciudad),{auth:'familia'});const p=d.prestadores.find(x=>x.id===c.prestador_id);
    const cs=p?cupos(p,12):[];
    modal(`<h3>Reprogramar la consulta</h3><p>${esc(c.miembro)} · ${esc(c.servicio)}<br><span class="pequeno suave">Ahora: ${fmt(c.fecha)} ${hora12(c.hora)}. Puede reprogramar ${2-(c.reprog||0)} vez(ces) más.</span></p>${cs.length?`<div class="cupos">${cs.map(x=>`<button onclick="confirmarReprog('${id}','${x.fecha}','${x.hora}')">${etiquetaTurno(x)}</button>`).join('')}</div>`:'<p class="suave">No hay turnos libres esta semana. Puede cancelar y el valor queda como saldo a favor.</p>'}<button class="btn btn-l" style="margin-top:.8rem" onclick="cerrarModal()">← Volver</button>`)}catch(e){toast(e.message)}
}
function confirmarReprog(id,fecha,hora){accion(()=>api('/api/familia/reprogramar',{method:'POST',auth:'familia',body:{cita:id,fecha,hora}}).then(r=>{cerrarModal();return r}),'Consulta reprogramada. Avisamos al profesional.')}
function noAtendido(id){modal(`<h3>No me atendieron</h3><p class="pequeno">Si el profesional no lo atendió, el valor de la consulta vuelve a su saldo a favor y revisamos el caso.</p><label for="naMot">¿Qué pasó?</label><textarea id="naMot" rows="3" maxlength="300"></textarea><div class="fila" style="margin-top:.6rem"><button class="btn btn-r" onclick="enviarNoAtendido('${id}')">Reportar</button><button class="btn btn-l" onclick="cerrarModal()">← Volver</button></div>`)}
function enviarNoAtendido(id){accion(()=>api('/api/familia/no-atendido',{method:'POST',auth:'familia',body:{cita:id,motivo:document.getElementById('naMot').value}}).then(r=>{cerrarModal();return r}),'Listo. El valor quedó en su saldo a favor.')}
function pedirDeNuevo(i){const c=ui.fam.citas[i];ui.servicio=c.servicio;ui.ciudadServ=c.ciudad;ui.resaltar=c.prestador_id;ir('#/ciudad/'+slug(c.ciudad))}
function vMisCitas(y){
  if(!y.citas.length) return `<div class="panel"><p>Aún no tiene consultas.</p><a class="btn btn-p" href="#/ciudad/${slug(y.familia.ciudad)}">Buscar especialista</a></div>`;
  return `<div class="panel"><ul class="lista">${y.citas.map((c,i)=>{
    const despues=c.estado==='confirmada'&&c.minutos!=null&&-c.minutos>=(c.inmediata?180:60), antes=c.estado==='confirmada'&&!c.inmediata&&c.minutos>=120;
    const nuevo=`<button class="btn btn-l btn-chico" onclick="pedirDeNuevo(${i})">Pedir de nuevo</button>`;
    const est=c.estado==='confirmada'?`<div style="text-align:right"><div class="pequeno">Código de atención</div><div class="cod-at" style="font-size:1.4rem">${esc(c.codigo)}</div><div class="fila" style="justify-content:flex-end">${antes?`<button class="btn btn-l btn-chico" onclick="reprogramar('${c.id}')">Reprogramar</button><button class="btn btn-l btn-chico" onclick="cancelarCita('${c.id}')">Cancelar</button>`:''}${despues?`<button class="btn btn-r btn-chico" onclick="noAtendido('${c.id}')">No me atendieron</button>`:''}</div></div>`
      :c.estado==='atendida'?`<div class="fila" style="justify-content:flex-end">${c.calificada?'<span class="etq etq-ok">Atendida · calificada</span>':`<span class="etq etq-ok">Atendida</span><button class="btn btn-a btn-chico" onclick="calificar('${c.id}')">Calificar atención</button>`}${nuevo}</div>`
      :c.estado==='no_asistio'?'<span class="etq etq-av">No asistió · parte del valor volvió a su saldo</span>'
      :c.estado==='no_atendida'?'<span class="etq etq-no">No atendida · valor devuelto a su saldo</span>'
      :c.estado==='cancelada_medico'?'<span class="etq etq-no">Cancelada por el profesional · valor en su saldo</span>'
      :'<span class="etq etq-no">Cancelada · valor en su saldo a favor</span>';
    return `<li><div><strong>${esc(c.miembro)}</strong> · ${esc(c.servicio)}${c.inmediata?' <span class="etq etq-ok">Inmediata</span>':''}<br><span class="pequeno">${esc(c.nombre)} · ${fmt(c.fecha)} ${hora12(c.hora)}</span><br><span class="pequeno suave">${esc(c.sede)}${c.monto?' · pagado '+dinero(c.monto):''}</span><br><button class="btn btn-l btn-chico" style="margin-top:.3rem" onclick="imprimirRecibo('${c.id}')">Comprobante</button></div>${est}</li>`}).join('')}</ul></div>`;
}
function cancelarCita(id){if(confirm('¿Cancelar esta consulta? El valor queda como saldo a favor para otra consulta, o puede pedir que se lo transfiramos.'))accion(()=>api('/api/familia/cancelar',{method:'POST',auth:'familia',body:{cita:id}}),'Consulta cancelada. El valor quedó en su saldo a favor.')}
function calificar(id){modal(`<h3>¿Cómo le fue en la consulta?</h3><p class="pequeno suave">Solo los pacientes atendidos pueden opinar. Su nombre no se publica.</p><label for="qEst">Calificación</label><select id="qEst">${[5,4,3,2,1].map(n=>`<option value="${n}">${'★'.repeat(n)} (${n})</option>`).join('')}</select><label for="qTxt">Comentario (opcional)</label><textarea id="qTxt" rows="3" maxlength="300"></textarea><div class="fila" style="margin-top:.8rem"><button class="btn btn-p" onclick="guardarResena('${id}')">Publicar opinión</button><button class="btn btn-l" onclick="cerrarModal()">Volver</button></div>`)}
function guardarResena(id){const b={cita:id,estrellas:Number(document.getElementById('qEst').value),texto:document.getElementById('qTxt').value};cerrarModal();accion(()=>api('/api/familia/resena',{method:'POST',auth:'familia',body:b}),'Gracias. Su opinión ayuda a otras familias.')}
function imprimirRecibo(id){const c=ui.fam.citas.find(x=>x.id===id);return pdfRecibo({orden:c.carnet+'-'+c.id.slice(-5).toUpperCase(),nombre:c.miembro,concepto:'Consulta de '+c.servicio+' con '+c.nombre,monto:c.monto,metodo:'Pago en línea',fecha:c.fecha_pago||c.fecha});document.getElementById('imprimir').innerHTML=`<h2>Comprobante de pago · FamilIA Salud</h2><p>Paciente: ${esc(c.miembro)} (${esc(c.carnet)})<br>Servicio: ${esc(c.servicio)} · ${esc(c.nombre)}<br>Fecha: ${fmt(c.fecha)} ${hora12(c.hora)}<br>Valor pagado: ${dinero(c.monto)}${c.fecha_pago?' · Fecha de pago: '+fmt(c.fecha_pago):''}</p><p style="font-size:11px">El servicio lo presta y factura el profesional. ${SKYNET_REF}</p>`;window.print()}
const ESTADO_P={aprobado:['etq-ok','Pagado'],retenido:['etq-ok','Pagado · reservado'],liberado:['etq-ok','Pagado'],revisar:['etq-av','En revisión'],rechazado:['etq-no','Rechazado'],por_reembolsar:['etq-av','Reembolso en proceso'],reembolsado:['etq-no','Reembolsado']};
function listaPagos(ps,conPagador){
  if(!ps||!ps.length) return '<p class="suave">Aún no hay pagos.</p>';
  ui.pagosVista=ps;
  return `<ul class="lista">${ps.map((t,i)=>{const e=ESTADO_P[t.estado]||['etq-av',t.estado];return `<li><div style="flex:1;min-width:200px"><strong>${esc(t.concepto)}</strong><br><span class="pequeno suave">${fmt(t.fecha)} · ${esc(t.metodo)}${t.referencia?' · ref. '+esc(t.referencia):''}${conPagador&&t.nombre?' · '+esc(t.nombre):''}</span></div><div class="fila"><strong>${dinero(t.monto)}</strong><span class="etq ${e[0]}">${e[1]}</span>${['aprobado','retenido','liberado'].includes(t.estado)?`<button class="btn btn-l btn-chico" onclick="reciboPago(${i})">Recibo</button>`:''}</div></li>`}).join('')}</ul>`;
}
function reciboPago(i){pdfRecibo(ui.pagosVista[i])}
async function renovarFamilia(){try{iniciarPago(await api('/api/familia/renovar',{method:'POST',auth:'familia'}))}catch(e){toast(e.message)}}

/* ---------- Especialistas: invitación y registro ---------- */
async function vEspecialistas(){
  const a=CFG.ajustes;
  const inv=ui.invitacion;
  return `<section class="hero"><div><h1>Pacientes que necesitan atención hoy</h1><p>Familias que no pueden esperar meses a su EPS y pagan la consulta antes de llegar. Usted fija sus precios y avisa cuándo está disponible.</p>
    <div class="fila"><button class="btn btn-a" onclick="document.getElementById('acceso')?document.getElementById('acceso').scrollIntoView({behavior:'smooth'}):0">Solicitar acceso</button><a class="btn btn-l" href="#/medico">Ya tengo cuenta</a></div></div>${ILUSTRACION}</section>
  <div class="ventajas" style="margin-bottom:1rem">
    <div><h3>Pago asegurado</h3><p class="pequeno">El paciente paga al reservar. Al registrar su código de atención, el dinero pasa a su saldo.</p></div>
    <div><h3>Botón "Disponible ahora"</h3><p class="pequeno">Actívelo cuando tenga un espacio libre y reciba pacientes que necesitan atención inmediata.</p></div>
    <div><h3>Dos precios</h3><p class="pequeno">Usted escribe su precio real y su precio con descuento para afiliados. La aplicación cobra ${a.comision}% del precio con descuento por sus servicios.</p></div>
    <div><h3>Cuota anual</h3><p class="pequeno">Especialista Fundador: primer año ${(a.cuotaFundador===0?'gratis':dinero(a.cuotaFundador))} para los primeros ${a.cupoFundadores} de cada ciudad (precio normal ${dinero(a.cuotaMedico)}).</p></div>
    <div><h3>Red verificada</h3><p class="pequeno">Una persona de nuestro equipo confirma en el ReTHUS su especialidad. Por eso las familias confían en la red.</p></div></div>
  <section class="recordatorio" id="ofertaFund"></section>
  ${inv?'':`<div class="rejilla" id="acceso" style="align-items:start">
    <section class="panel"><h2>1. Solicite acceso</h2><p class="suave">La red es solo por invitación. Revisamos su solicitud y le enviamos un código de acceso a su correo.</p>
      <label for="sNom">Nombre completo</label><input id="sNom">
      <label for="sEsp">Especialidad</label><select id="sEsp"><option value="">Elija…</option>${CFG.catalogo.map(g=>`<optgroup label="${esc(g.g)}">${g.e.map(x=>`<option>${esc(x)}</option>`).join('')}</optgroup>`).join('')}</select>
      <div class="r2"><div><label for="sCiu">Ciudad</label><select id="sCiu">${CFG.ciudades.map(c=>`<option>${c}</option>`).join('')}</select></div><div><label for="sRet">Número de ReTHUS</label><input id="sRet"></div></div>
      <div class="r2"><div><label for="sCor">Correo</label><input id="sCor" type="email"></div><div><label for="sCel">Celular (WhatsApp)</label><input id="sCel" inputmode="tel"></div></div>
      <button class="btn btn-a" style="margin-top:.8rem" onclick="solicitarAcceso()">Enviar solicitud</button></section>
    <section class="panel"><h2>2. ¿Ya tiene su código?</h2><p class="suave">Escriba el correo con el que hizo la solicitud y el código que le enviamos.</p>
      <label for="cCor">Correo</label><input id="cCor" type="email">
      <label for="cCod">Código de invitación</label><input id="cCod" style="text-transform:uppercase">
      <button class="btn btn-p" style="margin-top:.8rem" onclick="usarCodigo()">Continuar con mi registro</button>
      ${CFG.demo?'<p class="pequeno suave" style="margin-top:.6rem">Demostración: nuevo@skynetgenesis.com con el código FS2026.</p>':''}</section></div>`}
  ${inv?`<section class="panel" id="registro"><h2>Registro profesional</h2><p class="recordatorio pequeno">Invitación válida para <strong>${esc(inv.nombre)}</strong> · ${esc(inv.servicio)} · ${esc(inv.ciudad)}. <button class="btn btn-l btn-chico" onclick="ui.invitacion=null;render()">Salir</button></p>
    <p>Lo que pedimos es su <strong>registro profesional (ReTHUS)</strong> con la copia del mismo y una foto suya sosteniendo su cédula. Una persona de nuestro equipo confirma en el ReTHUS que su nombre, su cédula y su especialidad coinciden, y su servicio se habilita apenas se confirme.</p>
    <div class="r2">
      <div><label for="rRet">Número de registro profesional (ReTHUS)</label><input id="rRet" value="${esc(inv.rethus)}" readonly></div>
      <div><label for="rNom">Nombre completo</label><input id="rNom" value="${esc(inv.nombre)}" readonly></div>
      <div><label for="rCed">Cédula</label><input id="rCed" inputmode="numeric"></div>
      <div><label for="rEsp">Especialidad</label><input id="rEsp" value="${esc(inv.servicio)}" readonly></div>
      <div><label for="rCiu">Ciudad</label><input id="rCiu" value="${esc(inv.ciudad)}" readonly></div>
      <div><label for="rSede">Dirección del consultorio</label><input id="rSede"></div>
      <div><label for="rCor">Correo</label><input id="rCor" type="email" value="${esc(inv.correo)}" readonly></div>
      <div><label for="rCel">Celular (WhatsApp)</label><input id="rCel" inputmode="tel" value="${esc(inv.celular||'')}"></div></div>
    <label for="rDoc">Copia del registro profesional (ReTHUS): foto o PDF, máx. 1,5 MB</label><input id="rDoc" type="file" accept="image/*,application/pdf">
    <label for="rSelf">Foto suya sosteniendo su cédula</label><input id="rSelf" type="file" accept="image/*">
    <label for="rReps">Código de prestador en el REPS (si atiende como profesional independiente)</label><input id="rReps" placeholder="Opcional">
    <label for="rMsg">Mensaje para las familias (máx. 200 caracteres)</label><textarea id="rMsg" rows="2" maxlength="200" placeholder="Ej. Atiendo a sus hijos con paciencia y sin largas esperas."></textarea>
    <div class="r2"><div><label for="rPar">Precio real de su consulta</label><input id="rPar" type="number" min="0"></div>
      <div><label for="rTar">Precio con descuento para afiliados (terminado en 00)</label><input id="rTar" type="number" min="0" step="100" oninput="document.getElementById('rNeto').textContent=this.value>0?'Usted recibe '+dinero(netoMedico(Number(this.value)))+' por consulta.':''"></div>
      <div><label for="rHor">Horas de atención</label><input id="rHor" value="08:00, 09:00, 10:00, 15:00, 16:00"></div></div>
    <p class="pequeno" id="rNeto"></p><p class="pequeno suave">El ${a.comision}% del precio con descuento corresponde al cobro por servicios de la aplicación (agenda, cobro, pago seguro y pacientes nuevos).</p>
    <label>Días de atención</label><div class="fila">${[1,2,3,4,5,6,0].map(d=>`<label style="display:flex;gap:.3rem;align-items:center;font-weight:500;margin:0"><input type="checkbox" class="rDia" value="${d}" ${d>=1&&d<=5?'checked':''}>${DIAS[d]}</label>`).join('')}</div>
    <p class="pequeno suave">La cuenta debe estar a nombre suyo. Contabilidad confirma que el titular coincide con su cédula antes del primer pago.</p>
    <div class="r2"><div><label for="rBan">Banco</label><input id="rBan"></div><div><label for="rCta">Tipo y número de cuenta</label><input id="rCta"></div></div>
    <p class="pequeno suave">El público solo ve su especialidad y si está disponible. Las familias afiliadas ven además su mensaje, sus precios y sus turnos. Su nombre y su dirección los ve únicamente el paciente que ya pagó. Sus datos personales y bancarios solo los ven la administración superior y contabilidad.</p>
    <label style="display:flex;gap:.5rem;align-items:flex-start;font-weight:500;margin-top:1rem"><input type="checkbox" id="rAcep"> <span id="txtAcep"></span></label>
    <button class="btn btn-a" style="margin-top:1rem" id="btnRegistro" onclick="registrarEspecialista()">Enviar registro</button></section>`:''}`;
}
async function solicitarAcceso(){
  const v=id=>document.getElementById(id).value.trim();
  try{await api('/api/medicos/solicitud',{method:'POST',body:{nombre:v('sNom'),servicio:v('sEsp'),ciudad:v('sCiu'),rethus:v('sRet'),correo:v('sCor'),celular:v('sCel')}});
    modal(`<h3>Solicitud recibida</h3><p>Gracias. Revisaremos sus datos y le enviaremos un código de acceso a su correo.</p><button class="btn btn-p" onclick="cerrarModal();render()">Entendido</button>`)}catch(e){toast(e.message)}
}
async function usarCodigo(){
  const correo=document.getElementById('cCor').value.trim(), codigo=document.getElementById('cCod').value.trim().toUpperCase();
  try{const d=await api('/api/medicos/invitacion',{method:'POST',body:{correo,codigo}});ui.invitacion={...d,codigo};await render();const e=document.getElementById('registro');if(e)e.scrollIntoView()}catch(e){toast(e.message)}
}
function ofertaCiudad(){
  const c=(document.getElementById('rCiu')||{}).value||(ui.invitacion||{}).ciudad; const of=document.getElementById('ofertaFund'); if(!c){if(of)of.style.display='none';return} if(of)of.style.display=''; const a=CFG.ajustes, q=Math.max(0,a.cupoFundadores-(CFG.fundadores[c]||0)), cuota=q>0?a.cuotaFundador:a.cuotaMedico;
  document.getElementById('ofertaFund').innerHTML=q>0?`<strong>Oferta Especialista Fundador en ${c}:</strong> los primeros ${a.cupoFundadores} especialistas de cada ciudad ${a.cuotaFundador===0?'usan la plataforma <strong>el primer año gratis</strong> (después, '+dinero(a.cuotaMedico)+' al año)':'pagan '+dinero(a.cuotaFundador)+' el primer año en lugar de '+dinero(a.cuotaMedico)}. En ${c} quedan <strong>${q}</strong> cupos.`:`Los cupos de Especialista Fundador en ${c} ya se agotaron. La cuota anual es ${dinero(a.cuotaMedico)}.`;
  const bt=document.getElementById('btnRegistro'), ta=document.getElementById('txtAcep'); if(!bt||!ta) return;
  bt.textContent=cuota===0?'Enviar registro (primer año gratis)':`Pagar ${dinero(cuota)} y enviar registro`;
  ta.textContent=`${cuota===0?'Entiendo que mi primer año es gratis y que desde el segundo año la cuota es de '+dinero(a.cuotaMedico):'Acepto pagar la cuota del primer año de '+dinero(cuota)+' (desde el segundo año, '+dinero(a.cuotaMedico)+')'} y que FamilIA Salud recaude mis consultas y me transfiera el ${100-a.comision}% al registrar la atención. Acepto los términos y el tratamiento de mis datos personales.`;
}
const leerArchivo=f=>new Promise((ok,mal)=>{const l=new FileReader();l.onload=()=>ok(l.result);l.onerror=()=>mal(new Error('No se pudo leer el archivo.'));l.readAsDataURL(f)});
async function registrarEspecialista(){
  if(!ui.invitacion){toast('Necesita un código de invitación para registrarse.');return}
  const v=id=>document.getElementById(id).value.trim();
  const doc=document.getElementById('rDoc').files[0], self=document.getElementById('rSelf').files[0];
  if(!document.getElementById('rAcep').checked){toast('Debe aceptar las condiciones.');return}
  if(!doc||!self){toast('Adjunte la copia de su ReTHUS y la foto con su cédula.');return}
  if(doc.size>1.5*1024*1024||self.size>1.5*1024*1024){toast('Cada archivo debe pesar menos de 1,5 MB. Tome fotos más livianas.');return}
  try{
    const [docData,selfData]=await Promise.all([leerArchivo(doc),leerArchivo(self)]);
    const o=await api('/api/medicos/registro',{method:'POST',body:{rethus:v('rRet'),nombre:v('rNom'),cedula:v('rCed'),servicio:v('rEsp'),ciudad:v('rCiu'),sede:v('rSede'),correo:v('rCor'),celular:v('rCel'),reps:v('rReps'),mensaje:v('rMsg'),particular:Number(v('rPar')),tarifa:Number(v('rTar')),
      horas:v('rHor').split(',').map(s=>s.trim()).filter(s=>/^\d{1,2}:\d{2}$/.test(s)).map(s=>s.padStart(5,'0')),dias:[...document.querySelectorAll('.rDia:checked')].map(e=>Number(e.value)),banco:`${v('rBan')} · ${v('rCta')}`,codigo:ui.invitacion.codigo,acepto:true,doc:docData,docTipo:doc.type,docNombre:doc.name,selfie:selfData}});
    iniciarPago(o);
  }catch(e){toast(e.message)}
}

/* ---------- Portal médico ---------- */
async function vMedico(){
  if(!tok.get('medico')) return `<div class="rejilla" style="align-items:start">${vLogin('medico','Portal médico','<p class="pequeno" style="margin-top:1rem">¿Aún no está en la red? <a href="#/especialistas">Solicite acceso</a>.</p>')}
    <section class="panel"><h2>Qué encontrará en su portal</h2><ul class="lista-v" style="grid-template-columns:1fr">
      <li>${ico('agenda')}<div><strong>Su agenda</strong><br><span class="pequeno">Los pacientes que ya pagaron, con fecha y hora. Al atenderlos, registra el código de atención.</span></div></li>
      <li>${ico('rayo')}<div><strong>Botón "Estoy disponible ahora"</strong><br><span class="pequeno">Actívelo cuando tenga un espacio libre y reciba pacientes que necesitan atención inmediata.</span></div></li>
      <li>${ico('dinero')}<div><strong>Su dinero</strong><br><span class="pequeno">Lo reservado por consultas pendientes, lo disponible para retirar y sus transferencias.</span></div></li>
      <li>${ico('chat')}<div><strong>Preguntas y opiniones</strong><br><span class="pequeno">Responda dudas de familias de su ciudad y vea las calificaciones de sus pacientes.</span></div></li>
      <li>${ico('perfil')}<div><strong>Su perfil</strong><br><span class="pequeno">Sus precios, sus horarios y su mensaje para las familias.</span></div></li>
      <li>${ico('recibo')}<div><strong>Su anualidad</strong><br><span class="pequeno">La vigencia de su registro y la renovación en línea.</span></div></li></ul></section></div>`;
  let y; try{y=await api('/api/medico/yo',{auth:'medico'})}catch(e){if(!tok.get('medico'))return vMedico();throw e}
  ui.med=y; const inst=y.perfiles[0].institucion, p=y.perfiles[Math.min(ui.perfil,y.perfiles.length-1)], stv=p.vigencia, s=y.saldo;
  let h=`${barraCuenta('medico',p.nombre,inst?'Portal de la sede propia':'Portal médico')}<div class="fila" style="margin-top:-.6rem;margin-bottom:.8rem"><div><div class="suave pequeno">${inst?`${y.perfiles.length} servicios`:esc(p.servicio)+' · '+esc(p.ciudad)+' · registro vigente hasta '+fmt(p.vence)}${p.fundador?' · <span class="etq etq-ips">Especialista Fundador</span>':''}</div></div></div>`;
  const ayuda=`<a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/${WA_SOPORTE}?text=${encodeURIComponent('Hola, necesito ayuda con mi registro de especialista en FamilIA Salud')}">Soporte por WhatsApp</a>`;
  if(p.estado==='verificando') h+=`<section class="recordatorio"><strong>Nuestro equipo está confirmando su registro profesional en el ReTHUS.</strong> Su servicio se habilita apenas se confirme. Le avisaremos por correo.</section>`;
  if(!inst&&stv.k==='bloqueado') return h+`<section class="aviso"><h3>Acceso bloqueado por falta de pago</h3><p>Su anualidad venció el ${fmt(p.vence)}. Su perfil ya no aparece para las familias. Al renovar la cuota anual de ${dinero(y.cuotaMedico)}, todo se restablece de inmediato.</p><div class="fila"><button class="btn btn-a" onclick="renovarMedico()">Renovar registro</button>${ayuda}</div></section>`;
  if(!inst&&stv.k==='aviso') h+=`<section class="aviso fila" style="justify-content:space-between"><div style="flex:1;min-width:220px"><h3>Su anualidad venció el ${fmt(p.vence)}</h3><p class="pequeno">Las familias todavía ven su perfil, pero <strong>no puede recibir pacientes</strong>. Si no renueva, el acceso se bloquea en ${stv.dias} día${stv.dias===1?'':'s'}.</p><div class="fila"><button class="btn btn-a" onclick="renovarMedico()">Renovar por ${dinero(y.cuotaMedico)}</button>${ayuda}</div></div><div class="cuenta">${stv.dias}</div></section>`;
  else if(!inst&&stv.porVencer!=null) h+=`<section class="recordatorio fila" style="justify-content:space-between"><span>${stv.porVencer===0?'Su anualidad vence HOY.':`Su anualidad vence en ${stv.porVencer} día${stv.porVencer===1?'':'s'}.`}</span><button class="btn btn-a btn-chico" onclick="renovarMedico()">Renovar</button></section>`;
  if(!inst&&p.estado==='aprobado'&&stv.k==='activo') h+=`<section class="panel" style="border-left:5px solid ${p.ahora?'var(--wa)':'var(--linea)'}"><div class="fila" style="justify-content:space-between"><div><h3 style="margin:0">${p.ahora?'Usted aparece como disponible ahora':'No está recibiendo pacientes inmediatos'}</h3><span class="pequeno suave">${p.ahora?'Las familias pueden pedir atención inmediata con usted. Se apaga solo a las 3 horas.':'Actívelo cuando tenga un espacio libre. Se apaga solo a las 3 horas.'}</span></div><button class="btn ${p.ahora?'btn-l':'btn-wa'}" onclick="cambiarAhora('${p.id}')">${p.ahora?'Pausar':'Estoy disponible ahora'}</button></div></section>`;
  h+=`<div class="kpis"><div class="kpi"><strong>${dinero(s.retenido)}</strong><span>reservado por consultas pendientes</span></div><div class="kpi"><strong>${dinero(s.espera||0)}</strong><span>atendido, se libera a los ${y.diasRetiro} días</span></div><div class="kpi"><strong>${dinero(s.disponible)}</strong><span>disponible para retirar</span></div><div class="kpi"><strong>${dinero(s.liberado)}</strong><span>ganado en total</span></div></div>
  <div class="sub">${[['agenda','Agenda'],['bloqueos','Días no disponibles'],['dinero','Mi dinero'],['preguntas','Preguntas y opiniones'],...(inst?[]:[['perfil','Mi perfil']])].map(([k,t])=>`<button aria-pressed="${ui.vistaMed===k}" onclick="ui.vistaMed='${k}';render()">${t}</button>`).join('')}</div>`;
  if(ui.vistaMed==='agenda'){
    const cs=[...y.citas].sort((a,b)=>(b.inmediata&&b.estado==='confirmada')-(a.inmediata&&a.estado==='confirmada')||(a.estado==='confirmada'?0:1)-(b.estado==='confirmada'?0:1));
    h+=`<section class="panel"><h3>Pacientes</h3><p class="pequeno suave">Antes de atender, compare el documento del paciente con su cédula (o escanee el QR de su carnet). Al terminar la consulta, pida al paciente su código de atención y regístrelo. En ese momento recibe el ${100-y.comision}% del valor.</p>
    ${cs.length?`<ul class="lista">${cs.map(c=>`<li><div><strong>${esc(c.miembro)}</strong>${inst?' · '+esc(c.servicio):''} ${c.inmediata&&c.estado==='confirmada'?'<span class="etq etq-ok">En camino · atención inmediata</span>':''}<br><span class="pequeno">Carnet ${esc(c.carnet)} · documento <strong>${esc(c.doc||'—')}</strong> · ${fmt(c.fecha)} ${hora12(c.hora)}</span><br><span class="pequeno suave">Consulta ${dinero(c.monto)} · usted recibe ${dinero(c.neto)}</span></div>
      ${c.estado==='confirmada'?`<div><div class="fila"><input id="cod_${c.id}" inputmode="numeric" maxlength="6" placeholder="Código" style="width:7.5rem"><button class="btn btn-p btn-chico" onclick="registrarAtencion('${c.id}')">Registrar atención</button></div><div class="fila" style="margin-top:.3rem"><button class="btn btn-l btn-chico" onclick="noLlego('${c.id}')">El paciente no llegó</button><button class="btn btn-l btn-chico" onclick="cancelarMedico('${c.id}')">Cancelar</button></div></div>`:c.estado==='no_asistio'?`<span class="etq etq-av">No asistió · recibe el ${y.inasistencia}%</span>`:'<span class="etq etq-ok">Atendida y pagada</span>'}</li>`).join('')}</ul>`:'<p class="suave">Aún no tiene pacientes.</p>'}</section>`;
  } else if(ui.vistaMed==='bloqueos'){
    h+=`<section class="panel"><h3>Días no disponibles</h3><p class="pequeno suave">Vacaciones, congresos, cirugías: en esas fechas no se le venden turnos. Si ya tiene consultas confirmadas en esos días, cancélelas primero desde la agenda.</p>
      <div class="r2"><div><label for="bDes">Desde</label><input id="bDes" type="date" min="${ymd(hoy())}"></div><div><label for="bHas">Hasta</label><input id="bHas" type="date" min="${ymd(hoy())}"></div><div><label for="bMot">Motivo (solo usted lo ve)</label><input id="bMot" maxlength="120"></div></div>
      <button class="btn btn-a" style="margin-top:.6rem" onclick="agregarBloqueo()">Bloquear esas fechas</button>
      <ul class="lista" style="margin-top:1rem">${y.bloqueos.map(b=>`<li><span>${fmt(b.desde)}${b.hasta!==b.desde?' al '+fmt(b.hasta):''}${b.motivo?' · '+esc(b.motivo):''}</span><button class="btn btn-l btn-chico" onclick="quitarBloqueo('${b.id}')">Quitar</button></li>`).join('')||'<li>No tiene fechas bloqueadas.</li>'}</ul></section>`;
  } else if(ui.vistaMed==='dinero'){
    h+=`<section class="panel"><h3>Retirar a mi cuenta</h3><p class="pequeno suave">Cuenta registrada: ${esc(p.banco)}. Para cambiarla, escriba a contabilidad.</p>
      <button class="btn btn-a" ${s.disponible<=0?'disabled':''} onclick="pedirRetiro()">Retirar ${dinero(s.disponible)}</button>
      <h3 style="margin-top:1.2rem">Movimientos</h3><ul class="lista">${y.movimientos.map(x=>`<li><span>${fmt(x.fecha)} · ${x.nota?esc(x.nota)+' · servicios de la aplicación '+dinero(x.comision):`consulta ${dinero(x.monto)} − servicios de la aplicación ${dinero(x.comision)}`}</span><span class="etq ${x.estado==='liberado'?'etq-ok':x.estado==='retenido'?'etq-av':'etq-no'}">${x.estado==='liberado'?'Pagado '+dinero(x.neto):x.estado==='retenido'?'Reservado':'Devuelto a la familia'}</span></li>`).join('')}
      ${y.retiros.map(r=>`<li><span>${fmt(r.fecha)} · retiro a cuenta</span><span class="etq ${r.estado==='transferido'?'etq-ok':'etq-av'}">${r.estado==='transferido'?'Transferido':'En proceso'} ${dinero(r.monto)}</span></li>`).join('')}</ul></section>`;
  } else if(ui.vistaMed==='preguntas'){
    const n=y.resenas.length, prom=n?y.resenas.reduce((a,r)=>a+r.estrellas,0)/n:0;
    h+=`<section class="panel"><h3>Preguntas de familias sin responder</h3><p class="pequeno suave">Su respuesta se publica en la página de su ciudad, firmada solo con su especialidad.</p>
    ${y.preguntas.length?`<ul class="lista">${y.preguntas.map(q=>`<li style="display:block"><strong>${esc(q.texto)}</strong> <span class="pequeno suave">(${esc(q.servicio)})</span><textarea id="resp_${q.id}" rows="3" maxlength="700" style="margin-top:.5rem" placeholder="Orientación general, sin diagnosticar"></textarea><button class="btn btn-p btn-chico" style="margin-top:.4rem" onclick="responder('${q.id}')">Publicar respuesta</button></li>`).join('')}</ul>`:'<p class="suave">No hay preguntas pendientes de su especialidad.</p>'}</section>
    <section class="panel"><h3>Opiniones de mis pacientes</h3>${n?`<p><span style="color:var(--ambar)">${estrellas(prom)}</span> ${prom.toFixed(1)} · ${n} opiniones</p><ul class="lista">${y.resenas.map(r=>`<li style="display:block"><span style="color:var(--ambar)">${estrellas(r.estrellas)}</span> <span class="pequeno suave">${fmt(r.fecha)}</span><br>${esc(r.texto||'Sin comentario')}</li>`).join('')}</ul>`:'<p class="suave">Aún no tiene opiniones.</p>'}</section>`;
  } else {
    h+=`<section class="panel"><h3>Mi perfil</h3><div class="r2">
      <div><label for="mPar">Precio real de la consulta</label><input id="mPar" type="number" value="${p.particular}"></div>
      <div><label for="mTar">Precio con descuento para afiliados</label><input id="mTar" type="number" value="${p.tarifa}"></div>
      <div><label for="mHor">Horas</label><input id="mHor" value="${(p.horas||[]).join(', ')}"></div></div>
      <p class="pequeno">Usted recibe ${dinero(Math.round(p.tarifa*(1-y.comision/100)))} por consulta. El ${y.comision}% del precio con descuento corresponde al cobro por servicios de la aplicación.</p>
      <label for="mMsg">Mensaje para las familias</label><textarea id="mMsg" rows="2" maxlength="200">${esc(p.mensaje||'')}</textarea>
      <label>Días</label><div class="fila">${[1,2,3,4,5,6,0].map(d=>`<label style="display:flex;gap:.3rem;align-items:center;font-weight:500;margin:0"><input type="checkbox" class="mDia" value="${d}" ${(p.dias||[]).includes(d)?'checked':''}>${DIAS[d]}</label>`).join('')}</div>
      <button class="btn btn-p" style="margin-top:.8rem" onclick="guardarPerfil('${p.id}')">Guardar cambios</button></section>`;
  }
  return h;
}
const cambiarAhora=id=>accion(()=>api('/api/medico/ahora',{method:'POST',auth:'medico',body:{id}}));
const noLlego=id=>{if(confirm('¿El paciente no llegó? Usted recibe el '+ui.med.inasistencia+'% de la consulta y el resto vuelve al saldo de la familia.'))accion(()=>api('/api/medico/no-llego',{method:'POST',auth:'medico',body:{cita:id}}),'Inasistencia registrada.')};
const cancelarMedico=id=>{const m=prompt('Motivo de la cancelación (la familia lo verá):');if(m)accion(()=>api('/api/medico/cancelar',{method:'POST',auth:'medico',body:{cita:id,motivo:m}}),'Consulta cancelada. El valor quedó en el saldo de la familia y le avisamos.')};
const agregarBloqueo=()=>{const v=id=>document.getElementById(id).value;accion(()=>api('/api/medico/bloqueo',{method:'POST',auth:'medico',body:{desde:v('bDes'),hasta:v('bHas')||v('bDes'),motivo:v('bMot')}}),'Fechas bloqueadas.')};
const quitarBloqueo=id=>accion(()=>api('/api/medico/bloqueo-quitar',{method:'POST',auth:'medico',body:{id}}),'Bloqueo quitado.');
const registrarAtencion=id=>accion(async()=>{const r=await api('/api/medico/atender',{method:'POST',auth:'medico',body:{cita:id,codigo:document.getElementById('cod_'+id).value.trim()}});toast(`Atención registrada. ${dinero(r.neto)} ya están en su saldo.`)});
const pedirRetiro=()=>accion(()=>api('/api/medico/retiro',{method:'POST',auth:'medico'}),'Retiro solicitado. Se transfiere a su cuenta registrada.');
const responder=id=>accion(()=>api('/api/medico/responder',{method:'POST',auth:'medico',body:{pregunta:id,texto:document.getElementById('resp_'+id).value}}),'Respuesta publicada en la página de la ciudad.');
async function renovarMedico(){try{iniciarPago(await api('/api/medico/renovar',{method:'POST',auth:'medico'}))}catch(e){toast(e.message)}}
function guardarPerfil(id){const v=x=>document.getElementById(x).value;accion(()=>api('/api/medico/perfil',{method:'POST',auth:'medico',body:{id,particular:Number(v('mPar')),tarifa:Number(v('mTar')),mensaje:v('mMsg'),dias:[...document.querySelectorAll('.mDia:checked')].map(e=>Number(e.value)),horas:v('mHor').split(',').map(s=>s.trim()).filter(s=>/^\d{1,2}:\d{2}$/.test(s)).map(s=>s.padStart(5,'0'))}}),'Cambios guardados.')}

/* ---------- Administración ---------- */
const ROLES={superior:'Administrador superior',contabilidad:'Contabilidad',verificador:'Verificador ReTHUS',operador:'Operador'};
async function vAdmin(){
  if(!tok.get('admin')) return vLogin('admin','Acceso SkyNet Genesis','<p class="pequeno suave" style="margin-top:1rem">Solo para el equipo de FamilIA Salud.</p>'+(CFG.demo?'<p class="pequeno suave">Demostración: contabilidad@, verificador@ u operador@skynetgenesis.com con la contraseña demo123456.</p>':''));
  let d; try{d=await api('/api/admin/datos',{auth:'admin'})}catch(e){if(!tok.get('admin'))return vAdmin();throw e}
  ui.adm=d; const pm=d.permisos,a=d.ajustes,k=d.kpis;
  let h=`${d.rol==='superior'?'<p class="recordatorio pequeno"><strong>Modo Superadministrador.</strong> Usted ve toda la plataforma. Sus acciones quedan registradas internamente.</p>':''}${barraCuenta('admin',d.yo||ROLES[d.rol],ROLES[d.rol])}
  <div class="kpis"><div class="kpi"><strong>${k.familias}</strong><span>familias con carnet activo</span></div><div class="kpi"><strong>${k.personas}</strong><span>personas cubiertas</span></div><div class="kpi"><strong>${k.especialistas}</strong><span>especialistas en la red</span></div>
  ${pm.dinero?`<div class="kpi"><strong>${dinero(k.comisiones)}</strong><span>servicios de la aplicación (${a.comision}%)</span></div><div class="kpi"><strong>${dinero(k.afiliaciones)}</strong><span>afiliaciones este año</span></div><div class="kpi"><strong>${dinero(k.cuotas)}</strong><span>cuotas de especialistas este año</span></div><div class="kpi"><strong>${dinero(k.custodia)}</strong><span>reservado de consultas por atender</span></div>`:''}</div>`;
  const tabs=[['resumen','Familias'],['medicos',`Especialistas${d.pendientes.length?' ('+d.pendientes.length+' por confirmar)':''}`]];
  if(pm.verificar){const n=(d.solicitudes||[]).filter(x=>x.estado==='pendiente').length;tabs.push(['solicitudes',`Solicitudes de acceso${n?' ('+n+')':''}`])}
  if(pm.dinero) tabs.push(['dinero',`Pagos y retiros${(d.retiros||[]).filter(r=>r.estado==='solicitado').length+(d.reembolsos||[]).length+(d.revisar||[]).length?' (!)':''}`],['proyeccion','Proyección de ingresos']);
  if(pm.precios) tabs.push(['ips','Sede propia'],['precios','Precios y equipo'],['ciudades','Ciudades'],['cuentas','🔐 Cuentas y accesos']);
  if(!tabs.some(t=>t[0]===ui.vistaAdm)) ui.vistaAdm='resumen';
  h+=`<div class="sub">${tabs.map(([x,t])=>`<button aria-pressed="${ui.vistaAdm===x}" onclick="ui.vistaAdm='${x}';render()">${t}</button>`).join('')}</div>`;
  if(!pm.datos) h+=`<p class="recordatorio pequeno">Su rol no permite ver datos personales ni bancarios. Solo los ven la administración superior y contabilidad.${d.rol==='verificador'?' Como verificador, solo ve el nombre, la cédula y los documentos de los registros por confirmar.':''}</p>`;
  if(ui.vistaAdm==='resumen'){
    h+=`<section class="panel"><div class="fila" style="justify-content:space-between"><h3 style="margin:0">Familias</h3>${pm.datos?'<button class="btn btn-l btn-chico" onclick="imprimirReporte()">Descargar reporte en PDF</button>':''}</div>${pm.dinero?'<p class="pequeno suave">"Vigente hasta" equivale a "Pagado hasta". Al cambiarlo, el acceso se restablece de inmediato.</p>':''}
    <ul class="lista">${d.familias.map(f=>`<li><div style="flex:1;min-width:200px"><strong>${esc(f.titular)}</strong> <span class="etq ${f.estado.k==='activa'?'etq-ok':f.estado.k==='aviso'?'etq-av':'etq-no'}">${f.estado.txt}</span><br><span class="pequeno suave">${pm.datos?esc(f.correo)+' · '+esc(f.telefono)+' · ':''}${f.personas} personas · ${esc(f.ciudad)}</span></div>
      ${pm.dinero?`<label class="pequeno" style="margin:0">Vigente hasta <input type="date" value="${f.vence}" style="width:auto" onchange="cambiarVence('f','${f.id}',this.value)"></label>`:`<span class="pequeno">Vigente hasta ${fmt(f.vence)}</span>`}</li>`).join('')||'<li>Aún no hay familias.</li>'}</ul></section>`;
  } else if(ui.vistaAdm==='medicos'){
    const ficha=p=>{const est=`<span class="etq ${p.estado==='verificando'?'etq-av':p.vigencia.k==='activo'?'etq-ok':p.vigencia.k==='aviso'?'etq-av':'etq-no'}">${p.estado==='verificando'?'ReTHUS por confirmar':p.vigencia.txt}</span>${p.fundador?' <span class="etq etq-ips">Fundador</span>':''}`;
      return pm.datos?`<strong>${esc(p.nombre)}</strong> · ${esc(p.servicio)} · ${esc(p.ciudad)} ${est}<br><span class="pequeno">ReTHUS: <strong>${esc(p.rethus||'—')}</strong> · cédula ${esc(p.cedula||'—')} · ${esc(p.correo||'')} · ${esc(p.celular||'')}${p.verificacion?` · verificado el ${fmt(p.verificacion.fecha)} (${esc(p.verificacion.especialidad)})`:''}</span><br><span class="pequeno suave">Cuenta: ${esc(p.banco||'sin registrar')} · precio ${dinero(p.tarifa)} (real ${dinero(p.particular)})</span>`:`<strong>${esc(p.servicio)}</strong> · ${esc(p.ciudad)} ${est}<br><span class="pequeno suave">Profesional ${esc(p.id.toUpperCase())}</span>`};
    const CH=['El nombre y la cédula aparecen en el ReTHUS','La especialidad registrada en el ReTHUS coincide con la declarada','El registro está activo, sin sanciones','La foto con la cédula corresponde a la misma persona'];
    h+=`<section class="panel"><h3>ReTHUS por confirmar</h3><p class="pequeno suave">Busque al profesional por cédula en la consulta pública del ReTHUS (SISPRO, Ministerio de Salud) y compare. Si dio código REPS, revíselo también. Solo se habilita si todo coincide.</p>
    ${d.pendientes.length?`<ul class="lista">${d.pendientes.map(p=>`<li style="display:block">${pm.verificar?`<div><strong>${esc(p.nombre)}</strong> · cédula <strong>${esc(p.cedula)}</strong> · ReTHUS <strong>${esc(p.rethus)}</strong><br><span class="pequeno">Especialidad declarada: <strong>${esc(p.servicio)}</strong> · ${esc(p.ciudad)}${p.reps?' · REPS '+esc(p.reps):''}</span></div>
      <div class="fila" style="margin:.5rem 0"><button class="btn btn-l btn-chico" onclick="verDoc('${p.id}','doc')">Ver copia del ReTHUS</button><button class="btn btn-l btn-chico" onclick="verDoc('${p.id}','selfie')">Ver foto con cédula</button></div>
      ${CH.map(c=>`<label style="display:flex;gap:.5rem;font-weight:500;margin:.2rem 0"><input type="checkbox" class="chk_${p.id}"> ${c}</label>`).join('')}
      <label for="esp_${p.id}">Especialidad tal como aparece en el ReTHUS</label><input id="esp_${p.id}">
      <div class="fila" style="margin-top:.6rem"><button class="btn btn-p btn-chico" onclick="confirmarRethus('${p.id}')">Todo coincide: habilitar</button><button class="btn btn-l btn-chico" onclick="rechazar('${p.id}')">No coincide: rechazar</button></div>`:`<div>${ficha(p)}</div><span class="etq etq-av">Lo confirma el verificador de ReTHUS</span>`}</li>`).join('')}</ul>`:'<p class="suave">No hay registros por confirmar.</p>'}</section>
    <section class="panel"><h3>Red de especialistas</h3><ul class="lista">${d.red.map(p=>`<li><div style="flex:1;min-width:220px">${ficha(p)}</div>${pm.dinero?`<label class="pequeno" style="margin:0">Pagado hasta <input type="date" value="${p.vence}" style="width:auto" onchange="cambiarVence('m','${p.id}',this.value)"></label>`:''}</li>`).join('')||'<li>Aún no hay especialistas habilitados.</li>'}</ul></section>`;
  } else if(ui.vistaAdm==='ciudades'){
    const cs=await api('/api/admin/ciudades',{auth:'admin'});
    h+=`<section class="panel"><h3>Ciudades</h3><p class="pequeno suave">Las familias solo pueden activar el carnet en ciudades abiertas. Abra una ciudad cuando tenga especialistas suficientes; al abrirla se avisa por correo a la lista de espera.</p>
      <ul class="lista">${cs.map(c=>`<li><div><strong>${esc(c.ciudad)}</strong> <span class="etq ${c.abierta?'etq-ok':'etq-av'}">${c.abierta?'Abierta':'Próximamente'}</span><br><span class="pequeno suave">${c.especialistas} especialistas${c.sede?' · sede propia':''} · ${c.familias} familias · ${c.espera} en lista de espera</span></div><button class="btn ${c.abierta?'btn-l':'btn-a'} btn-chico" onclick="if(confirm('${c.abierta?'¿Cerrar':'¿Abrir'} ${esc(c.ciudad)}?'))adminPost('/api/admin/ciudad',{ciudad:'${esc(c.ciudad)}',abrir:${!c.abierta}},'${c.abierta?'Ciudad cerrada.':'Ciudad abierta. Se avisó a la lista de espera.'}')">${c.abierta?'Cerrar':'Abrir'}</button></li>`).join('')}</ul></section>`;
  } else if(ui.vistaAdm==='cuentas'){
    h+=await vCuentas();
  } else if(ui.vistaAdm==='solicitudes'){
    h+=`<section class="panel"><h3>Solicitudes de acceso de especialistas</h3><p class="pequeno suave">Revise la solicitud y envíe el código de invitación. Solo con ese código el especialista puede abrir el formulario de registro y pagar su cuota.</p>
    <ul class="lista">${(d.solicitudes||[]).map(x=>`<li><div style="flex:1;min-width:220px"><strong>${esc(x.nombre)}</strong> · ${esc(x.servicio)} · ${esc(x.ciudad)}<br><span class="pequeno suave">ReTHUS ${esc(x.rethus)} · ${esc(x.correo)} · ${esc(x.celular)} · ${fmt(x.fecha)}</span></div>
      ${x.estado==='pendiente'?`<div class="fila"><button class="btn btn-p btn-chico" onclick="adminPost('/api/admin/invitar',{id:'${x.id}'},'Código enviado al correo del especialista.')">Enviar código de invitación</button><button class="btn btn-l btn-chico" onclick="if(confirm('¿Rechazar esta solicitud?'))adminPost('/api/admin/solicitud-rechazar',{id:'${x.id}'},'Solicitud rechazada.')">Rechazar</button></div>`:x.estado==='invitado'?`<span class="etq etq-av">Invitado${pm.aprobar?' · código '+esc(x.codigo):''}</span>`:x.estado==='registrado'?'<span class="etq etq-ok">Ya se registró</span>':'<span class="etq etq-no">Rechazada</span>'}</li>`).join('')||'<li>No hay solicitudes.</li>'}</ul></section>`;
  } else if(ui.vistaAdm==='dinero'){
    h+=`<section class="panel" style="border-left:5px solid var(--ambar)"><h3>Pagos para revisar</h3><p class="pequeno suave">Pagos que la pasarela aprobó pero no cuadran con lo pedido (valor menor, plan distinto o pago doble). Compruébelos en el panel de Bold antes de actuar.</p>
      <ul class="lista">${(d.revisar||[]).map(x=>`<li><div><strong>${esc(x.nombre)}</strong> · ${esc(x.tipo)} · ${dinero(x.monto)}<br><span class="pequeno suave">${esc(x.correo)} · ${esc(x.nota||'')} · ${esc(x.fecha)}</span></div></li>`).join('')||'<li>Ninguno.</li>'}</ul>
      ${pm.precios?`<p class="pequeno" style="margin-top:.6rem">Para comprobar que la pasarela funciona de punta a punta: <button class="btn btn-l btn-chico" onclick="pagoPrueba()">Pago de prueba de $1.000</button></p>`:''}</section>
    <section class="panel"><h3>Todos los pagos</h3>${listaPagos(d.pagos,true)}</section>
    <section class="panel"><h3>Retiros de especialistas</h3><ul class="lista">${d.retiros.map(r=>`<li><div><strong>${esc(r.nombre)}</strong> · ${dinero(r.monto)}<br><span class="pequeno suave">${fmt(r.fecha)} · ${esc(r.banco||'sin cuenta registrada')}</span></div>${r.estado==='solicitado'?`<button class="btn btn-p btn-chico" onclick="adminPost('/api/admin/retiro',{id:'${r.id}'},'Retiro marcado como transferido.')">Marcar transferido</button>`:'<span class="etq etq-ok">Transferido</span>'}</li>`).join('')||'<li>Sin retiros.</li>'}</ul></section>
    <section class="panel"><h3>Consultas pagadas sin atender</h3><p class="pequeno suave">Consultas de hoy o de días anteriores que el profesional aún no registra. Si la familia no fue atendida, márquela: el valor vuelve a su saldo a favor.</p><ul class="lista">${(d.reservadas||[]).map(x=>`<li><div><strong>${esc(x.miembro)}</strong> · ${esc(x.servicio)} · ${esc(x.nombre)}<br><span class="pequeno suave">${fmt(x.fecha)} ${hora12(x.hora)} · ${dinero(x.monto)}</span></div><button class="btn btn-l btn-chico" onclick="if(confirm('¿La familia no fue atendida? Se cancelará la consulta y quedará para reembolso.'))adminPost('/api/admin/reembolsar-consulta',{orden:'${x.orden}'},'Consulta cancelada; quedó en Reembolsos a familias.')">Marcar para reembolso</button></li>`).join('')||'<li>Ninguna.</li>'}</ul></section>
    <section class="panel"><h3>Devoluciones de saldo a familias</h3><p class="pequeno suave">Saldo a favor de todas las familias: <strong>${dinero(d.saldoFamilias||0)}</strong>. Aquí están las que pidieron que se lo transfieran.</p><ul class="lista">${d.reembolsos.map(r=>`<li><div><strong>${esc(r.titular)}</strong> · ${dinero(r.monto)} · ${fmt(r.fecha)}<br><span class="pequeno suave">${esc(r.correo)} · ${esc(r.telefono)}<br>Cuenta: ${esc(r.cuenta)}</span></div><button class="btn btn-p btn-chico" onclick="adminPost('/api/admin/reembolso',{id:'${r.id}'},'Devolución marcada como transferida.')">Marcar transferida</button></li>`).join('')||'<li>Sin devoluciones pendientes.</li>'}</ul></section>
    <section class="panel"><h3>Pagos sin confirmar</h3><p class="pequeno suave">Si la pasarela cobró pero el aviso automático no llegó, toque "Comprobar": el sistema le pregunta a Bold y solo lo aplica si Bold confirma que fue aprobado.</p><ul class="lista">${d.pendientesPago.map(x=>`<li><span>${esc(x.fecha)} · ${esc(x.tipo)} · ${dinero(x.monto)} · ${esc(x.orden)}</span><button class="btn btn-l btn-chico" onclick="adminPost('/api/admin/aprobar-pago',{orden:'${x.orden}'},'Bold confirmó el pago y ya quedó aplicado.')">Comprobar</button></li>`).join('')||'<li>Ninguno.</li>'}</ul></section>`;
  } else if(ui.vistaAdm==='proyeccion'){
    if(!ui.proy) ui.proy={fam:2000,med:100,cons:3,precio:100000,pasarela:3.5,ips:30,precioIps:50000,gastos:8000000,anio:1,ciudades:3};
    const q=ui.proy,campo=(x,t,paso)=>`<div><label for="py_${x}">${t}</label><input id="py_${x}" type="number" step="${paso||1}" value="${q[x]}" oninput="ui.proy.${x}=Number(this.value)||0;calcProy()"></div>`;
    h+=`<section class="panel"><h3>Proyección anual de ingresos</h3><p class="pequeno suave">Usa los precios vigentes. Cambie los supuestos y el resultado se actualiza al instante.</p>
      <div class="fila" style="margin-bottom:.4rem"><button class="btn btn-l btn-chico" onclick="escenario(500,30,2)">Conservador</button><button class="btn btn-l btn-chico" onclick="escenario(2000,100,3)">Medio</button><button class="btn btn-l btn-chico" onclick="escenario(10000,400,3)">Optimista</button></div>
      <div class="r2">${campo('fam','Familias afiliadas')}${campo('med','Especialistas en la red')}${campo('cons','Consultas por familia al año',0.5)}${campo('precio','Consulta promedio con descuento',1000)}${campo('pasarela','Comisión de la pasarela %',0.1)}${campo('ips','% de consultas en Reina Elizabeth')}${campo('precioIps','Consulta promedio en Reina Elizabeth',1000)}${campo('gastos','Gastos fijos mensuales',100000)}${campo('ciudades','Ciudades con red')}
      <div><label for="py_anio">Año de operación</label><select id="py_anio" onchange="ui.proy.anio=Number(this.value);calcProy()"><option value="1" ${q.anio===1?'selected':''}>Año 1 (con Fundadores)</option><option value="2" ${q.anio===2?'selected':''}>Año 2 (todos a precio completo)</option></select></div></div>
      <div id="resProy" style="margin-top:1rem"></div></section>`;
  } else if(ui.vistaAdm==='ips'){
    h+=`<section class="panel"><h3>Servicios de Clínica Reina Elizabeth IPS</h3><p class="pequeno suave">Edite precios, horas y la disponibilidad inmediata de cada servicio. Las consultas de estos servicios se registran desde el Portal médico con el correo de la IPS.</p>
    <ul class="lista">${d.ips.map(s=>`<li style="display:block"><strong>${esc(s.servicio)}</strong><div class="r2"><div><label>Precio real</label><input id="ip_p_${s.id}" type="number" value="${s.particular}"></div><div><label>Precio con descuento</label><input id="ip_t_${s.id}" type="number" value="${s.tarifa}"></div><div><label>Horas</label><input id="ip_h_${s.id}" value="${(s.horas||[]).join(', ')}"></div></div>
      <label style="display:flex;gap:.5rem;font-weight:500"><input type="checkbox" id="ip_a_${s.id}" ${s.ahora?'checked':''}> Disponible ahora (atención inmediata)</label><button class="btn btn-p btn-chico" style="margin-top:.4rem" onclick="guardarIps('${s.id}')">Guardar</button></li>`).join('')}</ul></section>`;
  } else {
    h+=`<section class="panel"><h3>Precios</h3><div class="r2">
      <div><label for="aj_precioRegular">Afiliación anual: precio regular</label><input id="aj_precioRegular" type="number" value="${a.precioRegular}"></div>
      <div><label for="aj_precioEnLinea">Afiliación anual: precio en línea (promoción)</label><input id="aj_precioEnLinea" type="number" value="${a.precioEnLinea}"></div>
      <div><label for="aj_incluidos">Personas incluidas</label><input id="aj_incluidos" type="number" value="${a.incluidos}"></div>
      <div><label for="aj_adicional">Valor por persona adicional</label><input id="aj_adicional" type="number" value="${a.adicional}"></div>
      <div><label for="aj_maxAdicionales">Máximo de adicionales por carnet</label><input id="aj_maxAdicionales" type="number" value="${a.maxAdicionales}"></div>
      <div><label for="aj_comision">Servicios de la aplicación %</label><input id="aj_comision" type="number" value="${a.comision}"></div>
      <div><label for="aj_cuotaMedico">Cuota anual del especialista</label><input id="aj_cuotaMedico" type="number" value="${a.cuotaMedico}"></div>
      <div><label for="aj_cuotaFundador">Cuota del primer año para Fundadores</label><input id="aj_cuotaFundador" type="number" value="${a.cuotaFundador}"></div>
      <div><label for="aj_cupoFundadores">Cupos de Fundador por ciudad</label><input id="aj_cupoFundadores" type="number" value="${a.cupoFundadores}"></div>
      <div><label for="aj_inasistencia">% para el profesional si el paciente no llega</label><input id="aj_inasistencia" type="number" min="0" max="100" value="${a.inasistencia??50}"></div>
      <div><label for="aj_diasRetiro">Días de espera antes de poder retirar</label><input id="aj_diasRetiro" type="number" min="0" max="30" value="${a.diasRetiro??8}"></div></div>
      <p class="pequeno suave">Fundadores por ciudad: ${Object.entries(d.fundadores).map(([c,n])=>`${c} ${n}/${a.cupoFundadores}`).join(' · ')||'ninguno todavía'}.</p>
      <button class="btn btn-p" onclick="guardarAjustes()">Guardar precios</button></section>
    <section class="panel"><h3>Equipo de administración</h3><ul class="lista">${d.equipo.map(e=>`<li><span>${esc(e.nombre||'')} · ${esc(e.correo)} · <strong>${ROLES[e.rol]}</strong></span><button class="btn btn-l btn-chico" onclick="if(confirm('¿Quitar a ${esc(e.correo)} del equipo?'))adminPost('/api/admin/equipo',{correo:'${esc(e.correo)}',quitar:true},'Quitado del equipo.')">Quitar</button></li>`).join('')}</ul>
      <div class="r2"><div><label for="eqN">Nombre</label><input id="eqN"></div><div><label for="eqC">Correo</label><input id="eqC" type="email"></div><div><label for="eqR">Rol</label><select id="eqR">${Object.entries(ROLES).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></div></div>
      <button class="btn btn-a" style="margin-top:.6rem" onclick="adminPost('/api/admin/equipo',{nombre:document.getElementById('eqN').value,correo:document.getElementById('eqC').value,rol:document.getElementById('eqR').value},'Agregado al equipo.')">Agregar al equipo</button></section>`;
  }
  return h;
}
const adminPost=(url,body,msg)=>accion(()=>api(url,{method:'POST',auth:'admin',body}),msg);
const cambiarVence=(tipo,id,fecha)=>{if(fecha)adminPost('/api/admin/vence',{tipo,id,fecha},'Vigencia actualizada.')};
function confirmarRethus(id){const checks=[...document.querySelectorAll('.chk_'+id)].filter(c=>c.checked).length;adminPost('/api/admin/verificar',{id,checks,especialidad:document.getElementById('esp_'+id).value},'ReTHUS confirmado. El especialista quedó habilitado.')}
function rechazar(id){if(confirm('¿Rechazar este registro? Se le avisará al profesional por correo.'))adminPost('/api/admin/rechazar',{id},'Registro rechazado.')}
async function pagoPrueba(){try{iniciarPago(await api('/api/admin/prueba-bold',{method:'POST',auth:'admin'}))}catch(e){toast(e.message)}}
async function descargarRespaldo(){
  try{const d=await api('/api/admin/respaldo',{auth:'admin'});const b=new Blob([JSON.stringify(d,null,1)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=`respaldo-familiasalud-${ymd(new Date())}.json`;document.body.appendChild(a);a.click();a.remove();toast('Respaldo descargado. Guárdelo en un lugar seguro: tiene datos personales.')}catch(e){toast(e.message)}
}
async function vCuentas(){
  const cs=await api('/api/admin/cuentas',{auth:'admin'}); ui.cuentas=cs;
  const T={familia:'Familia',medico:'Especialista o sede',admin:'Equipo'};
  return `<section class="panel"><h3>🔐 Cuentas y accesos</h3><p class="pequeno suave">Todas las cuentas de la plataforma. Las contraseñas se guardan cifradas y nadie puede verlas (Ley 1581 de 2012): para ayudar a alguien, envíele un enlace para crear una nueva.</p>
    <div class="fila"><input id="buscaCuenta" placeholder="Buscar por nombre o correo" oninput="filtrarCuentas(this.value)" style="max-width:340px"><button class="btn btn-l btn-chico" onclick="cuentasCSV()">Descargar CSV</button><button class="btn btn-l btn-chico" onclick="descargarRespaldo()">Descargar respaldo completo</button></div>
    <ul class="lista" id="listaCuentas">${cs.map((c,i)=>`<li data-n="${esc((c.nombre+' '+c.correo).toLowerCase())}"><div style="flex:1;min-width:220px"><strong>${esc(c.nombre)}</strong> · ${T[c.tipo]} · ${esc(c.perfil)}<br><span class="pequeno suave">${esc(c.correo)} · contraseña ${c.clave?'creada':'sin crear'} · último ingreso ${c.ultimo?fmt(c.ultimo):'nunca'}${c.bloqueada?' · <strong style="color:var(--rojo)">bloqueada: '+esc(c.motivo)+'</strong>':''}</span></div>
      <div class="fila"><button class="btn btn-l btn-chico" onclick="adminPost('/api/admin/cuenta-enlace',{correo:'${esc(c.correo)}',tipo:'${c.tipo}'},'Enlace enviado.')">Enviar enlace</button>${c.bloqueada?`<button class="btn btn-l btn-chico" onclick="adminPost('/api/admin/cuenta-bloquear',{correo:'${esc(c.correo)}',tipo:'${c.tipo}',bloquear:false},'Cuenta desbloqueada.')">Desbloquear</button>`:`<button class="btn btn-r btn-chico" onclick="bloquearCuenta(${i})">Bloquear</button>`}</div></li>`).join('')||'<li>Sin cuentas.</li>'}</ul></section>`;
}
function filtrarCuentas(t){t=t.toLowerCase();document.querySelectorAll('#listaCuentas li').forEach(e=>e.style.display=!t||e.dataset.n.includes(t)?'':'none')}
function bloquearCuenta(i){const c=ui.cuentas[i];const m=prompt('Motivo del bloqueo de '+c.correo+':');if(m)adminPost('/api/admin/cuenta-bloquear',{correo:c.correo,tipo:c.tipo,bloquear:true,motivo:m},'Cuenta bloqueada.')}
function cuentasCSV(){const f=[['nombre','correo','tipo','perfil','contrasena_creada','ultimo_ingreso','bloqueada']].concat(ui.cuentas.map(c=>[c.nombre,c.correo,c.tipo,c.perfil,c.clave?'si':'no',c.ultimo||'',c.bloqueada?'si':'no']));
  const t=f.map(r=>r.map(x=>'"'+String(x).replace(/"/g,'""')+'"').join(',')).join('\n')+'\n"Generado por FamilIA Salud · SkyNet Genesis · contacto@skynetgenesis.com · WhatsApp 304 437 5758"';
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+t],{type:'text/csv'}));a.download='cuentas-familiasalud.csv';document.body.appendChild(a);a.click();a.remove();toast('CSV descargado.')}
async function verDoc(id,cual){try{const d=await api(`/api/admin/doc/${id}/${cual}`,{auth:'admin'});modal(`<h3>${esc(d.nombre)}</h3>${String(d.data).startsWith('data:image')?`<img src="${d.data}" alt="${esc(d.nombre)}" style="border-radius:8px">`:`<object data="${d.data}" type="application/pdf" style="width:100%;height:60vh"><p>El PDF no se puede mostrar aquí.</p></object>`}<button class="btn btn-l" style="margin-top:.6rem" onclick="cerrarModal()">Cerrar</button>`)}catch(e){toast(e.message)}}
function guardarIps(id){const v=x=>document.getElementById(x+id);adminPost('/api/admin/ips',{id,particular:Number(v('ip_p_').value),tarifa:Number(v('ip_t_').value),ahora:v('ip_a_').checked,horas:v('ip_h_').value.split(',').map(s=>s.trim()).filter(s=>/^\d{1,2}:\d{2}$/.test(s)).map(s=>s.padStart(5,'0'))},'Servicio actualizado.')}
async function guardarAjustes(){const b={};['precioRegular','precioEnLinea','incluidos','adicional','maxAdicionales','comision','cuotaMedico','cuotaFundador','cupoFundadores','inasistencia','diasRetiro'].forEach(k=>b[k]=Number(document.getElementById('aj_'+k).value));await adminPost('/api/admin/ajustes',b,'Precios guardados.');CFG=null}
async function imprimirReporte(){const d=ui.adm;try{const J=await cargarPDF(),doc=new J({unit:'mm',format:'a4'});doc.setFontSize(16);doc.setTextColor(11,79,138);doc.text('FamilIA Salud · Reporte de familias',15,18);doc.setFontSize(9);doc.setTextColor(28,43,57);doc.text('Generado el '+fmt(ymd(new Date())),15,25);let yy=34;doc.setFont(undefined,'bold');[['Titular',15],['Personas',95],['Ciudad',115],['Vigente hasta',150],['Estado',178]].forEach(([k,x])=>doc.text(k,x,yy));doc.setFont(undefined,'normal');d.familias.forEach(f=>{yy+=7;if(yy>280){doc.addPage();yy=20}doc.text(lat(f.titular).slice(0,38),15,yy);doc.text(String(f.personas),95,yy);doc.text(lat(f.ciudad),115,yy);doc.text(fmt(f.vence),150,yy);doc.text(lat(f.estado.txt).slice(0,18),178,yy)});piePDF(doc);doc.save('reporte-familias.pdf');toast('Reporte descargado en PDF.')}catch(e){toast(e.message)}return;document.getElementById('imprimir').innerHTML=`<h2>FamilIA Salud · Reporte de familias</h2><p>Generado el ${fmt(ymd(new Date()))}</p><table style="width:100%;border-collapse:collapse;font-size:12px" border="1" cellpadding="5"><tr><th>Titular</th><th>Personas</th><th>Ciudad</th><th>Vigente hasta</th><th>Estado</th></tr>${d.familias.map(f=>`<tr><td>${esc(f.titular)}</td><td>${f.personas}</td><td>${esc(f.ciudad)}</td><td>${fmt(f.vence)}</td><td>${f.estado.txt}</td></tr>`).join('')}</table><p style="font-size:11px;margin-top:14px">${SKYNET_REF}</p>`;window.print()}
function escenario(f,m,c){Object.assign(ui.proy,{fam:f,med:m,cons:c});['fam','med','cons'].forEach(x=>{const e=document.getElementById('py_'+x);if(e)e.value=ui.proy[x]});calcProy()}
function calcProy(){
  const el=document.getElementById('resProy'); if(!el||!ui.adm) return;
  const a=ui.adm.ajustes,q=ui.proy,g=q.pasarela/100,m=a.comision/100,consultas=Math.round(q.fam*q.cons);
  const nFund=q.anio===1?Math.min(q.med,a.cupoFundadores*Math.max(1,q.ciudades)):0;
  const cuotas=nFund*a.cuotaFundador+(q.med-nFund)*a.cuotaMedico,afil=q.fam*a.precioEnLinea,com=consultas*q.precio*m,bruto=afil+cuotas+com;
  const pas=(afil+cuotas+consultas*q.precio)*g,neto=bruto-pas,gastos=q.gastos*12,util=neto-gastos;
  const porFam=a.precioEnLinea*(1-g)+q.cons*q.precio*(m-g),eq=porFam>0?Math.max(0,Math.ceil((gastos-cuotas*(1-g))/porFam)):null;
  const consIps=Math.round(consultas*q.ips/100),ingIps=consIps*q.precioIps*(1-m);
  const fila=(t,v,b)=>`<li><span>${b?'<strong>'+t+'</strong>':t}</span><span>${b?'<strong>'+dinero(v)+'</strong>':dinero(v)}</span></li>`;
  el.innerHTML=`<ul class="lista">${fila(`Afiliaciones (${q.fam.toLocaleString('es-CO')} familias)`,afil)}${fila(`Cuotas de especialistas (${q.med.toLocaleString('es-CO')}${nFund?`, ${nFund} Fundadores`:''})`,cuotas)}${fila(`${a.comision}% de ${consultas.toLocaleString('es-CO')} consultas`,com)}${fila('Total bruto',bruto,true)}${fila('Menos pasarela de pago',-pas)}${fila('Ingreso neto de la plataforma',neto,true)}${fila('Menos gastos fijos del año',-gastos)}
    <li><span><strong>Resultado del año</strong></span><span class="precio" style="color:${util>=0?'var(--wa)':'var(--rojo)'}">${dinero(util)}</span></li></ul>
    <div class="kpis" style="margin-top:1rem"><div class="kpi"><strong>${dinero(neto/12)}</strong><span>ingreso neto mensual promedio</span></div><div class="kpi"><strong>${eq==null?'—':eq.toLocaleString('es-CO')}</strong><span>familias para cubrir los gastos</span></div><div class="kpi"><strong>${dinero(ingIps)}</strong><span>ingreso adicional para Reina Elizabeth</span></div></div>
    <p class="pequeno suave">Cada consulta le deja en limpio ${dinero(q.precio*(m-g))}. Proyección estimada; no incluye impuestos.</p>`;
}

/* ---------- Arranque ---------- */
render().then(()=>{let p=null;try{p=JSON.parse(localStorage.getItem('fs_orden'))}catch(e){}
  if(new URLSearchParams(location.search).get('orden')||(p&&Date.now()-(p.t||0)<20*60*1000))esperarPago();
  else{try{localStorage.removeItem('fs_orden')}catch(e){}}});
