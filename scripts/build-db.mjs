import { spawnSync } from "node:child_process";

function looksLikePostgres(url) {
  return !!url && (url.startsWith("postgres://") || url.startsWith("postgresql://"));
}
if (!looksLikePostgres(process.env.DATABASE_URL)) {
  if (looksLikePostgres(process.env.POSTGRES_PRISMA_URL)) {
    process.env.DATABASE_URL = process.env.POSTGRES_PRISMA_URL;
  } else if (looksLikePostgres(process.env.POSTGRES_URL)) {
    process.env.DATABASE_URL = process.env.POSTGRES_URL;
  }
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.log("⚠️  No database URL detected — skipping prisma migrate & seed.");
  console.log("    Connect a Postgres in Vercel → Storage and redeploy.");
  process.exit(0);
}

const safeUrl = url.replace(/:[^:@/]+@/, ":***@");
console.log(`▶ Using DATABASE_URL = ${safeUrl}`);

console.log("▶ prisma migrate deploy");
let r = spawnSync("npx", ["prisma", "migrate", "deploy"], {
  stdio: "inherit",
  env: process.env,
});
if (r.status !== 0) {
  console.log("⚠️  Migration failed, but continuing build.");
}

console.log("▶ seed (idempotent — safe to run on every deploy)");
r = spawnSync("npx", ["tsx", "src/lib/seed.ts"], {
  stdio: "inherit",
  env: process.env,
});
if (r.status !== 0) {
  console.log("⚠️  Seed failed but continuing build.");
}
