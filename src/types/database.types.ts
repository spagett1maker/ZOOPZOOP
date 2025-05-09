export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: "landlord" | "tenant"
          nickname: string
          profile_image_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          role: "landlord" | "tenant"
          nickname: string
          profile_image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: "landlord" | "tenant"
          nickname?: string
          profile_image_url?: string | null
          created_at?: string
        }
      }
    }
  }
}
