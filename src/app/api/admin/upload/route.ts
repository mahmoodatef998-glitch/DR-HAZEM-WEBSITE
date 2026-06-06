import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({ error: "Upload directly via Cloudinary ImageUpload component" }, { status: 404 });
}
