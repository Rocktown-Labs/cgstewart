# cgstewart.dev

Personal portfolio, project showcase, and technical blog of Cameron Stewart (Full Stack Software Engineer & Solo Founder at Rocktown Labs).

Live deployment: [cgstewart.rocktown-labs.workers.dev](https://cgstewart.rocktown-labs.workers.dev) / [cgstewart.dev](https://cgstewart.dev)

---

## Overview

`cgstewart.dev` is a high-performance personal portfolio and engineering blog rebuilt from the ground up on Astro and Cloudflare's edge platform. The site features an embedded CMS via EmDash, serverless SQLite persistence on Cloudflare D1, a gated resume download flow, dynamic project case studies, and responsive dark/light styling.

---

## Tech Stack

- **Framework:** [Astro 7](https://astro.build/) (Server-Side Rendered mode)
- **CMS:** [EmDash](https://github.com/emdash-cms/emdash) (embedded edge CMS)
- **Runtime:** [Cloudflare Workers](https://workers.cloudflare.com/) via `@astrojs/cloudflare`
- **Database:** [Cloudflare D1](https://developers.cloudflare.com/d1/) (distributed edge SQLite)
- **Session / Cache:** Cloudflare KV (`SESSION` binding)
- **Media & Images:** Cloudflare Images (`IMAGES` binding) and local asset pipeline
- **UI & Components:** Astro components, React 19, Lucide icons, `@ridemountainpig/svgl-react`
- **Styling:** Custom design token system with dark and light theme support
- **Package Manager:** pnpm with workspace patches

---

## Key Features

### 1. Project Showcase (`/work` and `/work/[slug]`)
- Dynamic project gallery featuring web apps, SaaS products, and open-source tooling.
- Categorized by studio, client, and venture.
- Individual case study pages rendered from structured content with GitHub repo links and live demo targets.

### 2. Engineering Writing (`/writing` and `/writing/[slug]`)
- Technical articles covering distributed systems, edge architectures, Python tooling, and full stack workflows.
- Taxonomies and tag-based filtering.
- Full RSS feed generation at `/rss.xml` and automated sitemap at `/sitemap.xml`.

### 3. Tech Arsenal
- Curated grid of languages, frameworks, cloud infrastructure, databases, and AI tooling.
- Categorized display with SVG icons and proficiency levels.

### 4. Gated Resume Download Modal (`/resume`)
- In-place modal form capturing recruiter and hiring manager contact details (name, email, phone).
- Server-side validation with real-time edge storage directly into Cloudflare D1 (`resume_requests` table).
- Instant delivery of the verified PDF resume (`/Cameron-Stewart-Resume.pdf`).

### 5. Embedded Admin Studio (`/_emdash/admin`)
- Built-in headless CMS admin accessible directly within the deployed Worker.
- Passwordless WebAuthn / Passkey authentication (Touch ID, Face ID, hardware keys).
- Rich content editing with drafts, revisions, and media management.

---

## Project Structure

```
├── .agents/             # Agent skills and CMS documentation references
├── patches/             # pnpm patches (@emdash-cms/admin image handling)
├── public/              # Static assets, favicon, resume PDF, and project screenshots
│   └── images/
│       ├── projects/    # Project preview hero screenshots
│       └── writing/     # Blog article illustrations and migration comparison captures
├── scripts/             # Build and migration utility scripts
│   ├── add-migration-post.mjs
│   ├── capture-screenshots.mjs
│   ├── export-to-d1-sql.mjs
│   └── generate-resume-pdf.mjs
├── seed/
│   └── seed.json        # EmDash schema definitions, collections, taxonomies, and initial seed
├── src/
│   ├── components/      # UI components (ProjectCard, TechIcon, etc.)
│   ├── layouts/         # Base layout with theme toggle, navigation, and SEO metadata
│   ├── pages/           # Astro routes
│   │   ├── api/         # Serverless API routes (e.g. resume-request.ts)
│   │   ├── work/        # Project index and slug case studies
│   │   ├── writing/     # Blog index and slug posts
│   │   ├── about.astro  # About page
│   │   ├── contact.astro# Contact page
│   │   ├── index.astro  # Homepage with hero, tech arsenal, and featured work
│   │   ├── resume.astro # Interactive resume view and download trigger
│   │   ├── rss.xml.ts   # RSS feed generator
│   │   └── sitemap.xml.ts # Dynamic sitemap generator
│   └── styles/          # CSS custom properties and theme definitions
├── astro.config.mjs     # Astro configuration with Cloudflare adapter and EmDash plugin
├── wrangler.jsonc       # Cloudflare Workers configuration, D1 database bindings, and assets
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/) (`corepack enable && corepack prepare pnpm@latest --activate`)
- [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cgRGM/cgstewart.git
   cd cgstewart
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run local development:
   ```bash
   pnpm dev
   ```
   The site will be available at `http://localhost:4321`.

4. Access the EmDash Admin locally:
   Navigate to `http://localhost:4321/_emdash/admin` to manage content and inspect collections.

---

## Building and Deployment

### Type Checking & Build

```bash
pnpm typecheck
pnpm build
```

### Deploying to Cloudflare Workers

Deploy the production application to Cloudflare Workers:

```bash
pnpm wrangler deploy
```

The Worker connects directly to the remote Cloudflare D1 database (`cgstewart-db`) and Cloudflare KV namespaces configured in `wrangler.jsonc`.

---

## Content Collections in EmDash

The site uses three primary EmDash collections defined in [seed/seed.json](seed/seed.json):

1. **Projects (`projects`)**:
   - Fields: `title`, `category`, `client`, `year`, `summary`, `github_repo`, `live_url`, `featured`, `featured_image`, `content`.
   - Supports drafts, revisions, preview, full-text search, and SEO tags.
2. **Writing (`posts`)**:
   - Fields: `title`, `summary`, `published_date`, `content`.
   - Supports drafts, revisions, preview, and SEO tags.
3. **Technologies (`technologies`)**:
   - Fields: `name`, `category`, `icon`, `order`.

---

## License

Personal portfolio repository. All rights reserved.
