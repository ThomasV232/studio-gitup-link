import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let supabase: SupabaseClient | null = null;

const isBrowser = typeof window !== "undefined";

export const getSupabaseClient = () => {
  if (!supabase) {
    if (!isSupabaseConfigured) {
      if (import.meta.env.DEV) {
        console.warn(
          "Supabase credentials are missing. Provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable authentication.",
        );
      }
      return null;
    }

    supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: "studio-vbg-auth",
        storage: isBrowser ? window.localStorage : undefined,
      },
      global: {
        fetch: async (input, init) => {
          return fetch(input, {
            ...init,
            credentials: "include",
          });
        },
      },
    });
  }

  return supabase;
};
