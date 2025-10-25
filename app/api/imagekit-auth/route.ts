import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || ""
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || ""

    const timestamp = Math.floor(Date.now() / 1000)
    const token = crypto.randomBytes(10).toString("hex")

    // Create signature
    const signatureString = `${token}${timestamp}${privateKey}`
    const signature = crypto.createHash("sha1").update(signatureString).digest("hex")

    return NextResponse.json({
      token,
      expire: timestamp + 30 * 60,
      signature,
      publicKey,
    })
  } catch (error) {
    console.error("Error generating ImageKit auth:", error)
    return NextResponse.json({ error: "Failed to generate auth token" }, { status: 500 })
  }
}
