import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlobalPopup from '@/components/layout/GlobalPopup';
import "../globals.css";

export const metadata: Metadata = {
  title: "LOGISTI-K | Integrated Global Logistics Solutions",
  description: "Reliable freight forwarding and logistics services connecting businesses worldwide.",
  icons: {
    icon: "/images/logo_logistik.png",
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#07142b] font-sans w-full max-w-full overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        <GlobalPopup />
        <Script
          src="https://app.foes.pro/api/public/promotions/embed?key=974277e8-398d-4081-a887-f7f4bb43b38a"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

