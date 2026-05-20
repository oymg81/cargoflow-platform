'use client';

import { Link } from '@/i18n/routing';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

import { useTranslations } from 'next-intl';

export default function Cta() {
  const t = useTranslations('Cta');

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] overflow-hidden bg-gradient-to-r from-[#F05A28] to-[#E63946] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl"
        >
          {/* Decorative Pattern / Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-[url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay hidden md:block" style={{ maskImage: 'linear-gradient(to right, black, transparent)' }}></div>

          <div className="relative z-10 text-center lg:text-left max-w-2xl lg:ml-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-lg md:text-xl text-white/90">
              {t('subtitle')}
            </p>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-white text-[#F05A28] hover:bg-neutral-100 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              {t('quote_btn')} <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

