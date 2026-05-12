import { spawnSync } from "node:child_process";

const url = process.env.DATABASE_URL;
if (!url) {
  console.log("⚠️  DATABASE_URL not set — skipping prisma migrate deploy & seed.");
  console.log("    Set DATABASE_URL in Vercel env vars to enable database features.");
  process.exit(0);
}

console.log("▶ prisma migrate deploy");
let r = spawnSync("npx", ["prisma", "migrate", "deploy"], { stdio: "inherit" });
if (r.status !== 0) process.exit(r.status ?? 1);

console.log("▶ seed");
r = spawnSync("npx", ["tsx", "src/lib/seed.ts"], { stdio: "inherit" });
if (r.status !== 0) {
  console.log("⚠️  Seed failed but continuing build.");
}
