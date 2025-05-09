"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import type { Session, User } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"

type UserProfile = Database["public"]["Tables"]["users"]["Row"]

type AuthContextType = {
  session: Session | null
  user: User | null
  profile: UserProfile | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any | null }>
  signUp: (
    email: string,
    password: string,
    role: "landlord" | "tenant",
    nickname: string,
  ) => Promise<{ error: any | null; data: any | null }>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<Omit<UserProfile, "id" | "email" | "created_at">>) => Promise<{ error: any | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()
    if (error) {
      console.error("Error fetching user profile:", error)
      return null
    }
    return data
  }

  const handleSessionChange = async (session: Session | null) => {
    setSession(session)
    setUser(session?.user ?? null)

    if (session?.user) {
      const userProfile = await getUserProfile(session.user.id)
      setProfile(userProfile)
    } else {
      setProfile(null)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    const initSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        await handleSessionChange(session)
      } catch (error) {
        console.error("Error initializing session:", error)
        setIsLoading(false)
      }
    }

    initSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSessionChange(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return { error }
    } catch (error) {
      console.error("Error signing in:", error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string, role: "landlord" | "tenant", nickname: string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })
      if (authError || !authData.user) return { data: null, error: authError }

      const { error: profileError } = await supabase.from("users").insert({
        id: authData.user.id,
        email,
        role,
        nickname,
      })

      if (profileError) {
        console.error("Failed to create user profile:", profileError)
        return { data: null, error: profileError }
      }

      return { data: authData, error: null }
    } catch (error) {
      console.error("Error signing up:", error)
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Error signing out:", error)
        return
      }

      setSession(null)
      setUser(null)
      setProfile(null)
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const updateProfile = async (data: Partial<Omit<UserProfile, "id" | "email" | "created_at">>) => {
    try {
      if (!user) return { error: new Error("No user logged in") }

      const { error } = await supabase.from("users").update(data).eq("id", user.id)
      if (!error && profile) {
        setProfile({ ...profile, ...data })
      }
      return { error }
    } catch (error) {
      console.error("Error updating profile:", error)
      return { error }
    }
  }

  const value: AuthContextType = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
