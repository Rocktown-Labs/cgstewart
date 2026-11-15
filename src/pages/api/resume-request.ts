import type { APIRoute } from "astro";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json();
		const { name, email, phone } = body;

		if (!email || !phone) {
			return new Response(
				JSON.stringify({ error: "Email and phone number are required." }),
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}

		// Basic email format check
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email.trim())) {
			return new Response(
				JSON.stringify({ error: "Please provide a valid email address." }),
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}

		const dbPath = path.resolve(process.cwd(), "data.db");
		const db = new DatabaseSync(dbPath);

		db.exec(`
			CREATE TABLE IF NOT EXISTS resume_requests (
				id TEXT PRIMARY KEY,
				name TEXT,
				email TEXT NOT NULL,
				phone TEXT NOT NULL,
				created_at TEXT DEFAULT (datetime('now'))
			);
		`);

		const id = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
		const stmt = db.prepare(
			"INSERT INTO resume_requests (id, name, email, phone) VALUES (?, ?, ?, ?)"
		);
		stmt.run(id, name?.trim() || null, email.trim(), phone.trim());

		return new Response(
			JSON.stringify({
				success: true,
				downloadUrl: "/Cameron-Stewart-Resume.pdf",
			}),
			{ status: 200, headers: { "Content-Type": "application/json" } }
		);
	} catch (err: any) {
		console.error("Resume request error:", err);
		return new Response(
			JSON.stringify({ error: "Failed to process request." }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
};
