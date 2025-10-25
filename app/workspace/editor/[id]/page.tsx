"use client"

import React, { useState, useEffect } from "react"
import { AdvancedSlideEditor } from "@/components/editor/advanced-slide-editor"
import { EditorHeader } from "@/components/editor/editor-header"
import { OutlineEditor } from "@/components/editor/outline-editor"
import { AIGenerationDialog } from "@/components/editor/ai-generation-dialog"
import { DesignStyleSelector } from "@/components/editor/design-style-selector"
import { FloatingActionTool } from "@/components/editor/floating-action-tool"
import { ImageTransformDialog } from "@/components/editor/image-transform-dialog"

interface Slide {
  id: string
  title: string
  content: string
  notes: string
}

export default function EditorPage(props: { params: any }) {
  // In Next 14+, `params` can be a promise in client components and must be
  // unwrapped with `React.use()` before accessing properties. See Next.js
  // migration notes. Use React.use when available, otherwise fall back to the
  // passed value for compatibility.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: { id: string } = (React as any).use ? (React as any).use(props.params) : props.params
  const [slides, setSlides] = useState<Slide[]>([])
  const [projectTitle, setProjectTitle] = useState("")
  const [selectedSlideId, setSelectedSlideId] = useState("")
  const [showAIDialog, setShowAIDialog] = useState(false)
  const [showDesignSelector, setShowDesignSelector] = useState(false)
  const [showImageTransform, setShowImageTransform] = useState(false)
  const [designStyle, setDesignStyle] = useState("professional")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`)
        if (response.ok) {
          const project = await response.json()
          setProjectTitle(project.title)
          setSlides(project.slides || [])
          setDesignStyle(project.designStyle || "professional")
          if (project.slides?.length > 0) {
            setSelectedSlideId(project.slides[0].id)
          }
        }
      } catch (error) {
        console.error("Error fetching project:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  const saveProject = async (updatedSlides: Slide[], updatedTitle: string, style?: string) => {
    try {
      await fetch(`/api/projects/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updatedTitle,
          slides: updatedSlides,
          numberOfSlides: updatedSlides.length,
          designStyle: style || designStyle,
        }),
      })
    } catch (error) {
      console.error("Error saving project:", error)
    }
  }

  const selectedSlide = slides.find((s) => s.id === selectedSlideId)

  const handleUpdateSlide = (id: string, updates: Partial<Slide>) => {
    const updatedSlides = slides.map((s) => (s.id === id ? { ...s, ...updates } : s))
    setSlides(updatedSlides)
    saveProject(updatedSlides, projectTitle)
  }

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: "New Slide",
      content: "",
      notes: "",
    }
    const updatedSlides = [...slides, newSlide]
    setSlides(updatedSlides)
    setSelectedSlideId(newSlide.id)
    saveProject(updatedSlides, projectTitle)
  }

  const handleDeleteSlide = (id: string) => {
    const newSlides = slides.filter((s) => s.id !== id)
    setSlides(newSlides)
    if (selectedSlideId === id && newSlides.length > 0) {
      setSelectedSlideId(newSlides[0].id)
    }
    saveProject(newSlides, projectTitle)
  }

  const handleGenerateSlides = (newSlides: Array<{ title: string; content: string; notes: string }>) => {
    const slidesWithIds = newSlides.map((slide) => ({
      ...slide,
      id: Date.now().toString() + Math.random(),
    }))
    const updatedSlides = [...slides, ...slidesWithIds]
    setSlides(updatedSlides)
    if (slidesWithIds.length > 0) {
      setSelectedSlideId(slidesWithIds[0].id)
    }
    saveProject(updatedSlides, projectTitle)
  }

  const handleTitleChange = (newTitle: string) => {
    setProjectTitle(newTitle)
    saveProject(slides, newTitle)
  }

  const handleDesignStyleChange = (style: string) => {
    setDesignStyle(style)
    saveProject(slides, projectTitle, style)
  }

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <EditorHeader
        projectTitle={projectTitle}
        onTitleChange={handleTitleChange}
        slideCount={slides.length}
        onGenerateWithAI={() => setShowAIDialog(true)}
        onDesignStyle={() => setShowDesignSelector(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Outline Panel */}
        <div className="w-80 border-r border-border bg-card/50 overflow-y-auto">
          <OutlineEditor
            slides={slides}
            selectedSlideId={selectedSlideId}
            onSelectSlide={setSelectedSlideId}
            onAddSlide={handleAddSlide}
            onDeleteSlide={handleDeleteSlide}
          />
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedSlide && (
            <AdvancedSlideEditor
              slide={selectedSlide}
              onUpdateSlide={(updates) => handleUpdateSlide(selectedSlide.id, updates)}
              onGenerateWithAI={() => setShowAIDialog(true)}
              designStyle={designStyle}
            />
          )}
        </div>
      </div>

      <AIGenerationDialog open={showAIDialog} onOpenChange={setShowAIDialog} onGenerateSlides={handleGenerateSlides} />
      <DesignStyleSelector
        open={showDesignSelector}
        onOpenChange={setShowDesignSelector}
        currentStyle={designStyle}
        onStyleChange={handleDesignStyleChange}
      />
      <ImageTransformDialog
        open={showImageTransform}
        onOpenChange={setShowImageTransform}
        onTransform={(url, transform) => console.log("Transform:", url, transform)}
      />

      <FloatingActionTool
        onImageTransform={() => setShowImageTransform(true)}
        onImproveContent={() => setShowAIDialog(true)}
        onGenerateImage={() => console.log("Generate image")}
      />
    </div>
  )
}
