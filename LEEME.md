# FamilIA Salud — Guía de publicación (versión de 30 de octubre de 2026)

Aplicación de SkyNet Genesis · contacto@skynetgenesis.com · WhatsApp 304 437 5758

## Partes
- **docs/**: pantallas (GitHub Pages, familiasalud.skynetgenesis.com).
- **server/**: servidor (Render, Ohio). Las tablas se crean solas en Neon (proyecto "familiasalud", ya creado).
- **render.yaml**: receta del servidor.

## Cobros
- Todo se paga SOLO con el Bold central de SkyNet Genesis (firmador y receptor en skynetgenesis.com). No hay llave Bre-B.
- Planes que van en $PLANES de bold-firma.php:
  - familia-salud:afil 98000 (Afiliación anual hasta 7 personas)
  - familia-salud:adic 30000 (Persona adicional, si algún día se permiten)
  - familia-salud:esp 380000 (Cuota anual del especialista)
  - familia-salud:fund 190000 (Cuota del primer año, Especialista Fundador)
  - familia-salud:cien 100 (consultas: se cobran como paq_cien-xN, N = valor/100)
  - familia-salud:prueba 1000
- Líneas para pegar en $PLANES de bold-firma.php (después de "$PLANES = ["):
```
'familia-salud:afil' => [98000, 'FamilIA Salud - Afiliacion anual familiar'],
'familia-salud:adic' => [30000, 'FamilIA Salud - Persona adicional'],
'familia-salud:esp' => [380000, 'FamilIA Salud - Cuota anual del especialista'],
'familia-salud:fund' => [190000, 'FamilIA Salud - Especialista Fundador primer ano'],
'familia-salud:cien' => [100, 'FamilIA Salud - Consulta'],
'familia-salud:prueba' => [1000, 'FamilIA Salud - Pago de prueba'],
```
- Conexión: crear bold-app-familia-salud.php copiando bold-app-hotel-ia.php y cambiando la clave a 'familia-salud' y la dirección a https://<servidor>/api/bold/aplicar (tipo "url", sin secreto; el servidor confirma con bold-verificar.php?app=familia-salud).
- Después de editar el firmador, probar que firman familia-salud:afil, familia-salud:paq_cien-x900 y planes de otras apps (agenda-ia:mensual, contable:c5).
- Con PAGOS_BOLD=1 en Render se cobra de verdad. Con 0, todo pago es simulado (para pruebas).
- La cuenta demo (demo@skynetgenesis.com) nunca abre un cobro real y no afecta datos reales.

## Manuales
- 8 PDF en server/manuales (general, familia, especialista, sede propia, Superadministrador, verificador, contabilidad, operador).
- Cada cuenta descarga solo el suyo con "📘 Mi manual"; el general es público ("📘 Cómo funciona" al pie).

## Accesos
- Superadministrador: superadmin.familia@skynetgenesis.com, por "Acceso SkyNet Genesis" al pie de la página. Su enlace de contraseña llega a rikardolondono@gmail.com.
- Todos entran con correo y contraseña (mínimo 10 caracteres). "Primera vez u olvidó su contraseña" envía un enlace de 1 hora.
- Cuentas demo (contraseña demo123456): demo@skynetgenesis.com (Mi familia y Portal médico), contabilidad@, verificador@ y operador@skynetgenesis.com (Acceso SkyNet Genesis). El Superadministrador no está en la demo.

## Pasos de publicación
1. GitHub: repositorio "familiasalud" con docs, server, render.yaml.
2. Render: Blueprint en un espacio existente (Ohio); pegar DATABASE_URL de Neon y BREVO_API_KEY.
3. Si la dirección del servidor no es https://familiasalud-api.onrender.com, cambiarla en docs/config.js.
4. GitHub Pages: rama main, carpeta /docs, dominio familiasalud.skynetgenesis.com.
5. SiteGround: CNAME familiasalud → rl-rikardolondono.github.io; luego Enforce HTTPS.
6. Despertador: agregar https://<servidor>/api/ping al flujo "Despertar servidores" (GitHub Actions, repo patentes).
7. Bold: planes en $PLANES + bold-app-familia-salud.php; PAGOS_BOLD=1; pago real de $1.000 con el botón del Superadministrador (Pagos y retiros).
8. Superadministrador: crear su contraseña con el enlace; poner precios reales de la Clínica Reina Elizabeth (Sede propia).
9. skynetgenesis.com: agregar la ficha de FamilIA Salud (Fase H).
