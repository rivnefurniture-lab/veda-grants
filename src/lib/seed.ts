import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const sampleGrants = [
  {
    title: "Грант до €200,000 на впровадження AI та IoT рішень",
    description: "Програма підтримки малого та середнього бізнесу для впровадження інноваційних технологій штучного інтелекту та Інтернету речей у виробничі процеси. Фінансування покриває розробку, тестування та масштабування рішень.",
    amount: "до €200,000",
    amountUsd: 200000,
    deadline: new Date("2026-05-04"),
    sourceUrl: "https://example.com/grant-ai-iot",
    source: "grant.market",
    category: "Технології",
    region: "Вся Україна",
    sphere: "IT та інновації",
    status: "APPROVED" as const,
    score: 85,
    publishedAt: new Date(),
  },
  {
    title: "Мікрогрант 75,000 грн для майбутніх ФОП",
    description: "Державна програма підтримки підприємництва. Грант надається на відкриття власної справи для зареєстрованих безробітних, які пройшли навчання з основ підприємництва.",
    amount: "75,000 грн",
    amountUsd: 1800,
    deadline: new Date("2026-06-30"),
    sourceUrl: "https://example.com/microgrant-fop",
    source: "granty.org.ua",
    category: "Підприємництво",
    region: "Вся Україна",
    sphere: "Малий бізнес",
    status: "APPROVED" as const,
    score: 92,
    publishedAt: new Date(),
  },
  {
    title: "Грант до 1 млн грн на розвиток культурних маршрутів",
    description: "Фінансування проєктів з розвитку культурного туризму, створення нових туристичних маршрутів та покращення інфраструктури для відвідувачів історичних та культурних пам'яток.",
    amount: "до 1,000,000 грн",
    amountUsd: 24000,
    deadline: new Date("2026-04-05"),
    sourceUrl: "https://example.com/cultural-routes",
    source: "prostir.ua",
    category: "Культура",
    region: "Рівненська область",
    sphere: "Туризм",
    status: "APPROVED" as const,
    score: 78,
    publishedAt: new Date(),
  },
  {
    title: "Програма єРобота: грант до 250,000 грн",
    description: "Державна програма мікро- та малих грантів для створення або розвитку бізнесу. Надається на придбання обладнання, сировини, оренду приміщень та інші бізнес-потреби.",
    amount: "до 250,000 грн",
    amountUsd: 6000,
    deadline: new Date("2026-12-31"),
    sourceUrl: "https://example.com/yerobota",
    source: "chaszmin.com.ua",
    category: "Підприємництво",
    region: "Вся Україна",
    sphere: "Малий бізнес",
    status: "APPROVED" as const,
    score: 95,
    publishedAt: new Date(),
  },
  {
    title: "Грант до €500,000 для стартапів у сталому виробництві",
    description: "Європейська програма підтримки стартапів, які розробляють екологічно чисті технології виробництва. Покриває R&D, прототипування та вихід на ринок.",
    amount: "до €500,000",
    amountUsd: 500000,
    deadline: new Date("2026-07-15"),
    sourceUrl: "https://example.com/sustainable-startups",
    source: "grant.market",
    category: "Екологія",
    region: "Вся Україна",
    sphere: "Зелені технології",
    status: "APPROVED" as const,
    score: 88,
    publishedAt: new Date(),
  },
  {
    title: "Підтримка агробізнесу: пільговий кредит до 7 млн грн",
    description: "Програма пільгового кредитування для аграрних підприємств. Компенсація відсоткової ставки до 0% річних. Кошти можна використати на техніку, насіння, добрива та розвиток інфраструктури.",
    amount: "до 7,000,000 грн",
    amountUsd: 170000,
    deadline: new Date("2026-09-01"),
    sourceUrl: "https://example.com/agro-credit",
    source: "granty.org.ua",
    category: "Агросектор",
    region: "Вся Україна",
    sphere: "Сільське господарство",
    status: "APPROVED" as const,
    score: 80,
    publishedAt: new Date(),
  },
  {
    title: "Грант на розвиток креативної економіки",
    description: "Підтримка проєктів у сфері дизайну, медіа, мистецтва та креативних індустрій. Фінансування на створення творчих просторів, навчальних програм та культурних подій.",
    amount: "до €50,000",
    amountUsd: 50000,
    deadline: new Date("2026-05-20"),
    sourceUrl: "https://example.com/creative-economy",
    source: "prostir.ua",
    category: "Культура",
    region: "Рівненська область",
    sphere: "Креативні індустрії",
    status: "PENDING" as const,
    score: 72,
  },
  {
    title: "Інвестиції до $220,000 для технологічних стартапів",
    description: "Акселератор для українських tech-стартапів з можливістю отримання інвестицій. Включає менторство, нетворкінг та доступ до міжнародних ринків.",
    amount: "до $220,000",
    amountUsd: 220000,
    deadline: new Date("2026-06-10"),
    sourceUrl: "https://example.com/tech-accelerator",
    source: "grant.market",
    category: "Технології",
    region: "Вся Україна",
    sphere: "IT та інновації",
    status: "PENDING" as const,
    score: 90,
  },
];

async function main() {
  // Create admin user
  const passwordHash = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@weda.com" },
    update: {},
    create: {
      email: "admin@weda.com",
      passwordHash,
      name: "Адміністратор",
    },
  });

  // Create sample grants
  for (const grant of sampleGrants) {
    await prisma.grant.upsert({
      where: { sourceUrl: grant.sourceUrl },
      update: {},
      create: grant,
    });
  }

  // Create sample blog post
  await prisma.blogPost.upsert({
    where: { slug: "yak-otrymaty-grant-2026" },
    update: {},
    create: {
      title: "Як отримати грант у 2026 році: покроковий гід",
      slug: "yak-otrymaty-grant-2026",
      excerpt: "Детальна інструкція з підготовки грантової заявки: від пошуку відповідної програми до успішного подання документів.",
      content: "Отримання гранту — це структурований процес, який потребує ретельної підготовки...",
      published: true,
      publishedAt: new Date(),
    },
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
