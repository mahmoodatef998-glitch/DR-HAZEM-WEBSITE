"use client";

import dynamic from "next/dynamic";
import { useProducts } from "@/lib/hooks/useProducts";
import { useTranslation } from "@/contexts/LanguageContext";

const ScrollGallery = dynamic(() => import("@/components/gallery/ScrollGallery"), { ssr: false });
const MobileGallery  = dynamic(() => import("@/components/gallery/MobileGallery"),  { ssr: false });

export default function ProductsSection() {
  const { locale } = useTranslation();
  const { products } = useProducts(locale as "en" | "ar");

  return (
    <section id="products" className="relative">
      <div className="md:hidden">
        <MobileGallery products={products} />
      </div>
      <div className="hidden md:block">
        <ScrollGallery products={products} />
      </div>
    </section>
  );
}
