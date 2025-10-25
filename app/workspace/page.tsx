"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, FileText, Search } from "lucide-react"
import { WorkspaceHeader } from "@/components/workspace/workspace-header"
import { ProjectCard } from "@/components/workspace/project-card"
import { NewProjectDialog } from "@/components/workspace/new-project-dialog"
import { Input } from "@/components/ui/input"

interface Project {
  id: string
  title: string
  description: string
  createdAt: Date
  slides: any[]
}

export default function WorkspacePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewProject, setShowNewProject] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        if (response.ok) {
          const data = await response.json()
          setProjects(data.projects)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleCreateProject = async (title: string, description: string) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      })

      if (response.ok) {
        const data = await response.json()
        const newProject = {
          id: data.id,
          title,
          description,
          createdAt: new Date(),
          slides: [],
        }
        setProjects([newProject, ...projects])
        setShowNewProject(false)
      }
    } catch (error) {
      console.error("Error creating project:", error)
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <WorkspaceHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Projects</h1>
            <p className="text-muted-foreground">Create and manage your presentations</p>
          </div>
          <Button
            onClick={() => setShowNewProject(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Loading projects...</p>
          </Card>
        ) : filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onDelete={() => handleDeleteProject(project.id)} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{searchQuery ? "No projects found" : "No projects yet"}</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? "Try a different search term" : "Create your first presentation to get started"}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setShowNewProject(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Create Project
              </Button>
            )}
          </Card>
        )}
      </main>

      <NewProjectDialog open={showNewProject} onOpenChange={setShowNewProject} onCreateProject={handleCreateProject} />
    </div>
  )
}
