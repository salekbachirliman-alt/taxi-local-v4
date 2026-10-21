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