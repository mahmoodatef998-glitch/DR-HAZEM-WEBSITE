"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Trash2 } from "lucide-react";

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", id);
    router.refresh();
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          className="text-[10px] font-black px-2.5 py-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-400 transition-colors"
        >
          تأكيد
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-[10px] font-black px-2.5 py-1.5 rounded-lg bg-white/10 text-white/60 hover:bg-white/15 transition-colors"
        >
          إلغاء
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/15 flex items-center justify-center text-rose-400 hover:bg-rose-500/20 transition-colors"
      aria-label={`حذف ${name}`}
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
