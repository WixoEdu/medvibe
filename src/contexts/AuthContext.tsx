"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

interface AuthContextValue {
  /** Usuario autenticado, o null si navega como invitado. */
  user: User | null;
  /** true mientras se resuelve la sesión inicial (evita parpadeos en la UI). */
  loading: boolean;
  /** true si este despliegue tiene Supabase configurado (ver .env.example). */
  authAvailable: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  authAvailable: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
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
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ user, loading, authAvailable: isSupabaseConfigured, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
