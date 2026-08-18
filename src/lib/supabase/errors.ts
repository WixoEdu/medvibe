/** Traduce los mensajes de error más comunes de Supabase Auth al español. */
export function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Correo o contraseña incorrectos.";
  if (m.includes("email not confirmed")) return "Debes confirmar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.";
  if (m.includes("user already registered") || m.includes("already registered")) return "Ya existe una cuenta con este correo.";
  if (m.includes("password should be at least")) return "La contraseña debe tener al menos 6 caracteres.";
  if (m.includes("unable to validate email") || m.includes("invalid email")) return "El correo ingresado no es válido.";
  if (m.includes("email rate limit") || m.includes("rate limit")) return "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.";
  if (m.includes("failed to fetch") || m.includes("networkerror")) {
    return "No se pudo conectar con el servidor de autenticación. Verifica tu conexión o que la app tenga Supabase configurado (ver SUPABASE_SETUP.md).";
  }
  return message;
}
