import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl) {
  console.warn("Supabase URL is not configured. Please add NEXT_PUBLIC_SUPABASE_URL to your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
