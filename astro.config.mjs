import cloudflare from "@astrojs/cloudflare";
import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig, fontProviders } from "astro/config";
import emdash, { local } from "emdash/astro";
import { d1 } from "@emdash-cms/cloudflare";
import { sqlite } from "emdash/db";

const isDev = process.env.NODE_ENV !== "production" && !process.env.CLOUDFLARE_BUILD;

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: isDev ? sqlite({ url: "file:./data.db" }) : d1({ binding: "DB" }),
			storage: local({
				directory: "./uploads",
				baseUrl: "/_emdash/api/media/file",
			}),
		}),
	],
    fonts: [
        {
            provider: fontProviders.google(),
            name: "Space Grotesk",
            cssVariable: "--font-heading",
            weights: [400, 500, 600, 700],
            fallbacks: ["sans-serif"],
        },
        {
            provider: fontProviders.google(),
            name: "Inter",
            cssVariable: "--font-sans",
            weights: [300, 400, 500, 600, 700],
            fallbacks: ["system-ui", "sans-serif"],
        },
    ],
    devToolbar: { enabled: false },
});