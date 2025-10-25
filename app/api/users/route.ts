import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore"

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }

    return Response.json({
      id: userSnap.id,
      ...userSnap.data(),
      createdAt: userSnap.data().createdAt?.toDate(),
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return Response.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email, fullName } = await request.json()

    const userRef = doc(db, "users", userId)
    await setDoc(
      userRef,
      {
        email,
        fullName,
        credits: 2, // Free tier starts with 2 credits
        isSubscribed: false,
        createdAt: serverTimestamp(),
      },
      { merge: true },
    )

    return Response.json({ message: "User created/updated" })
  } catch (error) {
    console.error("Error creating user:", error)
    return Response.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await request.json()

    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })

    return Response.json({ message: "User updated" })
  } catch (error) {
    console.error("Error updating user:", error)
    return Response.json({ error: "Failed to update user" }, { status: 500 })
  }
}
