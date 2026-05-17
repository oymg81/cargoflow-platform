'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight, PackageSearch } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative pt-[120px] pb-10 min-h-[90vh] flex items-center">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8 h-full">
        
        {/* Full Background Hero Container */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 min-h-[650px] flex items-center">
          
          {/* Background Image */}
          <Image
            src="/images/hero_logistic.png"
            alt="Global Logistics Operations"
            fill
            className="absolute inset-0 object-cover object-center"
            priority
          />
          
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
          
          {/* Content Overlay */}
          <div className="relative z-10 w-full max-w-xl px-8 lg:px-16 xl:px-20 py-12 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#F05A28] font-bold text-sm uppercase tracking-wider mb-8 border border-red-100">
                <span className="w-2 h-2 rounded-full bg-[#F05A28] animate-pulse"></span>
                {t('tag')}
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.15] mb-6 tracking-tight">
                {t('headline')}
              </h1>
              
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10 max-w-xl">
                {t('subheadline')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#F05A28] to-[#E63946] hover:shadow-lg hover:shadow-[#F05A28]/30 hover:-translate-y-0.5 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  {t('cta_quote')}
                </button>
                
                <Link 
                  href="/track" 
                  className="w-full sm:w-auto bg-[#1E293B] hover:bg-[#334155] text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-[#1E293B]/30"
                >
                  <PackageSearch size={20} className="text-white" />
                  {t('cta_track')}
                </Link>
              </div>
            </motion.div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
