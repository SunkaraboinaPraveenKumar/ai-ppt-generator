"use client"
import { UserButton, useUser } from "@clerk/nextjs"
import { Sparkles, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "../ui/button"

export function WorkspaceHeader() {
  const { user } = useUser()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Only render Clerk's UserButton after client mount to avoid SSR/CSR markup mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">SlideAI</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Welcome, {user?.fullName}</span>
          {/* Theme toggle (only show after mount to avoid SSR mismatch) */}
          {mounted && (
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md hover:bg-card/50 cursor-pointer"
            >
              {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          {mounted ? <UserButton afterSignOutUrl="/" /> : <div aria-hidden className="w-10 h-8" />}
        </div>
      </div>
    </header>
  )
}
