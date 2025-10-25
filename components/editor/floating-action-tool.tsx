"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wand2, ImageIcon, Sparkles, X } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FloatingActionToolProps {
  onImageTransform?: () => void
  onImproveContent?: () => void
  onGenerateImage?: () => void
}

export function FloatingActionTool({ onImageTransform, onImproveContent, onGenerateImage }: FloatingActionToolProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <TooltipProvider>
      <div className="fixed bottom-8 right-8 z-50">
        {isOpen && (
          <div className="absolute bottom-20 right-0 flex flex-col gap-3 mb-4">
            {onImageTransform && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="lg"
                    className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
                    onClick={() => {
                      onImageTransform()
                      setIsOpen(false)
                    }}
                  >
                    <Wand2 className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Transform Image</TooltipContent>
              </Tooltip>
            )}

            {onGenerateImage && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="lg"
                    className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
                    onClick={() => {
                      onGenerateImage()
                      setIsOpen(false)
                    }}
                  >
                    <ImageIcon className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Generate Image</TooltipContent>
              </Tooltip>
            )}

            {onImproveContent && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="lg"
                    className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
                    onClick={() => {
                      onImproveContent()
                      setIsOpen(false)
                    }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Improve Content</TooltipContent>
              </Tooltip>
            )}
          </div>
        )}

        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Wand2 className="w-5 h-5" />}
        </Button>
      </div>
    </TooltipProvider>
  )
}
