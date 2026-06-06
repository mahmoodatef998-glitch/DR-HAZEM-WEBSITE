import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

type ConfigRow = {
  hero_image: string | null
  about_image: string | null
  product_discounts: Record<number, number>
}

function rowToConfig(row: ConfigRow) {
  return {
    heroImage: row.hero_image,
    aboutImage: row.about_image,
    productDiscounts: row.product_discounts ?? {},
  }
}

const DEFAULT_CONFIG = { heroImage: null, aboutImage: null, productDiscounts: {} }

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("site_config")
      .select("hero_image, about_image, product_discounts")
      .eq("id", 1)
      .single()
    if (error || !data) return NextResponse.json(DEFAULT_CONFIG)
    return NextResponse.json(rowToConfig(data as ConfigRow))
  } catch {
    return NextResponse.json(DEFAULT_CONFIG)
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

  const update: Record<string, unknown> = {}
  if ("heroImage" in body)       update.hero_image         = body.heroImage
  if ("aboutImage" in body)      update.about_image        = body.aboutImage
  if ("productDiscounts" in body) update.product_discounts = body.productDiscounts
  update.updated_at = new Date().toISOString()

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("site_config")
      .upsert({ id: 1, ...update })
      .select("hero_image, about_image, product_discounts")
      .single()
    if (error || !data) throw error
    return NextResponse.json(rowToConfig(data as ConfigRow))
  } catch (err) {
    console.error("Config save error:", err)
    return NextResponse.json({ error: "Failed to save config." }, { status: 500 })
  }
}
