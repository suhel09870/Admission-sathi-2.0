
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const fallbackData = {
  colleges: [],
  programs: [],
  scholarships: [],
  important_dates: [],
};

function createUnavailableClient() {
  const clone = (value) => JSON.parse(JSON.stringify(value));

  const createQuery = (table) => {
    const filters = [];
    let operation = "select";
    let payload;
    let sortBy;

    const matches = (row) => filters.every((filter) => filter(row));

    const execute = (single = false) => {
      let rows = clone(fallbackData[table] || []);

      if (operation === "select") {
        rows = rows.filter(matches);
      } else if (operation === "insert" || operation === "upsert") {
        const inserted = (Array.isArray(payload) ? payload : [payload]).map(
          (item) => ({
            id: item.id ?? Date.now(),
            ...item,
          })
        );
        rows = inserted;
      } else if (operation === "update") {
        rows = rows.filter(matches).map((row) => ({ ...row, ...payload }));
      } else if (operation === "delete") {
        rows = rows.filter(matches);
      }

      if (sortBy) {
        const { column, ascending, nullsFirst } = sortBy;

        rows.sort((left, right) => {
          const leftValue = left[column];
          const rightValue = right[column];

          if (leftValue == null || rightValue == null) {
            if (leftValue == null && rightValue == null) return 0;
            return leftValue == null === nullsFirst ? -1 : 1;
          }

          const comparison = String(leftValue).localeCompare(
            String(rightValue),
            undefined,
            { numeric: true }
          );

          return ascending ? comparison : -comparison;
        });
      }

      if (single) {
        return Promise.resolve({
          data: rows[0] || null,
          error: null,
        });
      }

      return Promise.resolve({
        data: rows,
        error: null,
      });
    };

    const query = {
      select: () => query,

      insert: (value) => {
        operation = "insert";
        payload = value;
        return query;
      },

      update: (value) => {
        operation = "update";
        payload = value;
        return query;
      },

      upsert: (value) => {
        operation = "upsert";
        payload = value;
        return query;
      },

      delete: () => {
        operation = "delete";
        return query;
      },

      eq: (column, value) => {
        filters.push(
          (row) => String(row[column]) === String(value)
        );
        return query;
      },

      in: (column, values) => {
        filters.push(
          (row) =>
            values.some(
              (value) => String(row[column]) === String(value)
            )
        );
        return query;
      },

      order: (column, options = {}) => {
        sortBy = {
          column,
          ascending: options.ascending !== false,
          nullsFirst: options.nullsFirst === true,
        };
        return query;
      },

      maybeSingle: () => execute(true),
      single: () => execute(true),

      then: (resolve, reject) => execute().then(resolve, reject),
    };

    return query;
  };

  const authUnavailable = async () => ({
    data: null,
    error: new Error("Authentication requires Supabase configuration."),
  });

  return {
    from: createQuery,

    auth: {
      getSession: async () => ({
        data: { session: null },
        error: null,
      }),

      getUser: async () => ({
        data: { user: null },
        error: null,
      }),

      onAuthStateChange: () => ({
        data: {
          subscription: {
            unsubscribe() {},
          },
        },
        error: null,
      }),

      signInWithPassword: authUnavailable,
      signUp: authUnavailable,
      signOut: authUnavailable,
      updateUser: authUnavailable,
      resetPasswordForEmail: authUnavailable,
    },
  };
}

let supabase;
export let isSupabaseConfigured = false;

if (supabaseUrl?.trim() && supabaseAnonKey?.trim()) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    isSupabaseConfigured = true;
  } catch {
    supabase = createUnavailableClient();
  }
} else {
  supabase = createUnavailableClient();
}

export { supabase };
