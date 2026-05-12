import { PrismaClient } from "@prisma/client";

function looksLikePostgres(url: string | undefined): boolean {
  return !!url && (url.startsWith("postgres://") || url.startsWith("postgresql://"));
}

if (!looksLikePostgres(process.env.DATABASE_URL)) {
  if (looksLikePostgres(process.env.POSTGRES_PRISMA_URL)) {
    process.env.DATABASE_URL = process.env.POSTGRES_PRISMA_URL;
  } else if (looksLikePostgres(process.env.POSTGRES_URL)) {
    process.env.DATABASE_URL = process.env.POSTGRES_URL;
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
