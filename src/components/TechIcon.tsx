import React from "react";
import * as svgl from "@ridemountainpig/svgl-react";

interface TechIconProps {
	name?: string;
	icon?: string;
	className?: string;
	size?: number;
}

// Custom Alchemy SVG icon matching alchemy.run
function AlchemyIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			style={{ color: "#38bdf8" }}
		>
			<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
			<path d="M12 22V12" />
			<path d="M22 8.5l-10 3.5" />
			<path d="M2 8.5l10 3.5" />
		</svg>
	);
}

export default function TechIcon({ name = "", icon = "", className = "", size = 16 }: TechIconProps) {
	const n = (name || icon).toLowerCase();

	if (n.includes("c#") || n.includes("csharp")) {
		return <svgl.CSharp width={size} height={size} className={className} />;
	}
	if (n.includes(".net") || n.includes("dotnet")) {
		return <svgl.MicrosoftNET width={size} height={size} className={className} />;
	}
	if (n.includes("typescript")) {
		return <svgl.TypeScript width={size} height={size} className={className} />;
	}
	if (n.includes("react")) {
		return <svgl.ReactDark width={size} height={size} className={className} />;
	}
	if (n.includes("next")) {
		return <svgl.Nextjs width={size} height={size} className={className} />;
	}
	if (n.includes("python")) {
		return <svgl.Python width={size} height={size} className={className} />;
	}
	if (n.includes("node")) {
		return <svgl.Nodejs width={size} height={size} className={className} />;
	}
	if (n.includes("hono")) {
		return <svgl.Hono width={size} height={size} className={className} />;
	}
	if (n.includes("workers") || n.includes("cloudflare")) {
		return <svgl.CloudflareWorkers width={size} height={size} className={className} />;
	}
	if (n.includes("alchemy")) {
		return <AlchemyIcon size={size} className={className} />;
	}
	if (n.includes("aws") || n.includes("amazon")) {
		return <svgl.AmazonWebServicesDark width={size} height={size} className={className} />;
	}
	if (n.includes("docker")) {
		return <svgl.Docker width={size} height={size} className={className} />;
	}
	if (n.includes("vercel")) {
		return <svgl.VercelDark width={size} height={size} className={className} />;
	}
	if (n.includes("sqlite") || n.includes("d1")) {
		return <svgl.SQLite width={size} height={size} className={className} />;
	}
	if (n.includes("postgres")) {
		return <svgl.PostgreSQL width={size} height={size} className={className} />;
	}
	if (n.includes("redis")) {
		return <svgl.Redis width={size} height={size} className={className} />;
	}
	if (n.includes("convex")) {
		return <svgl.Convex width={size} height={size} className={className} />;
	}
	if (n.includes("cursor") || n.includes("codex")) {
		return <svgl.CursorDark width={size} height={size} className={className} />;
	}
	if (n.includes("posthog")) {
		return <svgl.PostHog width={size} height={size} className={className} />;
	}
	if (n.includes("sentry")) {
		return <svgl.Sentry width={size} height={size} className={className} />;
	}
	if (n.includes("tanstack")) {
		return <svgl.TanStackDark width={size} height={size} className={className} />;
	}
	if (n.includes("zod")) {
		return <svgl.Zod width={size} height={size} className={className} />;
	}
	if (n.includes("stripe")) {
		return <svgl.Stripe width={size} height={size} className={className} />;
	}

	// Fallback generic code icon
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			className={className}
		>
			<polyline points="16 18 22 12 16 6" />
			<polyline points="8 6 2 12 8 18" />
		</svg>
	);
}
