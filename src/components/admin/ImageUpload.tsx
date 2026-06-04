"use client";

import { useState, useRef } from "react";
import { Upload, Link2, X, Loader2, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

const CLOUD_NAME     = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET  = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const UPLOAD_URL     = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export default function ImageUpload({ value, onChange, folder = "dr-hazem" }: ImageUploadProps) {
  const [mode, setMode]           = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput]   = useState(value.startsWith("http") ? value : "");
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState(false);
  const [progress, setProgress]   = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── Upload to Cloudinary (unsigned) ── */
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("الصورة أكبر من 10MB");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess(false);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", folder);

      // Use XMLHttpRequest to track upload progress
      const url = await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (ev) => {
          if (ev.lengthComputable) {
            setProgress(Math.round((ev.loaded / ev.total) * 100));
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const res = JSON.parse(xhr.responseText);
            resolve(res.secure_url as string);
          } else {
            const res = JSON.parse(xhr.responseText);
            reject(new Error(res.error?.message ?? `HTTP ${xhr.status}`));
          }
        });

        xhr.addEventListener("error", () => reject(new Error("فشل الاتصال بـ Cloudinary")));

        xhr.open("POST", UPLOAD_URL);
        xhr.send(formData);
      });

      onChange(url);
      setSuccess(true);
      setTimeout(() => { setSuccess(false); setProgress(0); }, 3000);

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("Invalid upload preset")) {
        setError("الـ Preset name غلط — تأكد من اسم الـ Preset في Cloudinary");
      } else if (msg.includes("Unknown API key")) {
        setError("الـ Cloud name غلط — تأكد من اسمه في Cloudinary Dashboard");
      } else {
        setError("فشل الرفع: " + msg);
      }
    } finally {
      setUploading(false);
    }
  };

  /* ── Save URL directly ── */
  const handleUrlSave = () => {
    const url = urlInput.trim();
    if (!url) return;
    onChange(url);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleClear = () => {
    onChange("");
    setUrlInput("");
    setError("");
    setSuccess(false);
    setProgress(0);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="space-y-3">

      {/* ── Preview ── */}
      {value ? (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
          {success && (
            <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-36 rounded-2xl bg-white/4 border-2 border-dashed border-white/15 flex flex-col items-center justify-center gap-2 text-white/30">
          <ImageIcon className="w-8 h-8" />
          <p className="text-xs">لا توجد صورة</p>
        </div>
      )}

      {/* ── Mode tabs ── */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1">
        {(["upload", "url"] as const).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setError(""); }}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all duration-150",
              mode === m ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
            )}
          >
            {m === "upload"
              ? <><Upload className="w-3.5 h-3.5" /> رفع من الجهاز</>
              : <><Link2 className="w-3.5 h-3.5" /> رابط URL</>}
          </button>
        ))}
      </div>

      {/* ── File upload ── */}
      {mode === "upload" && (
        <div className="space-y-2">
          <label className={cn(
            "block w-full py-3 rounded-xl border text-center text-sm font-semibold transition-all duration-150",
            uploading
              ? "border-sky-500/30 text-sky-400/50 cursor-wait"
              : "border-sky-500/40 text-sky-400 hover:bg-sky-500/10 cursor-pointer"
          )}>
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                جاري الرفع {progress > 0 ? `${progress}%` : ""}...
              </span>
            ) : success ? (
              <span className="flex items-center justify-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> تم الرفع بنجاح!
              </span>
            ) : (
              "اختر صورة من جهازك (JPG · PNG · WEBP)"
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleFile}
              disabled={uploading}
            />
          </label>

          {/* Progress bar */}
          {uploading && progress > 0 && (
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* ── URL paste ── */}
      {mode === "url" && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleUrlSave()}
            placeholder="https://example.com/image.jpg"
            className="flex-1 bg-white/6 border border-white/12 rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-sky-500 transition-colors"
            dir="ltr"
          />
          <button
            type="button"
            onClick={handleUrlSave}
            className={cn(
              "px-4 py-2.5 text-white text-sm font-bold rounded-xl transition-colors",
              success ? "bg-emerald-500" : "bg-sky-500 hover:bg-sky-400"
            )}
          >
            {success ? "✓" : "حفظ"}
          </button>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3 leading-relaxed">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
