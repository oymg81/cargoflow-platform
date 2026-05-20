import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  console.log("CLIENT - SUPABASE_URL_EXISTS", !!supabaseUrl);
  console.log("CLIENT - SUPABASE_KEY_EXISTS", !!supabaseAnonKey);

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables in client");
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}
