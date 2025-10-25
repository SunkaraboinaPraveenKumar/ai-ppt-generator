"use client"

import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Diamond, Gem, IndianRupee, Wallet } from "lucide-react"

export default function CreditsDisplay({ userId }: { userId?: string }) {
  const [credits, setCredits] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    let mounted = true
    setLoading(true)
    ;(async () => {
      try {
        const ref = doc(db, "users", userId)
        const snap = await getDoc(ref)
        if (!mounted) return
        if (!snap.exists()) {
          setCredits(0)
        } else {
          const data = snap.data()
          setCredits(Number(data?.credits ?? 0))
        }
      } catch (err: any) {
        setError(err?.message ?? "Failed to load credits")
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [userId])

  if (!userId) return <span className="text-sm text-muted-foreground">—</span>
  if (loading) return <span className="text-sm text-muted-foreground">Loading…</span>
  if (error) return <span className="text-sm text-destructive">Err</span>
  return (
    <div className="flex items-center justify-between bg-primary p-1 rounded-md gap-1">
        <Gem className="h-5 w-5"/>
        <span className="text-md text-foreground">{credits}</span>
    </div>
  )
}
