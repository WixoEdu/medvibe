"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: "user" | "admin";
  created_at: string;
}

interface AuthContextValue {
  /** Usuario autenticado, o null si navega como invitado. */
  user: User | null;
  /** Perfil (nombre, rol) del usuario autenticado, o null si aún no carga o no hay sesión. */
  profile: Profile | null;
  /** true mientras se resuelve la sesión inicial (evita parpadeos en la UI). */
  loading: boolean;
  /** true si este despliegue tiene Supabase configurado (ver .env.example). */
  authAvailable: boolean;
  /** true solo si el perfil ya cargó y su role es 'admin'. */
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  loading: true,
  authAvailable: false,
  isAdmin: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Sin credenciales configuradas: la app funciona en modo invitado.
      // Se difiere con setTimeout para no despachar setState de forma
      // síncrona dentro del cuerpo del efecto.
      const t0 = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(t0);
    }

    let active = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setLoading(false);

      // Solo se registra en un inicio de sesión real (no en cada refresco
      // silencioso de token), para que "frecuencia de conexión" refleje
      // sesiones reales y no ruido técnico.
      if (event === "SIGNED_IN" && session?.user) {
        supabase
          .from("login_events")
          .insert({ user_id: session.user.id })
          .then(({ error }) => {
            if (error) console.error("[MedVibe] No se pudo registrar el inicio de sesión:", error.message);
          });
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      const t0 = setTimeout(() => setProfile(null), 0);
      return () => clearTimeout(t0);
    }
    let cancelled = false;
    supabase
      .from("profiles")
      .select("id, email, full_name, role, created_at")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("[MedVibe] No se pudo cargar el perfil:", error.message);
          setProfile(null);
          return;
        }
        setProfile(data as Profile | null);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  async function signOut() {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  }

  const isAdmin = profile?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, profile, loading, authAvailable: isSupabaseConfigured, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
