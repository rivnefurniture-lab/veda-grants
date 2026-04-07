"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";

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
      <div className="bg-navy-dark text-white/70 text-[13px] py-2 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+380672160559" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone size={13} />
              +38 (067) 216-05-59
            </a>
            <a href="mailto:info@weda.com" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail size={13} />
              info@weda.com
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-white/50">
            <MapPin size={13} />
            м. Рівне, пр. Миру
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <Link href="/" className="group">
              <Logo theme="dark" size={44} />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-[15px] font-medium text-text-light hover:text-navy rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA + mobile menu */}
            <div className="flex items-center gap-3">
              <Link
                href="/kontakty"
                className="hidden md:inline-flex px-5 py-2.5 bg-gold hover:bg-gold-light text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Безкоштовна консультація
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-navy hover:bg-cream rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-text-light hover:text-navy hover:bg-cream rounded-xl transition-all font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/kontakty"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 bg-gold text-white font-bold rounded-xl text-center mt-3"
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
