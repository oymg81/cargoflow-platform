import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/terms': {
      en: '/terms',
      es: '/terminos'
    },
    '/about': '/about',
    '/services': '/services',
    '/track': '/track',
    '/contact': '/contact',
    '/privacy': '/privacy'
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
