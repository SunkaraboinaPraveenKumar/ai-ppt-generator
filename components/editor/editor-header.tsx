"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Save, Download, ArrowLeft, Palette } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ExportDialog } from "./export-dialog"

interface EditorHeaderProps {
  projectTitle: string
  onTitleChange: (title: string) => void
  slideCount?: number
  onGenerateWithAI?: () => void
  onDesignStyle?: () => void
  slides?: Array<any>
}

export function EditorHeader({
  projectTitle,
  onTitleChange,
  slideCount = 0,
  slides,
  onGenerateWithAI,
  onDesignStyle,
}: EditorHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(projectTitle)
  const [showExportDialog, setShowExportDialog] = useState(false)

  const handleSaveTitle = () => {
    onTitleChange(title)
    setIsEditing(false)
  }

  return (
    <>
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/workspace">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>

            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="max-w-xs" autoFocus />
                <Button size="sm" onClick={handleSaveTitle} className="bg-primary hover:bg-primary/90 cursor-pointer">
                  Save
                </Button>
              </div>
            ) : (
              <div onClick={() => setIsEditing(true)} className="cursor-pointer">
                <h1 className="text-xl font-bold hover:text-primary transition-colors">{projectTitle}</h1>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="cursor-pointer">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            {onDesignStyle && (
              <Button variant="outline" size="sm" onClick={onDesignStyle} className="cursor-pointer">
                <Palette className="w-4 h-4 mr-2" />
                Design
              </Button>
            )}
            {onGenerateWithAI && (
              <Button variant="outline" size="sm" onClick={onGenerateWithAI} className="cursor-pointer">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate with AI
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setShowExportDialog(true)} className="cursor-pointer">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <ExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        projectTitle={projectTitle}
        slideCount={slides?.length ?? slideCount}
        slides={slides}
      />
    </>
  )
}
