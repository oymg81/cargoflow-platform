import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Services from '@/components/sections/Services';
import Cta from '@/components/sections/Cta';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: 'Services | LOGISTI-K',
    description: 'Comprehensive global logistics and freight forwarding services.',
  };
}

export default function ServicesPage() {
  const t = useTranslations('Services');

  return (
    <>
      {/* Page Header */}
      <section className="bg-neutral-50 border-b border-neutral-200 pt-32 md:pt-36 lg:pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">{t('heroTitle')}</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <Services />

      {/* Process Section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-semibold tracking-wider uppercase mb-3">Our Process</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#07142b] mb-6">
              How We Move Your Freight
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'We analyze your requirements and design the optimal route.' },
              { step: '02', title: 'Booking', desc: 'Secure capacity and finalize all documentation.' },
              { step: '03', title: 'Transit', desc: 'Your cargo is moved with real-time tracking visibility.' },
              { step: '04', title: 'Delivery', desc: 'Final mile delivery and customs clearance completed.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
               <h4 className="text-xl font-bold text-[#07142b] mb-3">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
