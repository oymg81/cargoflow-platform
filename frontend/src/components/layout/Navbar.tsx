'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import LanguageSwitcher from '../LanguageSwitcher';
import { Menu, X, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: t('home'), active: pathname === '/' },
    { href: '/services', label: t('services'), active: pathname === '/services' },
    { href: '/about', label: t('about'), active: pathname === '/about' },
    { href: '/track', label: t('track'), active: pathname === '/track' },
    { href: '/contact', label: t('contact'), active: pathname === '/contact' },
  ];

  return (
    <div className="relative z-[9999]">
      <header className="fixed top-4 md:top-6 left-0 right-0 z-[9999] w-full max-w-full overflow-x-hidden transition-all duration-300 px-2 md:px-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 md:gap-3 bg-white/95 backdrop-blur-md rounded-full border border-gray-200 shadow-sm px-4 md:px-6 h-[60px] md:h-[70px] lg:h-[80px]">
          
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo_logistik.png"
                alt="Logisti-K Logo"
                width={70}
                height={70}
                priority
                className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 object-contain"
              />
            </Link>
          </div>

          {/* Navigation - Visible from 'md' instead of 'lg' */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8 justify-center flex-1 flex-nowrap overflow-hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href as any}
                className={`text-[#07142b] font-bold hover:text-[#F05A28] transition-colors flex items-center gap-1 whitespace-nowrap relative py-2 text-xs lg:text-sm xl:text-base ${link.active ? 'text-[#F05A28]' : ''}`}
              >
                {link.label}
                
                {link.active && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] lg:h-[3px] bg-[#F05A28] rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4 shrink-0">
            <LanguageSwitcher />

            {/* Sign In Button - Hide on smaller screens (md) to make room for nav links, show on lg */}
            <a href="https://logisti-k.managercargo.com/public/login/indexlogin/logincasillero" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-[#F05A28] to-[#E63946] hover:shadow-lg hover:shadow-[#F05A28]/30 hover:-translate-y-0.5 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-xs lg:text-sm font-bold transition-all whitespace-nowrap">
              Sign In <ExternalLink size={16} />
            </a>

            {/* Mobile Menu Toggle - Only visible below 'md' */}
            <button
              className="md:hidden p-2 text-[#07142b] hover:text-[#F05A28] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown - Only for < md */}
        {isOpen && (
          <div className="md:hidden absolute left-4 right-4 top-full mt-2 z-[9999] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-bold text-[#07142b] hover:text-[#F05A28] p-2 border-b border-slate-100 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-2 pt-2">
                <a
                  href="https://logisti-k.managercargo.com/public/login/indexlogin/logincasillero"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-[#F05A28] to-[#E63946] text-white text-center py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 text-sm"
                >
                  Sign In <ExternalLink size={18} />
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
