"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SiteNav() {
  const pathname = usePathname()

  // hide Features/Pricing/FAQ when on /pricing; otherwise show them
  const hideLinks = pathname === "/pricing"

  if (hideLinks) return null

  return (
    <div className="hidden md:flex items-center gap-8">
      <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
        Features
      </a>
      <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
        Pricing
      </Link>
      <Link href="/faqs" className="text-sm text-muted-foreground hover:text-foreground transition">
        FAQ
      </Link>
    </div>
  )
}
