import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const fallbackData = {
  colleges: [
    {
      id: 1001,
      name: "Sample Institute of Technology",
      city: "New Delhi",
      state: "Delhi",
      category: "Engineering",
      institution_type: "Institute of Technology",
      ownership: "Public",
      affiliation: "Autonomous",
      established_year: 2008,
      address: "New Delhi, India",
      official_website: "https://example.org/",
      course: "Engineering",
    },
    {
      id: 1002,
      name: "Sample National College",
      city: "Mumbai",
      state: "Maharashtra",
      category: "Science",
      institution_type: "Degree College",
      ownership: "Public",
      affiliation: "State University",
      established_year: 1998,
      address: "Mumbai, Maharashtra, India",
      official_website: "https://example.org/",
      course: "Science",
    },
    {
      id: 1003,
      name: "Sample Business School",
      city: "Bengaluru",
      state: "Karnataka",
      category: "Management",
      institution_type: "Business School",
      ownership: "Private",
      affiliation: "Autonomous",
      established_year: 2012,
      address: "Bengaluru, Karnataka, India",
      official_website: "https://example.org/",
      course: "Management",
    },
  ],
  programs: [
    {
      id: 2001,
      college_id: 1001,
      program_name: "B.Tech Computer Science",
      duration: "4 years",
      fees: "Sample fees vary by program",
      eligibility: "12th grade with required subjects",
      admission_status: "Check official site",
      application_url: "https://example.org/",
      academic_data_verified_at: null,
      source_url: "https://example.org/",
    },
    {
      id: 2002,
      college_id: 1002,
      program_name: "B.Sc Computer Science",
      duration: "3 years",
      fees: "Sample fees vary by program",
      eligibility: "12th grade with required subjects",
      admission_status: "Check official site",
      application_url: "https://example.org/",
      academic_data_verified_at: null,
      source_url: "https://example.org/",
    },
    {
      id: 2003,
      college_id: 1003,
      program_name: "MBA",
      duration: "2 years",
      fees: "Sample fees vary by program",
      eligibility: "Bachelor's degree",
      admission_status: "Check official site",
      application_url: "https://example.org/",
      academic_data_verified_at: null,
      source_url: "https://example.org/",
    },
  ],
  scholarships: [
    {
      id: 3001,
      title: "Sample Higher Education Scholarship",
      provider: "Sample Education Foundation",
      description: "Demonstration scholarship record for local preview.",
      eligibility: "Eligibility requirements vary by program.",
      amount: "Sample award amount",
      application_deadline: "2027-06-30",
      application_url: "https://example.org/",
      source_url: "https://example.org/",
      verification_status: "sample",
    },
  ],
  important_dates: [
    {
      id: 4001,
      college_id: 1001,
      title: "Sample application window",
      date: "2027-06-01",
      description: "Demonstration date. Confirm deadlines with the institution.",
      source_url: "https://example.org/",
      verification_status: "sample",
      colleges: {
        id: 1001,
        name: "Sample Institute of Technology",
        city: "New Delhi",
        state: "Delhi",
        institution_type: "Institute of Technology",
        ownership: "Public",
      },
    },
  ],
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
        const inserted = (Array.isArray(payload) ? payload : [payload]).map((item) => ({
          id: item.id ?? Date.now(),
          ...item,
        }));
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
          const comparison = String(leftValue).localeCompare(String(rightValue), undefined, { numeric: true });
          return ascending ? comparison : -comparison;
        });
      }

      if (single) {
        return Promise.resolve({ data: rows[0] || null, error: null });
      }

      return Promise.resolve({ data: rows, error: null });
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
        filters.push((row) => String(row[column]) === String(value));
        return query;
      },
      in: (column, values) => {
        filters.push((row) => values.some((value) => String(row[column]) === String(value)));
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
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe() {} } },
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