"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, Link2, X, Loader2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export default function ImageUpload({ value, onChange, folder = "general" }: ImageUploadProps) {
  const [mode, setMode]       = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState(value.startsWith("http") ? value : "");
  const [uploading, setUploading] = useState(false);
  const [error, setError]     = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("الصورة أكبر من 5MB");
      return;
    }

    setUploading(true);
    setError("");

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      setError("فشل رفع الصورة — " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(fileName);
    onChange(data.publicUrl);
    setUploading(false);
  };

  const handleUrlSave = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
  };

  const handleClear = () => {
    onChange("");
    setUrlInput("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      {/* Preview */}
      {value ? (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 left-2 w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      ) : (
        <div className="w-full h-44 rounded-2xl bg-white/4 border-2 border-dashed border-white/15 flex flex-col items-center justify-center gap-2 text-white/30">
          <ImageIcon className="w-10 h-10" />
          <p className="text-sm">لا توجد صورة</p>
        </div>
      )}

      {/* Mode tabs */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1">
        {(["upload", "url"] as const).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-150",
              mode === m ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
            )}
          >
            {m === "upload" ? <><Upload className="w-3.5 h-3.5" /> رفع صورة</> : <><Link2 className="w-3.5 h-3.5" /> رابط URL</>}
          </button>
        ))}
      </div>

      {/* Upload input */}
      {mode === "upload" && (
        <label className={cn(
          "block w-full py-3 rounded-xl border text-center text-sm font-semibold cursor-pointer transition-all duration-150",
          uploading
            ? "border-sky-500/30 text-sky-400/50 cursor-not-allowed"
            : "border-sky-500/40 text-sky-400 hover:bg-sky-500/10"
        )}>
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> جاري الرفع...
            </span>
          ) : "اختر صورة من جهازك"}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
      )}

      {/* URL input */}
      {mode === "url" && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 bg-white/6 border border-white/12 rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-sky-500 transition-colors"
            dir="ltr"
          />
          <button
            type="button"
            onClick={handleUrlSave}
            className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-bold rounded-xl transition-colors"
          >
            حفظ
          </button>
        </div>
      )}

      {error && (
        <p className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}
