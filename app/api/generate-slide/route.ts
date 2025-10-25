import { generateText, streamText } from "ai"
import { google } from "@ai-sdk/google"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"

export async function POST(request: Request) {
  try {
    console.log("/api/generate-slide: POST handler invoked")
    const { userId } = await auth()
    console.log("/api/generate-slide: auth() returned", { userId })
    if (!userId) {
      console.log("/api/generate-slide: no userId from auth() - returning 401")
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)
  console.log("/api/generate-slide: userSnap.exists() =", userSnap.exists())

  let userData = null
    if (!userSnap.exists()) {
      console.log("/api/generate-slide: user document not found for userId", userId)
      // Create a minimal user document for new users. Grant 1 starter credit so
      // authenticated users can try the feature once. Adjust as desired.
      const initialData = {
        createdAt: new Date(),
        isSubscribed: false,
        credits: 1,
      }
      await setDoc(userRef, initialData)
      console.log("/api/generate-slide: created initial user document for", userId)
      userData = initialData
    } else {
      userData = userSnap.data()
    }

    // Log the retrieved user data for debugging (avoid logging sensitive fields)
    console.log("/api/generate-slide: userData =", {
      isSubscribed: userData?.isSubscribed,
      credits: userData?.credits,
    })

    // Robust credit check: coerce to number and treat missing/invalid as 0
    const credits = Number(userData?.credits ?? 0)
    const isSubscribed = Boolean(userData?.isSubscribed)

    if (!isSubscribed && Number.isNaN(credits) ? true : credits <= 0) {
      console.log("/api/generate-slide: insufficient credits", { credits, isSubscribed })
      return Response.json({ error: "Insufficient credits", credits }, { status: 403 })
    }

  const body = await request.json()
  console.log("/api/generate-slide: request body:", body)
  const { prompt, slideCount = 1, useStreaming = false } = body

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 })
    }

    const systemPrompt = `You are an expert presentation designer. Generate ${slideCount} slide(s) based on the user's request.
For each slide, provide a JSON object with the following structure:
{
  "title": "Slide title",
  "content": "Main content/bullet points",
  "notes": "Speaker notes"
}

Return an array of slide objects. Make the content concise and professional.`

    if (useStreaming) {
      const stream = await streamText({
        model: google("gemini-2.5-flash"),
        system: systemPrompt,
        prompt: prompt,
        temperature: 0.7,
      })

      // Return streaming response
      const encoder = new TextEncoder()
      const customReadable = new ReadableStream({
        async start(controller) {
          for await (const chunk of stream.textStream) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`))
          }
          controller.close()
        },
      })

      if (!isSubscribed) {
        // decrement safely and avoid negative values
        await updateDoc(userRef, {
          credits: Math.max(0, credits - 1),
        })
      }

      return new Response(customReadable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    }

    // Standard non-streaming generation
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      system: systemPrompt,
      prompt: prompt,
      temperature: 0.7,
    })

    // Parse the response to extract JSON
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      return Response.json({ error: "Failed to parse AI response" }, { status: 500 })
    }

    const slides = JSON.parse(jsonMatch[0])

    if (!isSubscribed) {
      // decrement safely and avoid negative values
      await updateDoc(userRef, {
        credits: Math.max(0, credits - 1),
      })
    }

    return Response.json({ slides })
  } catch (error) {
    console.error("Error generating slides:", error)
    return Response.json({ error: "Failed to generate slides" }, { status: 500 })
  }
}
