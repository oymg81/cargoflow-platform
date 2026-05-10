import { getTranslations } from 'next-intl/server';
import Cta from '@/components/sections/Cta';
import TrustedPartners from '@/components/sections/TrustedPartners';
import { Target, TrendingUp, Users } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: `${t('title')} | LOGISTI-K`,
    description: t('paragraph1'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <>
      <section className="bg-neutral-50 border-b border-neutral-200 pt-32 md:pt-36 lg:pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63946] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#07142b] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-1 bg-[#E63946] rounded-full"></div>
            <span className="text-[#E63946] font-bold uppercase tracking-widest text-sm">Logisti-K</span>
            <div className="w-10 h-1 bg-[#E63946] rounded-full"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#07142b] mb-6 tracking-tight">
            {t('title')}
          </h1>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#07142b] leading-tight">
                Your Global Logistics <span className="text-[#E63946]">Partner</span>
              </h2>
              
              <div className="w-20 h-2 bg-[#E63946] rounded-full"></div>
              
              <p className="text-lg text-neutral-600 leading-relaxed">
                {t('paragraph1')}
              </p>
              
              <p className="text-lg text-neutral-600 leading-relaxed">
                {t('paragraph2')}
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-100">
                <div>
                  <p className="text-4xl font-black text-[#E63946] mb-2">25+</p>
                  <p className="font-semibold text-[#07142b]">Years Experience</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-[#E63946] mb-2">150+</p>
                  <p className="font-semibold text-[#07142b]">Countries Served</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-100 bg-[#f8fafc] p-8 min-h-[500px] flex flex-col justify-center gap-8">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#E63946]/10 rounded-full blur-2xl"></div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#07142b]/10 rounded-full blur-2xl"></div>
                
                <div className="bg-white p-6 rounded-2xl shadow-md border border-neutral-50 flex items-start gap-4 relative z-10 transform hover:-translate-y-2 transition-transform">
                  <div className="bg-red-50 p-3 rounded-xl text-[#E63946]">
                    <Target size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#07142b] text-lg mb-1">Precision</h3>
                    <p className="text-neutral-500 text-sm">Exact timing and coordination for every shipment.</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md border border-neutral-50 flex items-start gap-4 relative z-10 transform translate-x-8 hover:-translate-y-2 transition-transform">
                  <div className="bg-slate-50 p-3 rounded-xl text-[#07142b]">
                    <TrendingUp size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#07142b] text-lg mb-1">Efficiency</h3>
                    <p className="text-neutral-500 text-sm">Optimized routes to reduce cost and transit time.</p>
                  </div>
                </div>

                <div className="bg-[#07142b] p-6 rounded-2xl shadow-xl flex items-start gap-4 relative z-10 transform hover:-translate-y-2 transition-transform">
                  <div className="bg-white/10 p-3 rounded-xl text-white">
                    <Users size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">Partnership</h3>
                    <p className="text-neutral-300 text-sm">Dedicated support and customer-first approach.</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <TrustedPartners />
      <Cta />
    </>
  );
}
