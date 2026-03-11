import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      {/* CTA Banner */}
      <div className="gradient-gold">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-navy mb-4">
            Готові отримати фінансування для вашого бізнесу?
          </h2>
          <p className="text-navy/70 mb-8 max-w-2xl mx-auto text-lg">
            Залиште заявку на безкоштовну консультацію і ми підберемо найкращі грантові програми для вас
          </p>
          <Link
            href="/kontakty"
            className="inline-flex px-8 py-4 bg-navy text-white font-semibold rounded-xl hover:bg-navy-light transition-all shadow-lg hover:shadow-xl text-lg"
          >
            Отримати консультацію
          </Link>
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-gold font-bold text-xl">В</span>
              </div>
              <div>
                <div className="font-bold text-lg">ВЕДА</div>
                <div className="text-xs text-white/50">АГЕНЦІЯ РОЗВИТКУ</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              ТОВ &quot;Агенція економічного розвитку ВЕДА&quot;. Допомагаємо бізнесу отримувати гранти та
              фінансування з 2022 року.
            </p>
            <p className="text-white/40 text-xs mt-3">ЄДРПОУ: 45088347</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Навігація</h3>
            <ul className="space-y-2">
              {[
                { name: "Головна", href: "/" },
                { name: "Про нас", href: "/pro-nas" },
                { name: "Послуги", href: "/poslugy" },
                { name: "Гранти", href: "/granty" },
                { name: "Контакти", href: "/kontakty" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/60 hover:text-gold transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Послуги</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Пошук грантів</li>
              <li>Написання заявок</li>
              <li>Бізнес-планування</li>
              <li>Консалтинг</li>
              <li>Супровід проєктів</li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Контакти</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+380672160559" className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm">
                  <Phone size={16} />
                  +38 (067) 216-05-59
                </a>
              </li>
              <li>
                <a href="mailto:info@veda.agency" className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm">
                  <Mail size={16} />
                  info@veda.agency
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  м. Рівне, пр. Миру, Рівненська обл.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} ТОВ &quot;Агенція економічного розвитку ВЕДА&quot;. Всі права захищені.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-gold transition-colors">Політика конфіденційності</Link>
            <Link href="/oferta" className="hover:text-gold transition-colors">Публічна оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
