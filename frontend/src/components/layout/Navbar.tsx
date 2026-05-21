'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import LanguageSwitcher from '../LanguageSwitcher';
import { Menu, X, ChevronDown, ArrowRight, Phone, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <header className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 max-w-[100vw] lg:max-w-7xl mx-auto w-full transition-all duration-300">
      <div className="bg-white/95 backdrop-blur-md rounded-full border border-gray-200 shadow-sm px-4 md:px-6 h-[70px] md:h-[80px] flex justify-between items-center gap-2 md:gap-4 max-w-full">

        {/* Logo */}
        <div className="shrink-0 flex items-center min-w-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/logisti-k-transparent.png"
              alt="Logisti-K Logo"
              width={70}
              height={70}
              priority
              className="h-12 w-12 md:h-14 md:w-14 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 justify-center flex-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href as any}
              className={`text-[#07142b] font-bold hover:text-[#F05A28] transition-colors flex items-center gap-1 whitespace-nowrap relative py-2 ${link.active ? 'text-[#F05A28]' : ''}`}
            >
              {link.label}
              
              {link.active && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F05A28] rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 xl:gap-6 shrink-0">
          <LanguageSwitcher />

          <a href="https://logisti-k.managercargo.com/public/login/indexlogin/logincasillero" target="_blank" rel="noopener noreferrer" className="hidden xl:flex items-center gap-2 bg-gradient-to-r from-[#F05A28] to-[#E63946] hover:shadow-lg hover:shadow-[#F05A28]/30 hover:-translate-y-0.5 text-white px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap">
            Sign In <ExternalLink size={16} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-[#07142b] hover:text-[#F05A28] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-[90px] left-4 right-4 bg-white border border-neutral-200 shadow-2xl rounded-2xl overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-[#07142b] hover:text-[#F05A28] p-2 border-b border-neutral-100 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-neutral-100">
                <a
                  href="https://logisti-k.managercargo.com/public/login/indexlogin/logincasillero"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-[#F05A28] to-[#E63946] text-white text-center py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  Sign In <ExternalLink size={20} />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
