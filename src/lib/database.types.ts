/**
 * Bad Decision AI — Supabase Database Types
 * Minimal type definitions for the Supabase client.
 * In production, generate full types with: npx supabase gen types typescript --project-id <id>
 */

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          tier: string
          device_fingerprint: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          tier?: string
          device_fingerprint?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          tier?: string
          device_fingerprint?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      usage_ledger: {
        Row: {
          user_id: string
          coins_balance: number
          coins_reserved: number
          coins_lifetime: number
          updated_at: string
        }
        Insert: {
          user_id: string
          coins_balance?: number
          coins_reserved?: number
          coins_lifetime?: number
          updated_at?: string
        }
        Update: {
          user_id?: string
          coins_balance?: number
          coins_reserved?: number
          coins_lifetime?: number
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          task_type: string
          query: string
          status: string
          coins_reserved: number
          result_count: number | null
          results: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          task_type: string
          query: string
          status?: string
          coins_reserved?: number
          result_count?: number | null
          results?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          task_type?: string
          query?: string
          status?: string
          coins_reserved?: number
          result_count?: number | null
          results?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      smart_collections: {
        Row: {
          id: string
          user_id: string
          name: string
          task_type: string
          filters: any | null
          lead_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          task_type: string
          filters?: any | null
          lead_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          task_type?: string
          filters?: any | null
          lead_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      global_intelligence_cache: {
        Row: {
          domain_hash: string
          company_name: string | null
          website_url: string | null
          dm_name: string | null
          dm_position: string | null
          verified_email: string | null
          is_catchall: boolean | null
          linkedin: string | null
          instagram: string | null
          phone: string | null
          ad_platform: string | null
          address: string | null
          aggregator_source: string | null
          aggregator_url: string | null
          platform: string | null
          intent_text: string | null
          last_verified_at: string | null
          verification_gate: string | null
          created_at: string
        }
        Insert: {
          domain_hash: string
          company_name?: string | null
          website_url?: string | null
          dm_name?: string | null
          dm_position?: string | null
          verified_email?: string | null
          is_catchall?: boolean | null
          linkedin?: string | null
          instagram?: string | null
          phone?: string | null
          ad_platform?: string | null
          address?: string | null
          aggregator_source?: string | null
          aggregator_url?: string | null
          platform?: string | null
          intent_text?: string | null
          last_verified_at?: string | null
          verification_gate?: string | null
          created_at?: string
        }
        Update: {
          domain_hash?: string
          company_name?: string | null
          website_url?: string | null
          dm_name?: string | null
          dm_position?: string | null
          verified_email?: string | null
          is_catchall?: boolean | null
          linkedin?: string | null
          instagram?: string | null
          phone?: string | null
          ad_platform?: string | null
          address?: string | null
          aggregator_source?: string | null
          aggregator_url?: string | null
          platform?: string | null
          intent_text?: string | null
          last_verified_at?: string | null
          verification_gate?: string | null
          created_at?: string
        }
      }
      workspace_leads: {
        Row: {
          id: string
          user_id: string
          collection_id: string | null
          domain_hash: string
          company_name: string | null
          website_url: string | null
          dm_name: string | null
          dm_position: string | null
          verified_email: string | null
          is_catchall: boolean | null
          linkedin: string | null
          instagram: string | null
          phone: string | null
          ad_platform: string | null
          address: string | null
          aggregator_source: string | null
          aggregator_url: string | null
          platform: string | null
          intent_text: string | null
          notes: string | null
          tags: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          collection_id?: string | null
          domain_hash: string
          company_name?: string | null
          website_url?: string | null
          dm_name?: string | null
          dm_position?: string | null
          verified_email?: string | null
          is_catchall?: boolean | null
          linkedin?: string | null
          instagram?: string | null
          phone?: string | null
          ad_platform?: string | null
          address?: string | null
          aggregator_source?: string | null
          aggregator_url?: string | null
          platform?: string | null
          intent_text?: string | null
          notes?: string | null
          tags?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          collection_id?: string | null
          domain_hash?: string
          company_name?: string | null
          website_url?: string | null
          dm_name?: string | null
          dm_position?: string | null
          verified_email?: string | null
          is_catchall?: boolean | null
          linkedin?: string | null
          instagram?: string | null
          phone?: string | null
          ad_platform?: string | null
          address?: string | null
          aggregator_source?: string | null
          aggregator_url?: string | null
          platform?: string | null
          intent_text?: string | null
          notes?: string | null
          tags?: string[] | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_coins: {
        Args: { p_user_id: string; p_amount: number }
        Returns: undefined
      }
      deduct_coins: {
        Args: { p_user_id: string; p_amount: number }
        Returns: undefined
      }
      get_balance: {
        Args: { p_user_id: string }
        Returns: { coins_balance: number; coins_reserved: number; coins_lifetime: number }
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
