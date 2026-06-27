import { defineConfig } from "vite";

// Use relative asset paths so the built site works reliably on
// Cloudflare Pages Direct Upload (and any static host), regardless of
// whether it is served from the domain root or a subpath.
export default defineConfig({
  base: "./",
});
