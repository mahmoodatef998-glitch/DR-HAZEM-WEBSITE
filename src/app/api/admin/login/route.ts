import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  let body: { password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  if (body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set("admin-token", process.env.ADMIN_TOKEN ?? "", {
    path: "/",
    maxAge: 86400,
    httpOnly: true,
    sameSite: "lax",
  })
  return response
}
