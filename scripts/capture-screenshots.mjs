import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const targetDir = "/Users/newrgm/dev/RocktownLabs/projects/cgstewart/public/images/projects";

const sites = [
	{
		slug: "gigstax",
		altSlug: null,
		url: "https://gigstax.com",
	},
	{
		slug: "sweettreats",
		altSlug: "sweet-treats",
		url: "https://sweettreatslr.com",
	},
	{
		slug: "rallycasts",
		altSlug: null,
		url: "https://rallycasts.com",
	},
	{
		slug: "quickcalai",
		altSlug: null,
		url: "https://quickcalai.com",
	},
	{
		slug: "soundkit",
		altSlug: null,
		url: "https://mysoundkit.com",
	},
	{
		slug: "rivercitymd",
		altSlug: "river-city-mobile-detailing",
		url: "https://rivercitymd.com",
	},
	{
		slug: "deadpartymedia",
		altSlug: "dead-party-media",
		url: "https://deadpartymedia.com",
	},
	{
		slug: "reluxury",
		altSlug: null,
		url: "https://reluxury.shop",
	},
	{
		slug: "bigspella",
		altSlug: null,
		url: "https://bigspella.com",
	},
	{
		slug: "big-brain-shelf",
		altSlug: null,
		url: "https://bigbrainshelf.com",
	},
	{
		slug: "parlaypal",
		altSlug: null,
		url: "https://myparlaypal.com",
	},
	{
		slug: "castlecare",
		altSlug: null,
		url: "https://castlecare-web.rocktown-labs.workers.dev",
	},
];

console.log("Setting viewport and media settings...");
try {
	execSync("npx --yes agent-browser set viewport 1280 800 2", { stdio: "inherit" });
	execSync("npx --yes agent-browser set media dark", { stdio: "inherit" });
} catch (e) {
	console.error("Error setting browser config:", e.message);
}

for (const site of sites) {
	console.log(`\n========================================`);
	console.log(`Capturing ${site.slug} from ${site.url}...`);
	const outFile = path.join(targetDir, `${site.slug}.png`);
	try {
		execSync(`npx --yes agent-browser open "${site.url}"`, { stdio: "inherit", timeout: 25000 });
		execSync("npx --yes agent-browser wait 3000", { stdio: "inherit", timeout: 10000 });
		execSync(`npx --yes agent-browser screenshot "${outFile}"`, { stdio: "inherit", timeout: 15000 });
		console.log(`✔ Successfully captured ${site.slug}`);

		if (site.altSlug) {
			const altFile = path.join(targetDir, `${site.altSlug}.png`);
			fs.copyFileSync(outFile, altFile);
			console.log(`✔ Copied to alias: ${site.altSlug}.png`);
		}
	} catch (err) {
		console.error(`✖ Failed to capture ${site.slug} via agent-browser:`, err.message);
		// Fallback to Chrome native headless
		try {
			console.log(`Attempting native Chrome fallback for ${site.url}...`);
			execSync(
				`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot="${outFile}" --window-size=1280,800 "${site.url}"`,
				{ stdio: "inherit", timeout: 20000 }
			);
			console.log(`✔ Chrome fallback succeeded for ${site.slug}`);
			if (site.altSlug) {
				const altFile = path.join(targetDir, `${site.altSlug}.png`);
				fs.copyFileSync(outFile, altFile);
			}
		} catch (chromeErr) {
			console.error(`✖ Native Chrome also failed for ${site.slug}:`, chromeErr.message);
		}
	}
}

try {
	execSync("npx --yes agent-browser close", { stdio: "inherit" });
} catch (e) {}

console.log("\nScreenshot capture process finished!");
