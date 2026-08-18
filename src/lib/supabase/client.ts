import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Indica si las credenciales de Supabase están configuradas en este
 * entorno. Úsalo para mostrar mensajes claros en vez de fallos silenciosos
 * cuando alguien corre la app sin haber configurado su propio proyecto.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured && typeof window !== "undefined") {
  // Solo advertir en el navegador para no ensuciar los logs de build/SSR.
  console.warn(
    "[MedVibe] Supabase no está configurado. Define NEXT_PUBLIC_SUPABASE_URL y " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY (ver SUPABASE_SETUP.md) para habilitar cuentas " +
      "de usuario y progreso en la nube. Mientras tanto, la app sigue funcionando " +
      "en modo invitado con progreso guardado solo en este navegador."
  );
}

/**
 * Cliente único de Supabase para el navegador. Si las credenciales no están
 * configuradas, se crea con valores de relleno para que la app no truene al
 * cargar: cualquier llamada real a auth/DB fallará de forma controlada (se
 * captura en los hooks de progreso, que caen de vuelta a localStorage).
 */
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "public-anon-key-placeholder",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
