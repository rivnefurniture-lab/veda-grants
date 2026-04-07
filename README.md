This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Production database (required for admin login)

The app uses PostgreSQL in production (SQLite is not supported on Vercel).

1. **Add Vercel Postgres**  
   In the [Vercel Dashboard](https://vercel.com/dashboard): your project → **Storage** → **Create Database** → **Postgres** → Create. Connect it to the `veda-grants` project. This sets `POSTGRES_URL` (or `DATABASE_URL`) in your env.

2. **Set `DATABASE_URL`**  
   In Project → **Settings** → **Environment Variables**, ensure `DATABASE_URL` is set. If Vercel added `POSTGRES_URL`, add:  
   `DATABASE_URL` = value of `POSTGRES_URL` (or the connection string from the Postgres tab).

3. **Run migrations and seed once** (from your machine with prod DB URL):
   ```bash
   DATABASE_URL="postgresql://..." npx prisma migrate deploy
   DATABASE_URL="postgresql://..." npm run db:seed
   ```
   Use the connection string from Vercel Postgres (Storage → your DB → .env tab).

4. **Redeploy** the project so the new env and DB are used.

**Admin login:** `admin@veda.agency` / `admin123` (change the password after first login in production.)

### Local development

Use a PostgreSQL database. Set `DATABASE_URL` in `.env` to your local or cloud Postgres URL, then:

```bash
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
