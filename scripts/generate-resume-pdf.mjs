import { execSync } from "child_process";
import fs from "fs";

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Cameron Stewart — Resume</title>
<style>
  @page {
    size: letter;
    margin: 0.42in 0.48in;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #111827;
    background: #ffffff;
    font-size: 8.75pt;
    line-height: 1.38;
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: #111827;
    text-decoration: none;
  }
  .header {
    text-align: center;
    border-bottom: 1.5px solid #111827;
    padding-bottom: 6pt;
    margin-bottom: 8pt;
  }
  .name {
    font-size: 20pt;
    font-weight: 800;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #000000;
    line-height: 1;
    margin-bottom: 3pt;
  }
  .title {
    font-size: 9.5pt;
    font-weight: 600;
    color: #2563eb;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 4pt;
  }
  .contact {
    font-size: 8.25pt;
    color: #4b5563;
    display: flex;
    justify-content: center;
    gap: 8pt;
  }
  .contact span.sep {
    color: #9ca3af;
  }

  .section {
    margin-bottom: 7.5pt;
  }
  .section-title {
    font-size: 9.25pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #111827;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 1.5pt;
    margin-bottom: 4pt;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .summary {
    color: #374151;
    font-size: 8.5pt;
    line-height: 1.35;
    text-align: justify;
  }

  /* Skills - [Category]: Skill 1, Skill 2 */
  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 1.8pt;
  }
  .skill-line {
    font-size: 8.5pt;
    line-height: 1.32;
    color: #374151;
  }
  .skill-cat {
    font-weight: 700;
    color: #111827;
  }

  /* Experience */
  .exp-item {
    margin-bottom: 5.5pt;
  }
  .exp-item:last-child {
    margin-bottom: 0;
  }
  .exp-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1.5pt;
  }
  .exp-role-co {
    font-size: 8.75pt;
  }
  .exp-role {
    font-weight: 700;
    color: #111827;
  }
  .exp-company {
    font-weight: 600;
    color: #2563eb;
  }
  .exp-date {
    font-size: 8pt;
    font-weight: 500;
    color: #6b7280;
  }
  ul.bullets {
    list-style: disc;
    padding-left: 12pt;
    margin: 0;
  }
  ul.bullets li {
    font-size: 8.25pt;
    line-height: 1.3;
    color: #374151;
    margin-bottom: 1.5pt;
  }
  ul.bullets li strong {
    color: #111827;
  }

  /* Education */
  .edu-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 8.5pt;
    margin-bottom: 2pt;
  }
  .edu-deg {
    font-weight: 700;
    color: #111827;
  }
  .edu-inst {
    color: #4b5563;
  }
</style>
</head>
<body>

<header class="header">
  <h1 class="name">Cameron Stewart</h1>
  <div class="title">Full Stack Software Engineer & Edge Architect</div>
  <div class="contact">
    <span>Searcy, AR</span>
    <span class="sep">&bull;</span>
    <a href="tel:501-827-1551">501-827-1551</a>
    <span class="sep">&bull;</span>
    <a href="mailto:camstewart7@gmail.com">camstewart7@gmail.com</a>
    <span class="sep">&bull;</span>
    <a href="https://cgstewart.dev">cgstewart.dev</a>
    <span class="sep">&bull;</span>
    <a href="https://linkedin.com/in/camgstewart">linkedin.com/in/camgstewart</a>
  </div>
</header>

<section class="section">
  <h2 class="section-title">Summary</h2>
  <p class="summary">
    Full stack software engineer with 5+ years of experience designing, building, and operating high-performance consumer applications, distributed systems, and cloud infrastructure. Strong technical background spanning TypeScript, React, Node.js, and Hono, alongside modern C#/.NET and relational databases. Proven track record architecting edge compute on Cloudflare, scalable cloud infrastructure on AWS, and reliable payment systems with Stripe. Driven by high engineering velocity, automated CI/CD pipelines, and rigorous production correctness.
  </p>
</section>

<section class="section">
  <h2 class="section-title">Technical Skills</h2>
  <div class="skills-list">
    <div class="skill-line">
      <span class="skill-cat">Languages &amp; Runtimes:</span> TypeScript, JavaScript, C#, .NET, Python, Node.js, SQL, Bun
    </div>
    <div class="skill-line">
      <span class="skill-cat">Frontend &amp; Frameworks:</span> React, Next.js, TanStack Start, React Native (Expo), Astro, Hono, Tailwind CSS, shadcn/ui
    </div>
    <div class="skill-line">
      <span class="skill-cat">Edge &amp; Cloud Infrastructure:</span> Cloudflare (Workers, D1, R2, Durable Objects, Queues, Workflows), Alchemy, AWS (Lambda, CloudFront, S3, ECS), Docker, Vercel
    </div>
    <div class="skill-line">
      <span class="skill-cat">Databases &amp; Storage:</span> Cloudflare D1 (SQLite), Postgres, Redis, SQL Server, Convex
    </div>
    <div class="skill-line">
      <span class="skill-cat">Commerce &amp; AI Systems:</span> Stripe (Connect, Custom Payouts, Webhooks), Gemini Vision API, Workers AI, Polar, Shippo, Resend
    </div>
    <div class="skill-line">
      <span class="skill-cat">DevOps &amp; Correctness:</span> GitHub Actions CI/CD, Oxlint, Turborepo, Idempotency pipelines, Transactional outbox patterns, Sentry, PostHog
    </div>
  </div>
