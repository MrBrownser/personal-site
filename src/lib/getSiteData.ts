import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { SiteContent } from "../types/siteContent";

const PRIMARY = "site-content.json";
const FALLBACK = "site-content.example.json";

/**
 * Load site copy from a gitignored `site-content.json` when present,
 * otherwise the committed `site-content.example.json` (e.g. CI / forks).
 */
export function getSiteData(): SiteContent {
  const root = process.cwd();
  const file = existsSync(join(root, PRIMARY)) ? PRIMARY : FALLBACK;
  const raw = readFileSync(join(root, file), "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export const siteData = getSiteData();
