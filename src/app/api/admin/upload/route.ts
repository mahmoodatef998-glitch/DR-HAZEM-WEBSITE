import { NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs/promises"

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value
  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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

  const originalName = file.name
  const ext = originalName.split(".").pop()?.toLowerCase() || "jpg"
  const timestamp = Date.now()
  const filename = `${type}-${timestamp}.${ext}`
  const destPath = path.join(process.cwd(), "public", "uploads", filename)

  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(destPath, buffer)

  return NextResponse.json({ url: `/uploads/${filename}` })
}
