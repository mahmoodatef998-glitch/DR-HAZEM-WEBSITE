import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const [heroRes, aboutRes] = await Promise.all([
      supabase.from("site_settings").select("content").eq("section", "hero").single(),
      supabase.from("site_settings").select("content").eq("section", "about").single(),
    ]);
    return NextResponse.json({
      heroImage: (heroRes.data?.content as Record<string, unknown> | null)?.backgroundImage ?? null,
      aboutImage: (aboutRes.data?.content as Record<string, unknown> | null)?.photo ?? null,
    });
  } catch {
    return NextResponse.json({ heroImage: null, aboutImage: null });
  }
}
