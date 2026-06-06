import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value
  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in Vercel environment variables." }, { status: 500 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 })
  }

  const file = formData.get("file")
  const type = formData.get("type") as string

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 })
  }

  if (!["hero", "about"].includes(type)) {
    return NextResponse.json({ error: "Invalid type. Must be 'hero' or 'about'." }, { status: 400 })
  }

  const timestamp = Math.round(Date.now() / 1000)
  const folder = "medix-healthcare"
  const publicId = `${folder}/${type}-${timestamp}`

  // Build SHA-1 signature required by Cloudinary signed upload
  const paramsToSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}`
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + apiSecret)
    .digest("hex")

  const uploadForm = new FormData()
  uploadForm.append("file", file)
  uploadForm.append("api_key", apiKey)
  uploadForm.append("timestamp", String(timestamp))
  uploadForm.append("signature", signature)
  uploadForm.append("folder", folder)
  uploadForm.append("public_id", publicId)

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: uploadForm }
  )

  if (!uploadRes.ok) {
    const err = await uploadRes.text()
    console.error("Cloudinary upload error:", err)
    return NextResponse.json({ error: "Upload to Cloudinary failed." }, { status: 500 })
  }

  const data = await uploadRes.json()
  return NextResponse.json({ url: data.secure_url as string })
}
