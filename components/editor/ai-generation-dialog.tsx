"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

interface AIGenerationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerateSlides: (slides: Array<{ title: string; content: string; notes: string }>) => void
}

export function AIGenerationDialog({ open, onOpenChange, onGenerateSlides }: AIGenerationDialogProps) {
  const [prompt, setPrompt] = useState("")
  const [slideCount, setSlideCount] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [useStreaming, setUseStreaming] = useState(false)
  const [streamingProgress, setStreamingProgress] = useState("")

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setError("")
    setStreamingProgress("")

    try {
      const response = await fetch("/api/generate-slide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, slideCount, useStreaming }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate slides")
      }

      if (useStreaming && response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let fullText = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6))
                fullText += data.text
                setStreamingProgress(fullText)
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        }

        // Parse final JSON from streamed text
        const jsonMatch = fullText.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const slides = JSON.parse(jsonMatch[0])
          onGenerateSlides(slides)
        }
      } else {
        const data = await response.json()
        onGenerateSlides(data.slides)
      }

      setPrompt("")
      setSlideCount(3)
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
      setStreamingProgress("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Slides with AI</DialogTitle>
          <DialogDescription>
            Describe what you want your slides to contain, and AI will create them for you
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">What should your slides be about?</label>
            <Textarea
              placeholder="e.g., Create 3 slides about the benefits of renewable energy, including solar, wind, and hydro power"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Number of Slides</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                value={slideCount}
                onChange={(e) => setSlideCount(Number.parseInt(e.target.value))}
                disabled={isLoading}
                className="flex-1"
              />
              <span className="text-sm font-semibold w-8 text-center">{slideCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="streaming"
              checked={useStreaming}
              onChange={(e) => setUseStreaming(e.target.checked)}
              disabled={isLoading}
              className="w-4 h-4"
            />
            <label htmlFor="streaming" className="text-sm font-medium cursor-pointer">
              Use streaming (real-time generation)
            </label>
          </div>

          {streamingProgress && (
            <div className="bg-card/50 p-3 rounded text-xs text-muted-foreground max-h-32 overflow-y-auto">
              <p className="font-semibold mb-2">Generating...</p>
              <p className="whitespace-pre-wrap">{streamingProgress}</p>
            </div>
          )}

          {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">{error}</div>}

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Slides"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
