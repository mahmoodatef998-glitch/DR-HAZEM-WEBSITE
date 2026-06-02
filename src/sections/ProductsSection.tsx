"use client";

import dynamic from "next/dynamic";

/* Load galleries lazily — MobileGallery has drag/touch handlers, ScrollGallery is heavy */
const ScrollGallery = dynamic(() => import("@/components/gallery/ScrollGallery"), { ssr: false });
const MobileGallery  = dynamic(() => import("@/components/gallery/MobileGallery"),  { ssr: false });

export default function ProductsSection() {
  return (
    <section id="products" className="relative">
      {/* ── Mobile: swipe card deck (< md) ── */}
      <div className="md:hidden">
        <MobileGallery />
      </div>
      {/* ── Desktop: 3D scroll staircase (≥ md) ── */}
      <div className="hidden md:block">
        <ScrollGallery />
      </div>
    </section>
  );
}
