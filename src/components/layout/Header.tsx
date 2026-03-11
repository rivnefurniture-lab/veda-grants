"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";

const navigation = [
  { name: "Головна", href: "/" },
  { name: "Про нас", href: "/pro-nas" },
  { name: "Послуги", href: "/poslugy" },
  { name: "Гранти", href: "/granty" },
  { name: "Контакти", href: "/kontakty" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy text-white/80 text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+380672160559" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone size={14} />
              +38 (067) 216-05-59
            </a>
            <a href="mailto:info@veda.agency" className="hidden sm:flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail size={14} />
              info@veda.agency
            </a>
          </div>
          <div className="text-white/60">
            м. Рівне, пр. Миру
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg gradient-navy flex items-center justify-center">
                <span className="text-gold font-bold text-xl md:text-2xl">В</span>
              </div>
              <div>
                <div className="font-bold text-navy text-lg md:text-xl tracking-tight">ВЕДА</div>
                <div className="text-[10px] md:text-xs text-text-light -mt-0.5 tracking-wide">АГЕНЦІЯ РОЗВИТКУ</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-text-light hover:text-navy hover:bg-cream rounded-lg transition-all"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA + mobile menu */}
            <div className="flex items-center gap-3">
              <Link
                href="/kontakty"
                className="hidden md:inline-flex px-5 py-2.5 bg-gold hover:bg-gold-dark text-navy font-semibold text-sm rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                Безкоштовна консультація
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-navy"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <nav className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-text-light hover:text-navy hover:bg-cream rounded-lg transition-all font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/kontakty"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 bg-gold text-navy font-semibold rounded-lg text-center mt-3"
              >
                Безкоштовна консультація
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
