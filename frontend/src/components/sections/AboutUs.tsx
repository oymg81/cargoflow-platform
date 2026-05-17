'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShieldCheck, Anchor, Compass } from 'lucide-react';
import type { Variants } from "framer-motion";

export default function AboutUs() {
  const t = useTranslations('AboutUs');

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

  return (
    <section className="py-24 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[2px] bg-[#E63946]"></div>
                <h2 className="text-[#E63946] font-bold uppercase tracking-wider text-sm">
                  {t('title')}
                </h2>
              </div>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-[#07142b] leading-tight">
                {t('heading')}
              </h3>
            </motion.div>

            <motion.p variants={fadeUp} className="text-lg text-gray-600 leading-relaxed">
              {t('paragraph1')}
            </motion.p>
            
            <motion.p variants={fadeUp} className="text-lg text-gray-600 leading-relaxed">
              {t('paragraph2')}
            </motion.p>
            
          </motion.div>

          {/* Visual Elements */}
          <motion.div 
            className="lg:w-1/2 relative w-full"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            
            {/* Main Visual Container */}
<div className="relative rounded-3xl bg-[#f8fafc] border border-gray-100 p-8 shadow-xl overflow-hidden">
  {/* Background Accents */}
  <div className="absolute top-0 right-0 w-64 h-64 bg-[#E63946] opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#07142b] opacity-5 rounded-full blur-3xl -ml-20 -mb-20"></div>

  {/* Cards Grid */}
  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Secure Transit */}
    <div className="bg-white rounded-2xl shadow-md border border-gray-50 p-6 h-[170px] flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300">
      <div className="mb-4 w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
        <ShieldCheck className="text-[#E63946]" size={32} />
      </div>
      <span className="font-semibold text-[#07142b] text-sm">{t('secure_transit')}</span>
    </div>

    {/* Global Reach */}
    <div className="bg-[#07142b] rounded-2xl shadow-xl p-6 h-[170px] flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300">
      <div className="mb-4 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
        <Compass className="text-white" size={32} />
      </div>
      <span className="font-semibold text-white text-sm">{t('global_reach')}</span>
    </div>

    {/* Port to Final Mile */}
    <div className="bg-white rounded-2xl shadow-md border border-gray-50 p-6 h-[170px] flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300">
      <div className="mb-4 w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
        <Anchor className="text-[#07142b]" size={32} />
      </div>
      <span className="font-semibold text-[#07142b] text-sm">{t('port_to_mile')}</span>
    </div>

    {/* Years of Excellence */}
    <div className="bg-white rounded-2xl shadow-md border border-gray-50 p-6 h-[170px] flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300">
      <div className="text-[#E63946] font-black text-5xl leading-none mb-3">
        10+
      </div>
      <span className="font-semibold text-[#07142b] text-sm">{t('years_excellence')}</span>
    </div>
  </div>
</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
