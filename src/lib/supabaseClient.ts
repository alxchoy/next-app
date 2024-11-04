import { createClient } from "@supabase/supabase-js";

const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  key: process.env.NEXT_PUBLIC_SUPABASE_KEY || "",
};

export const supabaseClient = createClient(
  supabaseConfig.url,
  supabaseConfig.key
);
