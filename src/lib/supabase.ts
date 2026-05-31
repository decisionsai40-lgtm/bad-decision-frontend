/**
 * Supabase client for the Next.js frontend.
 * Lazy-initialized to prevent build-time crashes when env vars are missing.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

/**
 * Get the Supabase client (anon key, respects RLS).
 * Lazy-initialized so it doesn't crash at build time.
 */
export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      // Return a dummy client during build time
      _supabase = createClient('https://placeholder.supabase.co', 'placeholder-key')
    } else {
      _supabase = createClient(url, key)
    }
  }
  return _supabase
}

/**
 * Create a Supabase client with service role key (bypasses RLS).
 * ONLY use this in server-side API routes — never in client components.
 * Throws at request time if env vars are missing.
 */
export function createServerClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your Vercel project settings.'
    )
  }

  return createClient(url, key)
}

// Legacy export for backward compatibility (lazy)
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as any)[prop]
  },
})
