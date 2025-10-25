import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { projectId, format, slides, title } = await request.json()

    if (!projectId || !format || !slides) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!["pdf", "pptx"].includes(format)) {
      return NextResponse.json({ error: "Invalid format" }, { status: 400 })
    }

    if (format === "pptx") {
      // For PPTX, we'll return a data URL that can be downloaded
      // In production, use PptxGenJS library
      const pptxData = generatePPTX(slides, title)
      return NextResponse.json({
        success: true,
        format: "pptx",
        data: pptxData,
        fileName: `${title || "presentation"}.pptx`,
      })
    }

    // PDF export
    const fileName = `${title || "presentation"}.pdf`
    const downloadUrl = `/downloads/${projectId}/${fileName}`

    return NextResponse.json({
      success: true,
      downloadUrl,
      fileName,
      format: "pdf",
    })
  } catch (error) {
    console.error("Error exporting presentation:", error)
    return NextResponse.json({ error: "Failed to export presentation" }, { status: 500 })
  }
}

function generatePPTX(slides: any[], title: string) {
  // This is a placeholder for PPTX generation
  // In production, integrate with PptxGenJS or similar library
  return {
    title,
    slides: slides.map((slide) => ({
      title: slide.title,
      content: slide.content,
      notes: slide.notes,
    })),
  }
}
