import { createClient } from "@/lib/supabase/server";
import OffersEditor, { type OfferItem } from "./OffersEditor";

export const dynamic = "force-dynamic";

export default async function OffersAdminPage() {
  const supabase = await createClient();

  const [offersRes, productsRes] = await Promise.all([
    supabase
      .from("site_settings")
      .select("content")
      .eq("section", "offers")
      .single(),
    supabase
      .from("products")
      .select("id, name, name_ar, image_url, price, original_price")
      .eq("active", true)
      .order("sort_order"),
  ]);

  const savedOffers =
    (offersRes.data?.content as { items?: OfferItem[] } | null)?.items ?? [];

  const products = productsRes.data ?? [];

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-7">
        <h1 className="text-white font-black text-2xl">Special Offers</h1>
        <p className="text-white/40 text-sm mt-1">
          Manage limited-time deals shown in the Offers section on the homepage.
        </p>
      </div>

      <OffersEditor initialOffers={savedOffers} products={products} />
    </div>
  );
}
