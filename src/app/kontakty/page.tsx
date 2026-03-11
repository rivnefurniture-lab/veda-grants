import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Контакти | ВЕДА",
  description:
    "Зв'яжіться з нами для консультації щодо грантів та фінансування. Телефон, email, адреса в Рівному.",
};

const contactInfo = [
  {
    icon: Phone,
    label: "Телефон",
    value: "+38 (067) 216-05-59",
    href: "tel:+380672160559",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@veda.agency",
    href: "mailto:info@veda.agency",
  },
  {
    icon: MapPin,
    label: "Адреса",
    value: "м. Рівне, пр. Миру, Рівненська обл., Україна",
    href: null,
  },
  {
    icon: Clock,
    label: "Графік роботи",
    value: "Пн-Пт: 9:00-18:00",
    href: null,
  },
];

export default function ContactsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="absolute inset-0 hero-grid-pattern" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[80px]" />

        <div className="relative z-10 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8">
              <MessageCircle className="w-4 h-4" />
              Контакти
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Зв&#39;яжіться{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                з нами
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
              Залиште заявку і ми зв&#39;яжемося з вами для безкоштовної
              консультації
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">
                  Наші контакти
                </h2>
                <p className="text-text-light">
                  Оберіть зручний спосіб зв&#39;язку або заповніть форму, і ми
                  відповімо найближчим часом.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-4 bg-white rounded-2xl p-5 card-hover border border-gray-100">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-text-light text-sm mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-text font-semibold">{item.value}</p>
                      </div>
                    </div>
                  );

                  if (item.href) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block hover:no-underline"
                      >
                        {content}
                      </a>
                    );
                  }

                  return <div key={item.label}>{content}</div>;
                })}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-text mb-6">
                  Надіслати заявку
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
