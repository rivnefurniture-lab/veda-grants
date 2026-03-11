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
  Award,
  Heart,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Про нас — ВЕДА | Агенція економічного розвитку",
  description:
    "Дізнайтеся більше про агенцію ВЕДА — вашого надійного партнера у сфері грантового консалтингу. Команда, місія, цінності.",
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
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #f9a825 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, #ffd95a 0%, transparent 50%)`,
          }}
        />
        <div className="absolute top-20 right-[15%] w-48 h-48 rounded-full border border-gold/10" />
        <div className="absolute bottom-16 left-[10%] w-32 h-32 rounded-full border border-gold/10" />

        <div className="relative z-10 section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-gold text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              З 2022 року на ринку
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Про агенцію{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                ВЕДА
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Ваш надійний партнер у сфері грантового консалтингу та
              бізнес-розвитку. Допомагаємо перетворювати можливості на реальне
              фінансування.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-border">
            <div className="absolute -top-5 left-8 md:left-12">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center shadow-md">
                <Heart className="w-5 h-5 text-navy" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
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
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold font-semibold text-sm uppercase tracking-wider">
                Наша історія
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-6">
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
              <div className="bg-cream rounded-2xl p-6 card-hover border border-border">
                <div className="text-4xl font-bold text-gold mb-1">150+</div>
                <div className="text-text-light">
                  Грантових можливостей у базі
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-cream rounded-2xl p-6 card-hover border border-border">
                  <div className="text-3xl font-bold text-navy mb-1">50+</div>
                  <div className="text-sm text-text-light">
                    Задоволених клієнтів
                  </div>
                </div>
                <div className="bg-cream rounded-2xl p-6 card-hover border border-border">
                  <div className="text-3xl font-bold text-navy mb-1">
                    €10M+
                  </div>
                  <div className="text-sm text-text-light">
                    Залученого фінансування
                  </div>
                </div>
              </div>
              <div className="bg-cream rounded-2xl p-6 card-hover border border-border">
                <div className="text-4xl font-bold text-gold mb-1">3+</div>
                <div className="text-text-light">
                  Роки досвіду на ринку
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold font-semibold text-sm uppercase tracking-wider">
              Що нас визначає
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">
              Наші цінності
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 card-hover border border-border text-center"
              >
                <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center mx-auto mb-4 shadow-md">
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold font-semibold text-sm uppercase tracking-wider">
              Люди ВЕДА
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">
              Наша команда
            </h2>
            <p className="text-text-light mt-4 max-w-2xl mx-auto">
              Професіонали, які щодня працюють над тим, щоб ваш бізнес отримав
              найкращі можливості для розвитку
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-cream rounded-2xl p-8 card-hover border border-border text-center"
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center mx-auto mb-5 shadow-lg",
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
                <div className="text-gold font-medium text-sm mb-4">
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold font-semibold text-sm uppercase tracking-wider">
              Реквізити
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">
              Інформація про компанію
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-border">
            <div className="space-y-6">
              {companyDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-start gap-4 pb-6 border-b border-border last:border-0 last:pb-0"
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
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-navy rounded-3xl p-8 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gold/5 translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Готові до співпраці?
              </h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                Зв&apos;яжіться з нами для безкоштовної консультації. Разом
                знайдемо найкращі грантові можливості для вашого бізнесу.
              </p>
              <Link
                href="/kontakty"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-navy font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5"
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
