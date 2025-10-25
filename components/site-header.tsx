import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { ThemeToggle } from "./ui/theme-toggle" 
import { auth } from "@clerk/nextjs/server"
import { SiteNav } from "./site-nav"

export default async function SiteHeader() {
  const { userId } = await auth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">SlideAI</span>
          </Link>
        </div>
        <SiteNav />
        <div className="flex items-center gap-3">
          {userId ? (
            <>
              <Link href="/workspace">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  Dashboard
                </Button>
              </Link>
              <ThemeToggle />
              <UserButton />
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  Get Started
                </Button>
              </Link>
              <ThemeToggle />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
