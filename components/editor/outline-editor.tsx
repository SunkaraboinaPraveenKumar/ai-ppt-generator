"use client"

import { Button } from "@/components/ui/button"
import { Plus, Trash2, GripVertical } from "lucide-react"

interface Slide {
  id: string
  title: string
  content: string
  notes: string
}

interface OutlineEditorProps {
  slides: Slide[]
  selectedSlideId: string
  onSelectSlide: (id: string) => void
  onAddSlide: () => void
  onDeleteSlide: (id: string) => void
}

export function OutlineEditor({
  slides,
  selectedSlideId,
  onSelectSlide,
  onAddSlide,
  onDeleteSlide,
}: OutlineEditorProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold mb-3">Slides</h2>
        <Button onClick={onAddSlide} size="sm" className="w-full bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Slide
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-2">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              onClick={() => onSelectSlide(slide.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                selectedSlideId === slide.id
                  ? "bg-primary/10 border border-primary"
                  : "bg-background border border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-muted-foreground mb-1">Slide {index + 1}</div>
                  <h3 className="text-sm font-medium truncate">{slide.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{slide.content}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteSlide(slide.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-destructive hover:text-destructive/80" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
