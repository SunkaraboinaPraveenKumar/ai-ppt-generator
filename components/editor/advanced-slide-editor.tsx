"use client"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles, Copy } from "lucide-react"
import { useState } from "react"

interface Slide {
  id: string
  title: string
  content: string
  notes: string
}

interface AdvancedSlideEditorProps {
  slide: Slide
  onUpdateSlide: (updates: Partial<Slide>) => void
  onGenerateWithAI?: () => void
  designStyle?: string
}

const DESIGN_STYLES: Record<string, { bg: string; titleColor: string; contentColor: string }> = {
  professional: {
    bg: "bg-gradient-to-br from-blue-50 to-blue-100",
    titleColor: "text-blue-900",
    contentColor: "text-blue-700",
  },
  "modern-gradient": {
    bg: "bg-gradient-to-br from-purple-500 to-pink-500",
    titleColor: "text-white",
    contentColor: "text-white/90",
  },
  minimal: {
    bg: "bg-gradient-to-br from-gray-50 to-gray-100",
    titleColor: "text-gray-900",
    contentColor: "text-gray-700",
  },
  "dark-mode": {
    bg: "bg-gradient-to-br from-gray-900 to-black",
    titleColor: "text-cyan-400",
    contentColor: "text-gray-300",
  },
  creative: {
    bg: "bg-gradient-to-br from-orange-400 to-red-500",
    titleColor: "text-white",
    contentColor: "text-white/90",
  },
  tech: {
    bg: "bg-gradient-to-br from-cyan-400 to-blue-600",
    titleColor: "text-white",
    contentColor: "text-white/90",
  },
}

export function AdvancedSlideEditor({
  slide,
  onUpdateSlide,
  onGenerateWithAI,
  designStyle = "professional",
}: AdvancedSlideEditorProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const style = DESIGN_STYLES[designStyle] || DESIGN_STYLES.professional

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Slide Preview with Design Style */}
      <div className={`flex-1 p-8 overflow-auto ${style.bg}`}>
        <div className="max-w-2xl mx-auto rounded-lg shadow-lg p-12 min-h-96 flex flex-col justify-center">
          <h1 className={`text-4xl font-bold ${style.titleColor} mb-6`}>{slide.title}</h1>
          <p className={`text-lg ${style.contentColor} whitespace-pre-wrap`}>{slide.content}</p>
        </div>
      </div>

      {/* Advanced Editor Panel */}
      <div className="border-t border-border bg-card/50 p-6 max-h-80 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Slide Title</label>
              <button
                onClick={() => handleCopy(slide.title, "title")}
                className="text-xs text-muted-foreground hover:text-foreground transition"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <Input
              value={slide.title}
              onChange={(e) => onUpdateSlide({ title: e.target.value })}
              placeholder="Enter slide title"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Content</label>
              <button
                onClick={() => handleCopy(slide.content, "content")}
                className="text-xs text-muted-foreground hover:text-foreground transition"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <Textarea
              value={slide.content}
              onChange={(e) => onUpdateSlide({ content: e.target.value })}
              placeholder="Enter slide content"
              rows={2}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Speaker Notes</label>
              <button
                onClick={() => handleCopy(slide.notes, "notes")}
                className="text-xs text-muted-foreground hover:text-foreground transition"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <Textarea
              value={slide.notes}
              onChange={(e) => onUpdateSlide({ notes: e.target.value })}
              placeholder="Add speaker notes"
              rows={2}
            />
          </div>

          {onGenerateWithAI && (
            <Button onClick={onGenerateWithAI} variant="outline" className="w-full bg-transparent">
              <Sparkles className="w-4 h-4 mr-2" />
              Improve with AI
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