</section>

<section class="section">
  <h2 class="section-title">Professional Experience</h2>

  <div class="exp-item">
    <div class="exp-header">
      <div class="exp-role-co">
        <span class="exp-role">Lead Software Engineer</span> &mdash; <span class="exp-company">Rocktown Labs</span>
      </div>
      <span class="exp-date">Jan 2023 &ndash; Present &bull; Searcy, AR (Remote)</span>
    </div>
    <ul class="bullets">
      <li>Architect, deploy, and operate live consumer products, multi-agent AI tooling, and business infrastructure with PR-driven automated workflows.</li>
      <li>Built <strong>SoundKit</strong>: creator-first music platform with Stripe Connect payouts, Cloudflare Durable Objects audio rooms, Postgres, and WebCodecs playback.</li>
      <li>Engineered <strong>Big Brain Shelf</strong>: children&rsquo;s bookstore and multi-agent AI generation factory running on Astro + Cloudflare Workers with automated vision QC judges and Shippo.</li>
      <li>Created <strong>QuickCalAI</strong>: calendar automation tool with a Model Context Protocol (MCP) server exposing tools to external AI agents.</li>
      <li>Developed <strong>GigStax</strong>: gig economy tax tool with Cloudflare Workflows, Gemini vision extraction, and Polar billing.</li>
    </ul>
  </div>

  <div class="exp-item">
    <div class="exp-header">
      <div class="exp-role-co">
        <span class="exp-role">Full Stack Developer</span> &mdash; <span class="exp-company">Dead Party Media &amp; Arkansas Music Awards</span>
      </div>
      <span class="exp-date">Jan 2024 &ndash; Present &bull; Contract</span>
    </div>
    <ul class="bullets">
      <li>Architect and maintain a Next.js 16 Turborepo monorepo and Expo mobile app powering an arts publication and live events ecosystem.</li>
      <li>Built high-throughput backend APIs with Drizzle over Postgres, Clerk auth, and Stripe ticketing supporting 20+ live productions.</li>
      <li>Implemented multi-publication editorial permission governance for writers, editors, and venue administrators.</li>
    </ul>
  </div>

  <div class="exp-item">
    <div class="exp-header">
      <div class="exp-role-co">
        <span class="exp-role">Realtor &amp; Software Automation Developer</span> &mdash; <span class="exp-company">Fathom Realty</span>
      </div>
      <span class="exp-date">Aug 2021 &ndash; Jan 2023 &bull; Contract</span>
    </div>
    <ul class="bullets">
      <li>Built custom lead-generation scrapers and data aggregation pipelines for real estate data across AR, MO, and LA.</li>
      <li>Constructed internal recruiting dashboards using Next.js and React, automating broker outreach and prospect management.</li>
    </ul>
  </div>

  <div class="exp-item">
    <div class="exp-header">
      <div class="exp-role-co">
        <span class="exp-role">Web Developer &amp; Software Administrator</span> &mdash; <span class="exp-company">ATA International</span>
      </div>
      <span class="exp-date">Oct 2020 &ndash; Jul 2021 &bull; Little Rock, AR</span>
    </div>
    <ul class="bullets">
      <li>Developed and maintained <strong>C#/.NET backend services</strong> and SQL Server database schemas for an international platform supporting 130,000+ active users.</li>
      <li>Engineered responsive instructor and student portal interfaces using React and modern JavaScript.</li>
      <li>Implemented secure remote video testing workflows to preserve school operations and rank testing during COVID-19.</li>
    </ul>
  </div>

  <div class="exp-item">
    <div class="exp-header">
      <div class="exp-role-co">
        <span class="exp-role">Digital Tech Support Specialist</span> &mdash; <span class="exp-company">Arkansas Democrat-Gazette</span>
      </div>
      <span class="exp-date">Dec 2018 &ndash; Jan 2020 &bull; Little Rock, AR</span>
    </div>
    <ul class="bullets">
      <li>Provided phone and in-person technical support for 3,000+ customers, diagnosing hardware, software, and connectivity issues with a 95% satisfaction rating.</li>
      <li>Led technical setup and support for a 40-person call center, standardizing troubleshooting docs and reducing average resolution time by 30%.</li>
    </ul>
  </div>

  <div class="exp-item">
    <div class="exp-header">
      <div class="exp-role-co">
        <span class="exp-role">Web Developer</span> &mdash; <span class="exp-company">Design Group Marketing</span>
      </div>
      <span class="exp-date">Apr 2019 &ndash; Oct 2019 &bull; Little Rock, AR (Contract)</span>
    </div>
    <ul class="bullets">
      <li>Built React, WordPress, HTML/CSS, and JavaScript websites and mockups for marketing-firm clients across multiple industries.</li>
      <li>Collaborated hand-in-hand with designers and the marketing team to deliver client campaigns and maintain 10+ client web properties.</li>
    </ul>
  </div>
</section>

</body>
</html>`;

const tempHtml = "/tmp/cameron-stewart-resume.html";
const outPdf = "/Users/newrgm/dev/RocktownLabs/projects/cgstewart/public/Cameron-Stewart-Resume.pdf";

fs.writeFileSync(tempHtml, htmlContent, "utf8");

console.log("Generating 1-page PDF via headless Chrome...");
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const cmd = `"${chromePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${outPdf}" "${tempHtml}"`;

execSync(cmd, { stdio: "inherit" });
console.log("PDF generated successfully at:", outPdf);
