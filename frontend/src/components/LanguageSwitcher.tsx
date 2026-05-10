'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition, useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchLocale = (nextLocale: string) => {
    if (locale === nextLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  if (!mounted) {
    return <div className="w-24 h-10 px-1 py-1 rounded-full bg-gray-100 border border-gray-200"></div>;
  }

  return (
    <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200 shadow-inner">
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-sm font-medium ${
          locale === 'en' 
            ? 'bg-[#F05A28] shadow-md text-white' 
            : 'text-gray-500 hover:text-[#07142b]'
        }`}
        aria-label="Switch to English"
      >
        <span>🇺🇸</span>
        <span className="hidden md:inline-block">EN</span>
      </button>
      
      <button
        onClick={() => switchLocale('es')}
        disabled={isPending}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-sm font-medium ${
          locale === 'es' 
            ? 'bg-[#F05A28] shadow-md text-white' 
            : 'text-gray-500 hover:text-[#07142b]'
        }`}
        aria-label="Switch to Spanish"
      >
        <span>🇪🇸</span>
        <span className="hidden md:inline-block">ES</span>
      </button>
    </div>
  );
}
