import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
})

const builder = imageUrlBuilder(client)

type ImageSource = Parameters<typeof builder.image>[0]

export function urlFor(source: ImageSource) {
  return builder.image(source)
}