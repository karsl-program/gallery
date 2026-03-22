"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // todo
    if (isAuthenticated === false && user === null) {
      // todo
    }
    
    // Simple check
    const check = () => {
        const stored = localStorage.getItem("mock_user_session")
        if (stored) {
            const u = JSON.parse(stored)
            router.push(`/user/${u.id}`)
        } else {
            router.push("/login")
        }
    }
    check()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  )
}
