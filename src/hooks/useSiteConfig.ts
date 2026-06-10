"use client";
import { useState, useEffect } from "react";

export interface SiteConfig {
  heroImage: string | null;
  aboutImage: string | null;
}

const DEFAULT: SiteConfig = { heroImage: null, aboutImage: null };

export function useSiteConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT);
  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then(setConfig)
      .catch(() => setConfig(DEFAULT));
  }, []);
  return config;
}
