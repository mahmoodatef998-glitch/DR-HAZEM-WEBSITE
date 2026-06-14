import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { CheckCircle2, ArrowLeft, Star, MapPin, Package } from "lucide-react";
import type { ProductRow } from "@/types/database";
import { ORIGIN_OPTIONS } from "@/lib/origins";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://drhazem.ae";
const WHATSAPP  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971585335516";

async function getProduct(slug: string): Promise<ProductRow | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("active", true);
  if (!data) return null;
  return data.find((p) => slugify(p.name) === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };

  const title = `${product.name} | Medix Healthcare`;
  const originLabel = ORIGIN_OPTIONS.find(o => o.value === product.origin)?.labelEn ?? product.origin;
  const description = product.description ?? `${product.name} by ${product.brand} — imported from ${originLabel}. Available in UAE.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/products/${slug}`,
      images: product.image_url ? [{ url: product.image_url, width: 800, height: 800, alt: product.name }] : [],
    },
    alternates: { canonical: `${BASE_URL}/products/${slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const originMeta = ORIGIN_OPTIONS.find(o => o.value === product.origin);
  const origin = originMeta
    ? { label: originMeta.labelEn, flag: originMeta.label.split(" ")[0] }
    : { label: product.origin, flag: "🌍" };
  const whatsappMsg = encodeURIComponent(`Hello, I'm interested in ordering: ${product.name} (${product.brand}). Please provide availability and delivery details.`);
  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${whatsappMsg}`;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Back navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm font-medium transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Image ── */}
          <div className="relative">
            <div className="sticky top-24 rounded-3xl overflow-hidden bg-white/[0.03] border border-white/8 aspect-square flex items-center justify-center">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <span className="text-[100px] select-none">{product.icon}</span>
              )}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="bg-sky-500 text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── Details ── */}
          <div className="flex flex-col">
            {/* Category + origin */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="bg-white/6 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/40 text-xs font-medium">
                <MapPin className="w-3 h-3" />
                {origin.flag} Imported from {origin.label}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">
              {product.name}
            </h1>
            <p className="text-white/40 text-sm font-semibold mb-6">{product.brand}</p>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-white/15 text-white/15"}`} />
                  ))}
                </div>
                {product.reviews > 0 && (
                  <span className="text-white/35 text-sm">{product.reviews} reviews</span>
                )}
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-white/60 text-base leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-3">Key Benefits</h2>
                <ul className="space-y-2.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price + CTA */}
            <div className="mt-auto pt-6 border-t border-white/8">
              <div className="flex items-end gap-3 mb-5">
                {product.original_price && (
                  <span className="text-white/30 text-base line-through leading-none mb-1">
                    {product.original_price} AED
                  </span>
                )}
                <span className="text-4xl font-black text-white leading-none">
                  {product.price}
                </span>
                {product.discount && product.discount > 0 && (
                  <span className="bg-rose-500/15 border border-rose-500/25 text-rose-400 text-xs font-black px-2 py-1 rounded-lg">
                    -{product.discount}%
                  </span>
                )}
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20c05c] text-white font-black text-base shadow-xl shadow-[#25D366]/20 transition-colors duration-200 active:scale-[0.98]"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order via WhatsApp
              </a>

              <div className="flex items-center justify-center gap-2 mt-3 text-white/25 text-xs">
                <Package className="w-3.5 h-3.5" />
                GCC Approved · UAE Licensed · Fast Delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
