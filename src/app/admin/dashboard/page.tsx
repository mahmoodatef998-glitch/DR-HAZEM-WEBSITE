"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { products } from "@/data/products"

type Tab = "hero" | "about" | "products"

interface Config {
  heroImage: string | null
  aboutImage: string | null
  productDiscounts: Record<number, number>
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("hero")
  const [config, setConfig] = useState<Config>({ heroImage: null, aboutImage: null, productDiscounts: {} })
  const [discounts, setDiscounts] = useState<Record<number, number>>({})
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<"hero" | "about" | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const heroRef = useRef<HTMLInputElement>(null)
  const aboutRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then((cfg: Config) => {
        setConfig(cfg)
        setDiscounts(cfg.productDiscounts ?? {})
      })
  }, [])

  const notify = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3500)
  }

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const uploadImage = async (file: File, type: "hero" | "about") => {
    setUploading(type)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("type", type)
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      if (!res.ok) throw new Error()
      const { url } = await res.json()
      const key = type === "hero" ? "heroImage" : "aboutImage"
      await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: url }),
      })
      setConfig((c) => ({ ...c, [key]: url }))
      notify(type === "hero" ? "Hero background updated!" : "About photo updated!")
    } catch {
      notify("Upload failed. Please try again.", false)
    } finally {
      setUploading(null)
    }
  }

  const saveDiscounts = async () => {
    setSaving(true)
    try {
      await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productDiscounts: discounts }),
      })
      setConfig((c) => ({ ...c, productDiscounts: discounts }))
      notify("Discounts saved — now live on the website!")
    } catch {
      notify("Save failed. Please try again.", false)
    } finally {
      setSaving(false)
    }
  }

  const setDiscount = (id: number, val: string) => {
    const n = Math.min(99, Math.max(0, parseInt(val) || 0))
    setDiscounts((d) => ({ ...d, [id]: n }))
  }

  const salePrice = (id: number) => {
    const p = products.find((x) => x.id === id)
    if (!p) return null
    const d = discounts[id] ?? 0
    if (d <= 0) return null
    return Math.round(p.basePriceAED * (1 - d / 100))
  }

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "hero",     label: "Hero Section",  icon: "🖼️" },
    { id: "about",    label: "About Section", icon: "👤" },
    { id: "products", label: "Products",      icon: "📦" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-semibold transition-all ${toast.ok ? "bg-emerald-600" : "bg-red-600"}`}>
          <span>{toast.ok ? "✓" : "✕"}</span>
          {toast.msg}
        </div>
      )}

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
              <Image src="/logo.png" alt="Medix" width={36} height={36} className="object-contain" />
            </div>
            <div>
              <span className="font-bold text-gray-900 text-sm leading-none block">Medix Healthcare</span>
              <span className="text-gray-400 text-xs">Admin Dashboard</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* ── Tab Bar ── */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-8 w-fit shadow-sm">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                tab === t.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* ═══════════════════════ HERO TAB ═══════════════════════ */}
        {tab === "hero" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Hero Section Background</h2>
              <p className="text-gray-500 text-sm mt-1">Upload a background image for the hero section. Recommended: 1920×1080px, JPG or PNG.</p>
            </div>
            <div className="px-8 py-8 space-y-6">
              {/* Preview */}
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 h-56 flex items-center justify-center relative">
                {config.heroImage ? (
                  <>
                    <Image src={config.heroImage} alt="Hero background" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold bg-black/50 px-3 py-1.5 rounded-lg">Current Hero Background</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-gray-400 text-sm font-medium">No image uploaded yet</p>
                    <p className="text-gray-300 text-xs mt-1">Default gradient background is active</p>
                  </div>
                )}
              </div>
              {/* Upload */}
              <input ref={heroRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f, "hero") }} />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => heroRef.current?.click()}
                  disabled={uploading === "hero"}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-gray-300 text-white font-semibold rounded-xl text-sm transition-colors duration-150"
                >
                  {uploading === "hero" ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Uploading...</>
                  ) : (
                    <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>Upload New Image</>
                  )}
                </button>
                {config.heroImage && (
                  <button
                    onClick={async () => {
                      await fetch("/api/admin/config", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ heroImage: null }) })
                      setConfig((c) => ({ ...c, heroImage: null }))
                      notify("Hero image removed.")
                    }}
                    className="px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-150"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════ ABOUT TAB ═══════════════════════ */}
        {tab === "about" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">About Section Photo</h2>
              <p className="text-gray-500 text-sm mt-1">Upload the doctor or company photo shown in the About section. Recommended: square image, 400×400px or larger.</p>
            </div>
            <div className="px-8 py-8 space-y-6">
              {/* Preview */}
              <div className="flex items-start gap-8">
                <div className="w-40 h-40 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0 relative">
                  {config.aboutImage ? (
                    <Image src={config.aboutImage} alt="About photo" fill className="object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <div className="text-4xl mb-1">👤</div>
                      <p className="text-gray-400 text-xs">No photo</p>
                    </div>
                  )}
                </div>
                <div className="pt-2">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Profile Photo</p>
                  <p className="text-sm text-gray-500 mb-4">This photo appears in the About Us section alongside the company bio and credentials.</p>
                  <input ref={aboutRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f, "about") }} />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => aboutRef.current?.click()}
                      disabled={uploading === "about"}
                      className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-gray-300 text-white font-semibold rounded-xl text-sm transition-colors duration-150"
                    >
                      {uploading === "about" ? (
                        <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Uploading...</>
                      ) : (
                        <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>Upload Photo</>
                      )}
                    </button>
                    {config.aboutImage && (
                      <button
                        onClick={async () => {
                          await fetch("/api/admin/config", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ aboutImage: null }) })
                          setConfig((c) => ({ ...c, aboutImage: null }))
                          notify("About photo removed.")
                        }}
                        className="px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-150"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════ PRODUCTS TAB ═══════════════════════ */}
        {tab === "products" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Product Discounts</h2>
                <p className="text-gray-500 text-sm mt-1">Set a discount % for any product. The sale price is calculated automatically and shown live on the website.</p>
              </div>
              <button
                onClick={saveDiscounts}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-semibold rounded-xl text-sm transition-colors duration-150"
              >
                {saving ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Saving...</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>Save All Discounts</>
                )}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-8">#</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Brand</th>
                    <th className="text-center px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Base Price</th>
                    <th className="text-center px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-36">Discount %</th>
                    <th className="text-center px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Sale Price</th>
                    <th className="text-center px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => {
                    const d = discounts[p.id] ?? 0
                    const sale = salePrice(p.id)
                    const hasDiscount = d > 0
                    return (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors duration-100">
                        <td className="px-6 py-4 text-gray-400 font-mono text-xs">{String(p.id).padStart(2, "0")}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-xl leading-none">{p.icon}</span>
                            <div>
                              <p className="font-semibold text-gray-900 leading-tight">{p.name}</p>
                              <p className="text-gray-400 text-xs mt-0.5">{p.category} · {p.origin === "ES" ? "🇪🇸 Spain" : "🇮🇹 Italy"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-500 text-xs max-w-[140px] leading-tight">{p.brand}</td>
                        <td className="px-4 py-4 text-center">
                          <span className={`font-bold ${hasDiscount ? "text-gray-400 line-through text-xs" : "text-gray-900"}`}>
                            AED {p.basePriceAED}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <input
                              type="number"
                              min={0}
                              max={99}
                              value={d === 0 ? "" : d}
                              placeholder="0"
                              onChange={(e) => setDiscount(p.id, e.target.value)}
                              className="w-16 text-center px-2 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                            <span className="text-gray-400 text-sm font-medium">%</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {hasDiscount && sale !== null ? (
                            <span className="font-bold text-emerald-600">AED {sale}</span>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            hasDiscount
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-gray-100 text-gray-500 border border-gray-200"
                          }`}>
                            {hasDiscount ? `${d}% OFF` : "Full Price"}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                {Object.values(discounts).filter((d) => d > 0).length} product(s) on sale
              </p>
              <button
                onClick={saveDiscounts}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-semibold rounded-xl text-sm transition-colors duration-150"
              >
                {saving ? "Saving..." : "Save All Discounts"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
