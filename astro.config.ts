import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { getSiteData } from "./src/lib/getSiteData";

const { meta } = getSiteData();

export default defineConfig({
  site: meta.siteUrl,
  integrations: [tailwind()],
});
