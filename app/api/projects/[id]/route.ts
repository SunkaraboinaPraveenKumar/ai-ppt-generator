import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"

export async function GET(request: Request, { params }: { params: any }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }
    const resolvedParams = await params
    const projectRef = doc(db, "projects", resolvedParams.id)
    const projectSnap = await getDoc(projectRef)

    if (!projectSnap.exists()) {
      return Response.json({ error: "Project not found" }, { status: 404 })
    }

    const projectData = projectSnap.data()
    if (projectData.createdBy !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 403 })
    }

    return Response.json({
      id: projectSnap.id,
      ...projectData,
      createdAt: projectData.createdAt?.toDate(),
      updatedAt: projectData.updatedAt?.toDate(),
    })
  } catch (error) {
    console.error("Error fetching project:", error)
    return Response.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: any }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await request.json()
    const resolvedParams = await params
    const projectRef = doc(db, "projects", resolvedParams.id)
    const projectSnap = await getDoc(projectRef)

    if (!projectSnap.exists()) {
      return Response.json({ error: "Project not found" }, { status: 404 })
    }

    if (projectSnap.data().createdBy !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 403 })
    }

    await updateDoc(projectRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })

    return Response.json({ message: "Project updated" })
  } catch (error) {
    console.error("Error updating project:", error)
    return Response.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: any }) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }
    const resolvedParams = await params
    const projectRef = doc(db, "projects", resolvedParams.id)
    const projectSnap = await getDoc(projectRef)

    if (!projectSnap.exists()) {
      return Response.json({ error: "Project not found" }, { status: 404 })
    }

    if (projectSnap.data().createdBy !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 403 })
    }

    await deleteDoc(projectRef)
    return Response.json({ message: "Project deleted" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return Response.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
