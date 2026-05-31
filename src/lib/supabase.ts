/**
 * Supabase client for the Next.js frontend.
 * Only initializes when environment variables are available.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

function getEnvVar(key: string): string {
  const value = process.env[key]
  if (!value) {
    // During build time, return a placeholder to prevent crashes
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return 'https://placeholder.supabase.co'
    }
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

// Lazy singleton for the anon-key client
let _anonClient: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!_anonClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
    _anonClient = createClient(url, key)
  }
  return _anonClient
}

/**
 * Create a Supabase client with service role key (bypasses RLS).
 * ONLY use this in server-side API routes — never in client components.
 */
export function createServerClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'Missing Supabase env vars. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel Settings > Environment Variables.'
    )
  }

  return createClient(url, key)
}
