import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import TrackingPreview from '@/components/sections/TrackingPreview';
import Cta from '@/components/sections/Cta';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: 'Track Shipment | LOGISTI-K',
    description: 'Track your LOGISTI-K shipment status in real-time.',
  };
}

export default function TrackPage() {
  const t = useTranslations('TrackPage');

  return (
    <>
      <section className="bg-neutral-50 border-b border-neutral-200 pt-32 md:pt-36 lg:pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">{t('title')}</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* The TrackingPreview component serves as the main interactive UI for this page */}
      <div className="bg-neutral-light dark:bg-neutral-900 pb-12">
        <TrackingPreview />
      </div>

      <Cta />
    </>
  );
}
