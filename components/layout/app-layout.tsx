"use client"

import type { ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Sidebar } from "./sidebar"

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn")
    if (!isLoggedIn && pathname !== "/login") {
      router.push("/login")
    }
  }, [pathname, router])

  const isLoginPage = pathname === "/login"

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
