import type { APIRoute } from "astro";
import { getEmDashCollection } from "emdash";

export const GET: APIRoute = async () => {
	const baseUrl = "https://cgstewart.dev";
	const [projectsResult, postsResult] = await Promise.all([
		getEmDashCollection("projects", { limit: 100 }),
		getEmDashCollection("posts", { limit: 100 }),
	]);

	const projects = projectsResult.entries || [];
	const posts = postsResult.entries || [];

	const staticPages = [
		"",
		"/work",
		"/writing",
		"/resume",
	];

	const urls = [
		...staticPages.map((p) => `${baseUrl}${p}`),
		...projects.map((p) => `${baseUrl}/work/${p.slug}`),
		...posts.map((p) => `${baseUrl}/writing/${p.slug}`),
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === baseUrl ? "1.0" : "0.8"}</priority>
  </url>`
	)
	.join("\n")}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
