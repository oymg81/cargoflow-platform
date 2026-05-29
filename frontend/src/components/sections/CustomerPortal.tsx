'use client';

import { PackageSearch, Activity, Bell, LayoutDashboard, ShieldCheck, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function CustomerPortal() {
  const t = useTranslations('CustomerPortal');
  const features = [
    { icon: <PackageSearch size={24} />, title: t('feat1_title'), desc: t('feat1_desc') },
    { icon: <Activity size={24} />, title: t('feat2_title'), desc: t('feat2_desc') },
    { icon: <Bell size={24} />, title: t('feat3_title'), desc: t('feat3_desc') },
    { icon: <LayoutDashboard size={24} />, title: t('feat4_title'), desc: t('feat4_desc') },
    { icon: <ShieldCheck size={24} />, title: t('feat5_title'), desc: t('feat5_desc') },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#07142b] mb-6">{t('title')}</h2>
          <p className="text-lg text-neutral-600">
            {t('desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto justify-center">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[linear-gradient(135deg,#F4F6F8_0%,#B6BBC2_100%)] rounded-3xl border border-[#B6BBC2]/55 shadow-[0_12px_28px_rgba(15,23,42,0.10)] hover:shadow-[0_18px_36px_rgba(15,23,42,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full p-8 group"
            >
              <div className="w-14 h-14 rounded-xl bg-red-50 text-[#F05A28] flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#07142b] mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-[#475569] text-sm md:text-base leading-relaxed flex-grow">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="https://logisti-k.managercargo.com/public/login/indexlogin/logincasillero" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1E293B] hover:bg-[#334155] text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:shadow-[#1E293B]/30"
          >
            {t('access_btn')} <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
