import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                <span className="text-gold font-extrabold text-xl">В</span>
              </div>
              <div>
                <div className="font-extrabold text-lg leading-none">ВЕДА</div>
                <div className="text-[11px] text-white/40 tracking-[0.1em] uppercase leading-none mt-0.5">Агенція розвитку</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-3">
              ТОВ &quot;Агенція економічного розвитку ВЕДА&quot;. Допомагаємо бізнесу отримувати гранти та
              фінансування з 2022 року.
            </p>
            <p className="text-white/30 text-xs">ЄДРПОУ: 45088347</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm text-white/90 uppercase tracking-wider mb-5">Навігація</h3>
            <ul className="space-y-2.5">
              {[
                { name: "Головна", href: "/" },
                { name: "Про нас", href: "/pro-nas" },
                { name: "Послуги", href: "/poslugy" },
                { name: "Гранти", href: "/granty" },
                { name: "Контакти", href: "/kontakty" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/50 hover:text-gold transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm text-white/90 uppercase tracking-wider mb-5">Послуги</h3>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li>Пошук грантів</li>
              <li>Написання заявок</li>
              <li>Бізнес-планування</li>
              <li>Консалтинг</li>
              <li>Супровід проєктів</li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-sm text-white/90 uppercase tracking-wider mb-5">Контакти</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+380672160559" className="flex items-center gap-2.5 text-white/50 hover:text-gold transition-colors text-sm">
                  <Phone size={15} className="shrink-0" />
                  +38 (067) 216-05-59
                </a>
              </li>
              <li>
                <a href="mailto:info@veda.agency" className="flex items-center gap-2.5 text-white/50 hover:text-gold transition-colors text-sm">
                  <Mail size={15} className="shrink-0" />
                  info@veda.agency
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-white/50 text-sm">
                  <MapPin size={15} className="mt-0.5 shrink-0" />
                  м. Рівне, пр. Миру, Рівненська обл.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} ТОВ &quot;Агенція економічного розвитку ВЕДА&quot;. Всі права захищені.
          </p>
          <div className="flex gap-6 text-sm text-white/30">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Політика конфіденційності</Link>
            <Link href="/oferta" className="hover:text-white/60 transition-colors">Публічна оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
