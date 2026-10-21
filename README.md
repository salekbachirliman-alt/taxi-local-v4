# Taxi Local v4

PWA piloto para Elda y Petrer, sin pagos integrados.

## Base de datos
Proyecto Supabase: `canovuwpdvitzgouwxor`.
Tablas `public.rides` y `public.driver_profiles`, con RLS activado.

## Publicación
La aplicación se puede publicar con GitHub Pages. URL esperada:
https://salekbachirliman-alt.github.io/taxi-local-v4/

## Pruebas
1. Envía una reserva como cliente.
2. Crea una cuenta de conductor, confirma el correo si Supabase lo solicita y completa el perfil.
3. El perfil queda en `pending` hasta que se apruebe desde Supabase.
4. Para aprobar en el piloto: Table Editor → `driver_profiles`, cambia el campo `status` del usuario a `approved`.

No añadir claves `service_role` ni secret al frontend. La clave `sb_publishable` es pública; la seguridad depende de RLS.
Antes de producción se recomienda añadir protección anti-spam, privacidad y un procedimiento operativo para gestionar las solicitudes.

## Cuentas de clientes (añadido en la prueba piloto)
- Los clientes pueden crear una cuenta con correo y contraseña, nombre y teléfono.
- El perfil se guarda en `public.customer_profiles`; cada usuario solo puede leer y modificar su propio perfil mediante RLS.
- Las reservas de clientes registrados incluyen `customer_user_id`; cada cliente puede consultar sus propias reservas.
- El modo invitado sigue disponible y recuerda nombre y teléfono en el dispositivo, sin crear cuenta.
- La autenticación por correo depende de la configuración de confirmación y entrega de correos de Supabase Auth. Si la confirmación está activa, el cliente debe confirmar el correo antes de iniciar sesión.


### Acceso de clientes por teléfono
- El registro y el inicio de sesión de clientes usan número de teléfono internacional y contraseña, sin solicitar correo electrónico.
- La Edge Function `customer-auth` crea y autentica la cuenta con un identificador interno de Supabase; ese correo interno no se muestra ni se pide al cliente.
- Para el piloto no se envía SMS de verificación: el número de teléfono no queda verificado como propiedad del usuario. No usar como prueba de titularidad hasta añadir verificación OTP.
