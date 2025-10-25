"use client"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface Slide {
  id: string
  title: string
  content: string
  notes: string
}

interface SlidePreviewProps {
  slide: Slide
  onUpdateSlide: (updates: Partial<Slide>) => void
}

export function SlidePreview({ slide, onUpdateSlide }: SlidePreviewProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Slide Preview */}
      <div className="flex-1 p-8 overflow-auto bg-gradient-to-br from-card to-background/50">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-12 min-h-96 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-foreground mb-6">{slide.title}</h1>
          <p className="text-lg text-muted-foreground whitespace-pre-wrap">{slide.content}</p>
        </div>
      </div>

      {/* Editor Panel */}
      <div className="border-t border-border bg-card/50 p-6 max-h-64 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Slide Title</label>
            <Input
              value={slide.title}
              onChange={(e) => onUpdateSlide({ title: e.target.value })}
              placeholder="Enter slide title"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Content</label>
            <Textarea
              value={slide.content}
              onChange={(e) => onUpdateSlide({ content: e.target.value })}
              placeholder="Enter slide content"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Speaker Notes</label>
            <Textarea
              value={slide.notes}
              onChange={(e) => onUpdateSlide({ notes: e.target.value })}
              placeholder="Add speaker notes"
              rows={2}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
