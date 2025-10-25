import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore"

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projectsRef = collection(db, "projects")
    const q = query(projectsRef, where("createdBy", "==", userId))
    const snapshot = await getDocs(q)

    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    }))

    return Response.json({ projects })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return Response.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description } = await request.json()

    const projectsRef = collection(db, "projects")
    const docRef = await addDoc(projectsRef, {
      title,
      description,
      slides: [],
      designStyle: "professional",
      createdBy: userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      numberOfSlides: 0,
    })

    return Response.json({ id: docRef.id, message: "Project created" })
  } catch (error) {
    console.error("Error creating project:", error)
    return Response.json({ error: "Failed to create project" }, { status: 500 })
  }
}
