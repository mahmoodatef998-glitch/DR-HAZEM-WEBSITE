import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewProductPage() {
  return (
    <div className="p-8" dir="rtl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/products" className="text-white/40 hover:text-white/70 transition-colors">
          <ChevronLeft className="w-5 h-5 rotate-180" />
        </Link>
        <div>
          <h1 className="text-white font-black text-2xl">إضافة منتج جديد</h1>
          <p className="text-white/40 text-sm mt-0.5">أضف منتجاً جديداً للكتالوج</p>
        </div>
      </div>
      <ProductForm />
    </div>
  );
}
