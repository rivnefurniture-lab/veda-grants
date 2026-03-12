import { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Eye,
  TrendingUp,
  Shield,
  ArrowRight,
  Building2,
  Calendar,
  MapPin,
  FileText,
  Heart,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Про нас — Агенція економічного розвитку",
  description:
    "Дізнайтеся більше про агенцію ВЕДА — вашого надійного партнера у сфері грантового консалтингу. Команда, місія, цінності.",
  alternates: { canonical: "/pro-nas" },
};

const values = [
  {
    icon: Target,
    title: "Професіоналізм",
    description:
      "Глибока експертиза в грантових програмах та постійне вдосконалення знань команди.",
  },
  {
    icon: Eye,
    title: "Прозорість",
    description:
      "Відкрита комунікація на кожному етапі роботи. Клієнт завжди в курсі процесу та результатів.",
  },
  {
    icon: TrendingUp,
    title: "Результативність",
    description:
      "Орієнтація на конкретний результат — успішне отримання фінансування для вашого бізнесу.",
  },
  {
    icon: Shield,
    title: "Відповідальність",
    description:
      "Беремо на себе відповідальність за якість роботи та дотримання всіх дедлайнів.",
  },
];

const teamMembers = [
  {
    name: "Зеленчук Володимир Олександрович",
    role: "Засновник та директор",
    initials: "ЗВ",
    color: "from-navy to-navy-light",
    description:
      "Понад 10 років досвіду в сфері бізнес-консалтингу та грантового фінансування. Стратег, який бачить можливості там, де інші бачать перешкоди.",
  },
  {
    name: "Анна Петренко",
    role: "Менеджер грантових проєктів",
    initials: "АП",
    color: "from-gold-dark to-gold",
    description:
      "Спеціалізується на підготовці грантових заявок та супроводі проєктів. Успішно реалізувала десятки грантових проєктів для малого та середнього бізнесу.",
  },
  {
    name: "Максим Ткаченко",
    role: "Фінансовий аналітик",
    initials: "МТ",
    color: "from-navy-light to-navy",
    description:
      "Відповідає за фінансове моделювання, розробку бізнес-планів та бюджетування грантових проєктів. Забезпечує точність кожної цифри.",
  },
];

const companyDetails = [
  {
    icon: Building2,
    label: "Юридична назва",
    value: 'ТОВ "Агенція економічного розвитку ВЕДА"',
  },
  {
    icon: FileText,
    label: "ЄДРПОУ",
    value: "45088347",
  },
  {
    icon: Calendar,
    label: "Дата реєстрації",
    value: "2022 рік",
  },
  {
    icon: MapPin,
    label: "Юридична адреса",
    value: "м. Рівне, Рівненська область, Україна",
  },
  {
    icon: Briefcase,
    label: "Основний КВЕД",
    value: "70.22 — Консультування з питань комерційної діяльності та управління",
  },
];

