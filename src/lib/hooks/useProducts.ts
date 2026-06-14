"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { products as fallback } from "@/data/products";
import type { Product } from "@/data/products";
import type { ProductRow } from "@/types/database";

/** Convert a Supabase ProductRow → the Product shape the gallery expects */
function rowToProduct(row: ProductRow): Product {
  return {
    id:            Number(row.sort_order) || 0,
    name:          row.name,
    brand:         row.brand,
    origin:        row.origin as "ES" | "IT" | "EG",
    category:      row.category as Product["category"],
    price:         row.price,
    originalPrice: row.original_price ?? undefined,
    description:   row.description ?? "",
    features:      row.features ?? [],
    badge:         row.badge ?? undefined,
    badgeColor:    (row.badge_color as Product["badgeColor"]) ?? undefined,
    rating:        Number(row.rating),
    reviews:       row.reviews,
    icon:          row.icon,
    gradient:      row.gradient,
    popular:       row.popular,
    discount:      row.discount ?? undefined,
    image_url:     row.image_url ?? undefined,
    // _dbId lets gallery link to edit page
    _dbId:         row.id,
  } as unknown as Product & { _dbId: string };
}

export function useProducts(locale: "en" | "ar" = "en") {
  const [products, setProducts] = useState<Product[]>(fallback);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          // Use AR names when locale is Arabic (if available)
          const mapped = data.map(row => {
            const p = rowToProduct(row);
            if (locale === "ar" && row.name_ar) {
              (p as unknown as Record<string, unknown>).name = row.name_ar;
            }
            if (locale === "ar" && row.description_ar) {
              (p as unknown as Record<string, unknown>).description = row.description_ar;
            }
            if (locale === "ar" && row.features_ar?.length) {
              (p as unknown as Record<string, unknown>).features = row.features_ar;
            }
            return p;
          });
          setProducts(mapped);
        }
        setLoading(false);
      });
  }, [locale]);

  return { products, loading };
}
