import { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  FileText,
  BarChart3,
  Shield,
  GraduationCap,
  Users,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Filter,
  FolderOpen,
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Послуги — ВЕДА | Грантовий консалтинг",
  description:
    "Комплексний підхід до грантового фінансування: пошук грантів, написання заявок, бізнес-планування, супровід проєктів, навчання та пошук партнерів.",
};

const services = [
  {
    icon: Search,
    title: "Пошук грантів",
    description:
      "Моніторимо сотні грантових програм щодня. Наша автоматизована система агрегує можливості з провідних українських та міжнародних платформ, а експерти підбирають найкращі варіанти саме для вашого бізнесу.",
    features: [
      "Автоматичний моніторинг 4+ джерел",
      "AI-аналіз релевантності",
      "Персональні рекомендації",
      "Щоденні оновлення бази",
    ],
  },
  {
    icon: FileText,
    title: "Написання грантових заявок",
    description:
      "Професійно готуємо грантові заявки, які перемагають. Наші експерти знають вимоги кожної програми та забезпечують максимальну відповідність критеріям оцінювання.",
    features: [
      "Аналіз вимог програми",
      "Структурування проєкту",
      "Підготовка бюджету",
      "Редагування та вичитка",
    ],
  },
  {
    icon: BarChart3,
    title: "Бізнес-планування",
    description:
      "Розробляємо детальні бізнес-плани, які відповідають стандартам грантових програм. Фінансові моделі, маркетингові стратегії та плани розвитку.",
    features: [
      "Фінансове моделювання",
      "Маркетингова стратегія",
      "Аналіз ринку",
      "SWOT-аналіз",
    ],
  },
  {
    icon: Shield,
    title: "Супровід проєктів",
    description:
      "Забезпечуємо повний цикл супроводу — від подання заявки до фінального звітування. Контролюємо дедлайни, готуємо звіти та комунікуємо з донорами.",
    features: [
      "Моніторинг дедлайнів",
      "Підготовка звітів",
      "Комунікація з донорами",
      "Фінансовий контроль",
    ],
  },
  {
    icon: GraduationCap,
    title: "Навчання та консалтинг",
    description:
      "Проводимо тренінги та воркшопи з грантрайтингу для команд та організацій. Навчаємо самостійно знаходити та вигравати гранти.",
    features: [
      "Тренінги з грантрайтингу",
      "Стратегічне планування",
      "Індивідуальний коучинг",
      "Онлайн-курси",
    ],
  },
  {
    icon: Users,
    title: "Пошук партнерів",
    description:
      "Допомагаємо знайти надійних партнерів для консорціумних заявок на міжнародні гранти. Формуємо ефективні партнерства для спільних проєктів.",
    features: [
      "База партнерів",
      "Формування консорціумів",
      "MoU та NDA",
      "Міжнародна мережа",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Консультація",
    description: "Безкоштовно аналізуємо ваш бізнес та потреби",
  },
  {
    number: "02",
    icon: Filter,
    title: "Підбір програм",
    description: "Знаходимо оптимальні грантові можливості",
  },
  {
    number: "03",
    icon: FolderOpen,
    title: "Підготовка документів",
    description: "Готуємо заявку та всі необхідні матеріали",
  },
  {
    number: "04",
    icon: Headphones,
    title: "Супровід",
    description: "Подаємо заявку та супроводжуємо до результату",
  },
];

export default function PoslugyPage() {
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
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              6 напрямків роботи
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Наші{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                послуги
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Комплексний підхід до грантового фінансування — від пошуку
              можливостей до успішної реалізації проєктів
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map((service, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={service.title}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden card-hover"
              >
                <div
                  className={cn(
                    "grid md:grid-cols-5 gap-0",
                    isReversed && "md:direction-rtl"
                  )}
                >
                  {/* Content side */}
                  <div
                    className={cn(
                      "md:col-span-3 p-8 md:p-10",
                      isReversed && "md:order-2 md:direction-ltr"
                    )}
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-sm shrink-0">
                        <service.icon className="w-7 h-7 text-navy" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-navy">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-text-light leading-relaxed mb-6 text-lg">
                      {service.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2.5"
                        >
                          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                          <span className="text-sm font-medium text-text">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual side */}
                  <div
                    className={cn(
                      "md:col-span-2 gradient-navy relative min-h-[200px] md:min-h-0 flex items-center justify-center",
                      isReversed && "md:order-1"
                    )}
                  >
                    <div className="absolute inset-0 hero-grid-pattern" />
                    <div className="relative">
                      <div className="w-24 h-24 rounded-3xl bg-white/[0.06] backdrop-blur-sm flex items-center justify-center border border-white/[0.08]">
                        <service.icon className="w-12 h-12 text-gold" />
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 text-7xl font-extrabold text-white/[0.03]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-label bg-gold/10 text-gold mx-auto w-fit">
              Простий процес
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Як ми працюємо
            </h2>
            <div className="gold-line" />
            <p className="text-text-light max-w-2xl mx-auto">
              Чотири простих кроки від першого звернення до успішного отримання
              гранту
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {processSteps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gray-100 z-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold" />
                  </div>
                )}

                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full gradient-navy flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <span className="text-gold font-bold text-2xl">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-navy rounded-3xl p-8 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 hero-grid-pattern" />
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/[0.04] blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-gold/[0.03] blur-[60px]" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Потрібна допомога з грантом?
              </h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                Отримайте безкоштовну консультацію від наших експертів. Ми
                допоможемо визначити найкращу стратегію фінансування для вашого
                бізнесу.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/kontakty"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-navy font-bold rounded-xl transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-xl hover:-translate-y-0.5"
                >
                  Безкоштовна консультація
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/granty"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Переглянути гранти
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
