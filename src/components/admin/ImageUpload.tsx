"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Link2, X, Loader2, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

const CLOUD_NAME    = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const UPLOAD_URL    = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export default function ImageUpload({ value, onChange, folder = "dr-hazem" }: ImageUploadProps) {
  const [mode, setMode]           = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput]   = useState(value.startsWith("http") ? value : "");
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState(false);
  const [progress, setProgress]   = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── Shared upload logic ── */
  const uploadFile = useCallback(async (file: File) => {
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
  }, [folder, onChange]);

  /* ── File input change ── */
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  /* ── Drag-and-drop handlers ── */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    /* Only clear if leaving the drop zone itself, not a child element */
    if (e.currentTarget === e.target) setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("الملف ليس صورة — JPG أو PNG أو WEBP فقط");
      return;
    }
    uploadFile(file);
  };

  /* ── URL save ── */
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

      {/* ── File upload + drag-and-drop zone ── */}
      {mode === "upload" && (
        <div className="space-y-2">
          <label
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "block w-full py-5 rounded-xl border-2 border-dashed text-center text-sm font-semibold transition-all duration-200 cursor-pointer select-none",
              uploading
                ? "border-sky-500/30 text-sky-400/50 cursor-wait bg-sky-500/5"
                : isDragging
                ? "border-sky-400 text-sky-300 bg-sky-500/15 scale-[1.01] shadow-[0_0_0_3px_rgba(14,165,233,0.2)]"
                : "border-sky-500/35 text-sky-400 hover:bg-sky-500/8 hover:border-sky-500/60"
            )}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                جاري الرفع {progress > 0 ? `${progress}%` : ""}...
              </span>
            ) : success ? (
              <span className="flex items-center justify-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> تم الرفع بنجاح!
              </span>
            ) : isDragging ? (
              <span className="flex flex-col items-center gap-1.5">
                <Upload className="w-6 h-6 animate-bounce" />
                <span>أفلت الصورة هنا</span>
              </span>
            ) : (
              <span className="flex flex-col items-center gap-1.5">
                <Upload className="w-5 h-5 opacity-70" />
                <span>اسحب وأفلت الصورة هنا</span>
                <span className="text-white/30 text-[11px] font-normal">أو اضغط لاختيار ملف · JPG · PNG · WEBP</span>
              </span>
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
