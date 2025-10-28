"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText, Download, Loader2 } from "lucide-react"

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectTitle: string
  slideCount: number
  slides?: Array<{ title: string; content: string; notes?: string }>
}

export function ExportDialog({ open, onOpenChange, projectTitle, slideCount, slides }: ExportDialogProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<"pdf" | "pptx">("pdf")

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Always use server-side export for both PDF and PPTX
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          projectId: 'current-project', 
          format: exportFormat, 
          slides: slides ?? [], 
          title: projectTitle 
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Export failed')
      }

      // Handle binary download for both formats
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${projectTitle || 'presentation'}.${exportFormat}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      onOpenChange(false)
    } catch (error) {
      console.error('Export failed:', error)
      alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Presentation</DialogTitle>
          <DialogDescription>Choose your preferred format and download your presentation</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-3">
            {[
              { format: "pdf" as const, label: "PDF", description: "Best for sharing and printing" },
              { format: "pptx" as const, label: "PowerPoint", description: "Edit in Microsoft Office" },
            ].map((option) => (
              <button
                key={option.format}
                onClick={() => setExportFormat(option.format)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  exportFormat === option.format
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{option.label}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-card/50 p-4 rounded-lg text-sm">
            <p className="text-muted-foreground">
              <strong>Slides:</strong> {slideCount}
            </p>
            <p className="text-muted-foreground">
              <strong>Format:</strong> {exportFormat === "pdf" ? "PDF" : "PowerPoint"}
            </p>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isExporting}>
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}