export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      habits: {
        Row: {
          id: string
          user_id: string | null
          title: string
          category: string | null
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          title: string
          category?: string | null
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string
          category?: string | null
          color?: string | null
          created_at?: string
        }
      }
      habit_logs: {
        Row: {
          id: string
          habit_id: string
          status: boolean
          note: string | null
          logged_date: string
        }
        Insert: {
          id?: string
          habit_id: string
          status?: boolean
          note?: string | null
          logged_date: string
        }
        Update: {
          id?: string
          habit_id?: string
          status?: boolean
          note?: string | null
          logged_date?: string
        }
      }
    }
  }
}
