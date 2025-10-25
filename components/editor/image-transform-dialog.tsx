"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Loader2, ImageIcon } from "lucide-react"
import { buildImageKitUrl } from "@/lib/imagekit"

interface ImageTransformDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTransform: (imageUrl: string, transformation: string) => void
}

const TRANSFORMATIONS = [
  { id: "remove-bg", label: "Remove Background", description: "Remove the background from the image" },
  { id: "smart-crop", label: "Smart Crop", description: "Automatically crop to focus on subject" },
  { id: "enhance", label: "Enhance", description: "Improve image quality and colors" },
  { id: "blur-bg", label: "Blur Background", description: "Blur the background while keeping subject sharp" },
]

export function ImageTransformDialog({ open, onOpenChange, onTransform }: ImageTransformDialogProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [selectedTransform, setSelectedTransform] = useState("remove-bg")
  const [isTransforming, setIsTransforming] = useState(false)
  const [preview, setPreview] = useState("")

  const handleTransform = async () => {
    if (!imageUrl) return

    setIsTransforming(true)
    try {
      const transformedUrl = buildImageKitUrl(imageUrl, {
        transformation: selectedTransform,
        quality: 90,
      })

      setPreview(transformedUrl)

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onTransform(transformedUrl, selectedTransform)
      setImageUrl("")
      setPreview("")
      onOpenChange(false)
    } finally {
      setIsTransforming(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transform Image</DialogTitle>
          <DialogDescription>Apply AI transformations to your images using ImageKit</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Image URL</label>
            <Input placeholder="Enter image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>

          {preview && (
            <div className="border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-2">Preview:</p>
              <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full rounded max-h-40 object-cover" />
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 block">Transformation</label>
            <div className="space-y-2">
              {TRANSFORMATIONS.map((transform) => (
                <button
                  key={transform.id}
                  onClick={() => setSelectedTransform(transform.id)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    selectedTransform === transform.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <h4 className="font-semibold text-sm">{transform.label}</h4>
                  <p className="text-xs text-muted-foreground">{transform.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isTransforming}>
              Cancel
            </Button>
            <Button
              onClick={handleTransform}
              disabled={!imageUrl || isTransforming}
              className="bg-primary hover:bg-primary/90"
            >
              {isTransforming ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Transforming...
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Transform
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
