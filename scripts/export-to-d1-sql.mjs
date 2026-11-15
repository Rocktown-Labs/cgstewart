import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";

const db = new DatabaseSync("/Users/newrgm/dev/RocktownLabs/projects/cgstewart/data.db");

// Get all table names, excluding sqlite internal and fts shadow tables
const tables = db
  .prepare("SELECT name, sql FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_emdash_fts_%'")
  .all();

const out = [];

for (const t of tables) {
  out.push(`${t.sql};`);
  const rows = db.prepare(`SELECT * FROM "${t.name}"`).all();
  for (const r of rows) {
    const keys = Object.keys(r);
    const cols = keys.map(k => `"${k}"`).join(", ");
    const vals = keys.map(k => {
      const v = r[k];
      if (v === null || v === undefined) return "NULL";
      if (typeof v === "number") return v;
      // Escape single quotes
      const str = String(v).replace(/'/g, "''");
      return `'${str}'`;
    }).join(", ");
    out.push(`INSERT OR REPLACE INTO "${t.name}" (${cols}) VALUES (${vals});`);
  }
}

// Get indices (excluding internal/fts)
const indices = db
  .prepare("SELECT sql FROM sqlite_master WHERE type = 'index' AND sql IS NOT NULL AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_emdash_fts_%'")
  .all();

for (const idx of indices) {
  out.push(`${idx.sql};`);
}

fs.writeFileSync("/Users/newrgm/dev/RocktownLabs/projects/cgstewart/clean-d1-dump.sql", out.join("\n") + "\n");
console.log("clean-d1-dump.sql successfully created! Statements:", out.length);
