import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DeleteProductButton from "./DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, name_ar, category, price, origin, active, image_url, icon, badge")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  return (
    <div className="p-8 max-w-5xl" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white font-black text-2xl mb-1">المنتجات</h1>
          <p className="text-white/40 text-sm">{products?.length ?? 0} منتج</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          إضافة منتج
        </Link>
      </div>

      {/* Products table */}
      {!products?.length ? (
        <div className="text-center py-20 text-white/30">
          <p className="text-4xl mb-3">📦</p>
          <p className="font-semibold">لا توجد منتجات بعد</p>
          <p className="text-sm mt-1">ابدأ بإضافة أول منتج</p>
        </div>
      ) : (
        <div className="space-y-2">
          {products.map(product => (
            <div
              key={product.id}
              className="flex items-center gap-4 bg-white/4 border border-white/8 rounded-2xl px-5 py-4 hover:bg-white/6 transition-colors duration-150"
            >
              {/* Icon / Image */}
              <div className="w-12 h-12 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{product.icon}</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white font-bold text-sm truncate">{product.name}</p>
                  {product.name_ar && (
                    <p className="text-white/40 text-xs truncate">{product.name_ar}</p>
                  )}
                  {product.badge && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/20">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-white/40 text-xs">
                    {product.origin === "ES" ? "🇪🇸 إسبانيا" : "🇮🇹 إيطاليا"}
                  </span>
                  <span className="text-white/25 text-xs">•</span>
                  <span className="text-white/40 text-xs">{product.category}</span>
                </div>
              </div>

              {/* Price */}
              <p className="text-sky-400 font-black text-sm flex-shrink-0 hidden sm:block">
                {product.price}
              </p>

              {/* Status */}
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full flex-shrink-0 ${
                product.active
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                  : "bg-white/8 text-white/30 border border-white/10"
              }`}>
                {product.active ? "نشط" : "مخفي"}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/products/${product.id}`}
                  className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/20 flex items-center justify-center text-sky-400 hover:bg-sky-500/25 transition-colors"
                  aria-label="تعديل"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Link>
                <DeleteProductButton id={product.id} name={product.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
