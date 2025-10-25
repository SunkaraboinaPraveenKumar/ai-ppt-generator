"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check } from "lucide-react"

interface DesignStyleSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentStyle: string
  onStyleChange: (style: string) => void
}

const DESIGN_STYLES = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean, corporate design with blue accents",
    preview: "bg-gradient-to-br from-blue-50 to-blue-100",
  },
  {
    id: "modern-gradient",
    name: "Modern Gradient",
    description: "Contemporary design with vibrant gradients",
    preview: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Minimalist design with maximum clarity",
    preview: "bg-gradient-to-br from-gray-50 to-gray-100",
  },
  {
    id: "dark-mode",
    name: "Dark Mode",
    description: "Dark theme with neon accents",
    preview: "bg-gradient-to-br from-gray-900 to-black",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design with creative flair",
    preview: "bg-gradient-to-br from-orange-400 to-red-500",
  },
  {
    id: "tech",
    name: "Tech",
    description: "Futuristic tech-focused design",
    preview: "bg-gradient-to-br from-cyan-400 to-blue-600",
  },
]

export function DesignStyleSelector({ open, onOpenChange, currentStyle, onStyleChange }: DesignStyleSelectorProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Choose Design Style</DialogTitle>
          <DialogDescription>Select a design style for your presentation</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {DESIGN_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => {
                onStyleChange(style.id)
                onOpenChange(false)
              }}
              className="group relative overflow-hidden rounded-lg border-2 transition-all hover:border-primary"
            >
              <div className={`${style.preview} h-32 w-full`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

              {currentStyle === style.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="rounded-full bg-primary p-2">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}

              <div className="p-3">
                <h4 className="font-semibold text-sm">{style.name}</h4>
                <p className="text-xs text-muted-foreground">{style.description}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