export default function ProNasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="absolute inset-0 hero-grid-pattern" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[80px]" />

        <div className="relative z-10 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8">
              <svg viewBox="0 0 48 60" fill="none" className="w-3.5 h-4" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 0 L44 22 L24 28 Z" fill="#FFD95A" />
                <path d="M24 0 L4 22 L24 28 Z" fill="#F9A825" />
                <path d="M44 22 L24 60 L24 28 Z" fill="#B87000" />
                <path d="M4 22 L24 60 L24 28 Z" fill="#D4860A" />
              </svg>
              З 2022 року на ринку
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 font-heading">
              Про агенцію{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                ВЕДА
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Ваш надійний партнер у сфері грантового консалтингу та
              бізнес-розвитку. Допомагаємо перетворювати можливості на реальне
              фінансування.
            </p>
          </div>
        </div>

{/* clean edge — no fade */}
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="absolute -top-5 left-8 md:left-12">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-sm">
                <Heart className="w-5 h-5 text-navy" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4 font-heading">
              Наша місія
            </h2>
            <p className="text-lg md:text-xl text-text-light leading-relaxed">
              Наша місія — зробити грантове фінансування доступним для кожного
              українського підприємця. Ми віримо, що правильна фінансова
              підтримка може змінити долю бізнесу та громади.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="section-label bg-gold/10 text-gold w-fit">
                Наша історія
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6 font-heading">
                Від ідеї до результату
              </h2>
              <div className="space-y-4 text-text-light leading-relaxed">
                <p>
                  Агенцію ВЕДА було засновано у 2022 році в місті Рівне з чіткою
                  метою — допомогти українському бізнесу отримати доступ до
                  грантового фінансування. В умовах складних економічних викликів
                  ми побачили, що багато підприємців просто не знають про
                  можливості, які існують.
                </p>
                <p>
                  За час роботи наша команда накопичила глибоку експертизу як в
                  українських, так і в міжнародних грантових програмах. Ми
                  розуміємо вимоги донорів, знаємо тонкощі підготовки заявок та
                  допомагаємо бізнесам успішно проходити всі етапи конкурсного
                  відбору.
                </p>
                <p>
                  Сьогодні ВЕДА — це команда професіоналів, яка щодня працює над
                  тим, щоб зробити грантовий ландшафт зрозумілим та доступним.
                  Ми поєднуємо технології автоматизованого пошуку з індивідуальним
                  підходом до кожного клієнта.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-cream rounded-2xl p-7 border border-gray-100 card-hover">
                <div className="text-4xl font-extrabold text-gold mb-1">150+</div>
                <div className="text-text-light font-medium">
                  Грантових можливостей у базі
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-cream rounded-2xl p-7 border border-gray-100 card-hover">
                  <div className="text-3xl font-extrabold text-navy mb-1">50+</div>
                  <div className="text-sm text-text-light font-medium">
                    Задоволених клієнтів
                  </div>
                </div>
                <div className="bg-cream rounded-2xl p-7 border border-gray-100 card-hover">
                  <div className="text-3xl font-extrabold text-navy mb-1">
                    €10M+
                  </div>
                  <div className="text-sm text-text-light font-medium">
                    Залученого фінансування
                  </div>
                </div>
              </div>
              <div className="bg-cream rounded-2xl p-7 border border-gray-100 card-hover">
                <div className="text-4xl font-extrabold text-gold mb-1">3+</div>
                <div className="text-text-light font-medium">
                  Роки досвіду на ринку
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label bg-gold/10 text-gold mx-auto w-fit">
              Що нас визначає
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-heading">
              Наші цінності
            </h2>
            <div className="gold-line" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-7 card-hover border border-gray-100 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <value.icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-text-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label bg-navy/5 text-navy mx-auto w-fit">
              Люди ВЕДА
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-heading">
              Наша команда
            </h2>
            <div className="gold-line" />
            <p className="text-text-light max-w-2xl mx-auto">
              Професіонали, які щодня працюють над тим, щоб ваш бізнес отримав
              найкращі можливості для розвитку
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-cream/60 rounded-2xl p-8 card-hover border border-gray-100 text-center"
              >
                <div
                  className={cn(
                    "w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center mx-auto mb-5 shadow-md",
                    member.color
                  )}
                >
                  <span className="text-white font-bold text-xl">
                    {member.initials}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy mb-1">
                  {member.name}
                </h3>
                <div className="text-gold font-semibold text-sm mb-4">
                  {member.role}
                </div>
                <p className="text-sm text-text-light leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label bg-gold/10 text-gold mx-auto w-fit">
              Реквізити
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-heading">
              Інформація про компанію
            </h2>
            <div className="gold-line" />
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
            <div className="space-y-6">
              {companyDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center shrink-0">
                    <detail.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-sm text-text-light font-medium mb-0.5">
                      {detail.label}
                    </div>
                    <div className="text-navy font-semibold">
                      {detail.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-navy rounded-3xl p-8 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 hero-grid-pattern" />
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/[0.04] blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-gold/[0.03] blur-[60px]" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
                Готові до співпраці?
              </h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                Зв&apos;яжіться з нами для безкоштовної консультації. Разом
                знайдемо найкращі грантові можливості для вашого бізнесу.
              </p>
              <Link
                href="/kontakty"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-navy font-bold rounded-xl transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:-translate-y-0.5"
              >
                Зв&apos;язатися з нами
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
