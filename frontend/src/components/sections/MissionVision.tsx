'use client';

import { Target, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function MissionVision() {
  const t = useTranslations('MissionVision');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      },
    },
  };

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#07142b] mb-4">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-[#E63946] mx-auto rounded-full"></div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Mission */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-[#E63946] group-hover:bg-[#07142b] transition-colors duration-300"></div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="text-[#E63946]" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#07142b]">
                {t('mission_title')}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t('mission_desc')}
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-[#07142b] group-hover:bg-[#E63946] transition-colors duration-300"></div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="text-[#07142b]" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#07142b]">
                {t('vision_title')}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t('vision_desc')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
