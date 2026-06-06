"use client"
import { useState, useEffect } from "react"

export interface SiteConfig {
  heroImage: string | null
  aboutImage: string | null
  productDiscounts: Record<number, number>
}

const DEFAULT: SiteConfig = { heroImage: null, aboutImage: null, productDiscounts: {} }

export function useSiteConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT)
  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then(setConfig)
      .catch(() => setConfig(DEFAULT))
  }, [])
  return config
}
