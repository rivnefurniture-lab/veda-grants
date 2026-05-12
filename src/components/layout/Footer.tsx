import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company info */}
          <div>
            <Logo theme="light" size={40} className="mb-5" />
            <p className="text-white/50 text-sm leading-relaxed mb-3">
              ТОВ &quot;West Economic Development Agency WEDA&quot;. Допомагаємо бізнесу отримувати гранти та
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
            <ul className="space-y-2.5">
              {[
                "Пошук грантів",
                "Написання грантових заявок",
                "Бізнес-планування",
                "Супровід проєктів",
                "Навчання та консалтинг",
              ].map((name) => (
                <li key={name}>
                  <Link href="/poslugy" className="text-white/50 hover:text-gold transition-colors text-sm">
                    {name}
                  </Link>
                </li>
              ))}
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
                <a href="mailto:agency.weda@gmail.com" className="flex items-center gap-2.5 text-white/50 hover:text-gold transition-colors text-sm">
                  <Mail size={15} className="shrink-0" />
                  agency.weda@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-white/50 text-sm">
                  <MapPin size={15} className="mt-0.5 shrink-0" />
                  33013, м. Рівне, вул. Директорії, буд. 6
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-8 flex justify-center items-center">
          <p className="text-white/30 text-sm text-center">
            &copy; {new Date().getFullYear()} ТОВ &quot;West Economic Development Agency WEDA&quot;. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
