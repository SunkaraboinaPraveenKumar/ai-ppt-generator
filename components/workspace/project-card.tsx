"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Trash2, Edit2, Share2 } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    createdAt: Date
    slides: any[]
  }
  onDelete: () => void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  return (
    <Card className="p-6 hover:border-primary/50 transition-colors group cursor-pointer">
      <Link href={`/workspace/editor/${project.id}`}>
        <div className="mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Image
            src={"/power-point.png"}
            alt="Project Icon"
            width={30}
            height={30}
            />
          </div>
          <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>{Array.isArray(project.slides) ? project.slides.length : project.slides} slides</span>
          <span>{formatDistanceToNow(project.createdAt, { addSuffix: true })}</span>
        </div>
      </Link>

      <div className="flex gap-2">
        <Link href={`/workspace/editor/${project.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full bg-transparent cursor-pointer">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </Link>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground cursor-pointer">
          <Share2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault()
            onDelete()
          }}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}
