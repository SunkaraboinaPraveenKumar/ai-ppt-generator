// ImageKit configuration and utilities
export const IMAGEKIT_CONFIG = {
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
  authenticationEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_AUTH_ENDPOINT || "",
}

export function buildImageKitUrl(
  imageUrl: string,
  transformations: {
    width?: number
    height?: number
    quality?: number
    transformation?: string
  },
) {
  if (!IMAGEKIT_CONFIG.urlEndpoint) {
    return imageUrl
  }

  const params = new URLSearchParams()

  if (transformations.width) params.append("w", transformations.width.toString())
  if (transformations.height) params.append("h", transformations.height.toString())
  if (transformations.quality) params.append("q", transformations.quality.toString())

  // Add transformation-specific parameters
  switch (transformations.transformation) {
    case "remove-bg":
      params.append("e-remove-background", "true")
      break
    case "smart-crop":
      params.append("e-smart-crop", "true")
      break
    case "enhance":
      params.append("e-enhance", "true")
      break
    case "blur-bg":
      params.append("e-blur-background", "true")
      break
  }

  const queryString = params.toString()
  return `${IMAGEKIT_CONFIG.urlEndpoint}?${queryString}`
}
