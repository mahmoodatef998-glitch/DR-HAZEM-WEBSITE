import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/admin/Sidebar";

export const metadata = { title: "Admin — Medix Healthcare" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-950" dir="rtl">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
