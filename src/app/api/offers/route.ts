import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("site_settings")
    .select("content")
    .eq("section", "offers")
    .single();

  const items = (data?.content as { items?: unknown[] } | null)?.items ?? [];
  return NextResponse.json({ items });
}
