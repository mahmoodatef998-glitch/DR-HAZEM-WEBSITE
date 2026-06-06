import { NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs/promises"

const CONFIG_PATH = path.join(process.cwd(), "public", "site-config.json")

export async function GET() {
  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf-8")
    const config = JSON.parse(raw)
    return NextResponse.json(config)
  } catch {
    return NextResponse.json(
      { heroImage: null, aboutImage: null, productDiscounts: {} },
    )
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value
  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  let existing: Record<string, unknown> = { heroImage: null, aboutImage: null, productDiscounts: {} }
  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf-8")
    existing = JSON.parse(raw)
  } catch {
    // file may not exist yet, use defaults
  }

  const updated = { ...existing, ...body }
  await fs.writeFile(CONFIG_PATH, JSON.stringify(updated, null, 2), "utf-8")
  return NextResponse.json(updated)
}
