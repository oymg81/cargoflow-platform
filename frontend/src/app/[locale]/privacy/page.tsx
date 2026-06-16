import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  return {
    title: `${t('title')} | LOGISTI-K`,
    description: t('heading'),
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });

  return (
    <>
      {/* Header section with decorative blur circles matching design system */}
      <section className="bg-neutral-50 border-b border-neutral-200 pt-32 md:pt-36 lg:pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63946] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#07142b] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-1 bg-[#E63946] rounded-full"></div>
            <span className="text-[#E63946] font-bold uppercase tracking-widest text-sm">
              {t('subtitle')}
            </span>
            <div className="w-10 h-1 bg-[#E63946] rounded-full"></div>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#07142b] tracking-tight max-w-4xl mx-auto leading-tight">
            {t('heading')}
          </h1>
        </div>
      </section>

      {/* Main content section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-neutral-600 space-y-10">
            <p className="text-lg leading-relaxed font-medium text-neutral-700">
              {t('intro')}
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-[#07142b] mb-3">{t('sec1_title')}</h2>
                <p className="leading-relaxed whitespace-pre-line">{t('sec1_desc')}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#07142b] mb-3">{t('sec2_title')}</h2>
                <p className="leading-relaxed whitespace-pre-line">{t('sec2_desc')}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#07142b] mb-3">{t('sec3_title')}</h2>
                <p className="leading-relaxed whitespace-pre-line">{t('sec3_desc')}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#07142b] mb-3">{t('sec4_title')}</h2>
                <p className="leading-relaxed whitespace-pre-line">{t('sec4_desc')}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#07142b] mb-3">{t('sec5_title')}</h2>
                <p className="leading-relaxed whitespace-pre-line">{t('sec5_desc')}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#07142b] mb-3">{t('sms_title')}</h2>
                <p className="leading-relaxed whitespace-pre-line">{t('sms_desc')}</p>
              </div>
            </div>

            {/* Bottom copyright notice */}
            <p className="text-sm text-neutral-400 pt-8 border-t border-neutral-100 text-center">
              {t('footer_rights')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
