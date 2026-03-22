"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Mock checking session
  useEffect(() => {
    const storedUser = localStorage.getItem("mock_user_session")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (email: string) => {
    // Mock login logic
    const newUser = {
      id: "u1",
      email,
      name: email.split("@")[0],
      avatar: "https://github.com/shadcn.png", // Mock avatar
    }
    setUser(newUser)
    localStorage.setItem("mock_user_session", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("mock_user_session")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
