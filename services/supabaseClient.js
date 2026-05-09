import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate URL before creating client to avoid build errors
let supabase;
try {
  if (supabaseUrl && supabaseUrl !== 'your_supabase_url_here') {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    // Provide a dummy client for build time / missing config
    supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
  }
} catch {
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
}

export { supabase };