export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Relationships: never[];
        Row: {
          id: string;
          name: string;
          name_ar: string | null;
          brand: string;
          origin: "ES" | "IT" | "EG";
          category: string;
          price: string;
          original_price: string | null;
          description: string | null;
          description_ar: string | null;
          features: string[];
          features_ar: string[];
          badge: string | null;
          badge_color: string | null;
          rating: number;
          reviews: number;
          icon: string;
          gradient: string;
          popular: boolean;
          discount: number | null;
          image_url: string | null;
          sort_order: number;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      site_settings: {
        Relationships: never[];
        Row: {
          section: string;
          content: Json;
          updated_at: string;
        };
        Insert: {
          section: string;
          content: Json;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
      };
    };
  };
}

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];
export type SiteSettingsRow = Database["public"]["Tables"]["site_settings"]["Row"];
