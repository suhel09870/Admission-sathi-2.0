import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function createUnavailableClient() {
  const unavailableError = new Error(
    "Supabase is unavailable. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable backend features."
  );

  const createQuery = () => {
    let isMutation = false;
    const query = {
      select: () => query,
      insert: () => {
        isMutation = true;
        return query;
      },
      update: () => {
        isMutation = true;
        return query;
      },
      upsert: () => {
        isMutation = true;
        return query;
      },
      delete: () => {
        isMutation = true;
        return query;
      },
      eq: () => query,
      in: () => query,
      order: () => query,
      maybeSingle: async () => ({ data: null, error: unavailableError }),
      single: async () => ({ data: null, error: unavailableError }),
      then: (resolve, reject) => Promise.resolve({
        data: isMutation ? null : [],
        error: unavailableError,
      }).then(resolve, reject),
    };

    return query;
  };

  const failedAuthResult = async () => ({
    data: null,
    error: unavailableError,
  });

  return {
    from: createQuery,
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe() {} } },
        error: null,
      }),
      signInWithPassword: failedAuthResult,
      signUp: failedAuthResult,
      signOut: failedAuthResult,
      updateUser: failedAuthResult,
      resetPasswordForEmail: failedAuthResult,
    },
  };
}

let supabase;

if (supabaseUrl?.trim() && supabaseAnonKey?.trim()) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch {
    supabase = createUnavailableClient();
  }
} else {
  supabase = createUnavailableClient();
}

export { supabase };