'use client';

import { Ship, Plane, Truck, FileCheck2, Warehouse, Package } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Services() {
  const t = useTranslations('Services');

  const SERVICES = [
    {
      title: t('cargo_title'),
      description: t('cargo_desc'),
      icon: Package,
      color: 'bg-red-50 text-[#E63946]',
    },
    {
      title: t('customs_title'),
      description: t('customs_desc'),
      icon: FileCheck2,
      color: 'bg-red-50 text-[#E63946]',
    },
    {
      title: t('warehousing_title'),
      description: t('warehousing_desc'),
      icon: Warehouse,
      color: 'bg-red-50 text-[#E63946]',
    },
    {
      title: t('ocean_title'),
      description: t('ocean_desc'),
      icon: Ship,
      color: 'bg-red-50 text-[#E63946]',
    },
    {
      title: t('air_title'),
      description: t('air_desc'),
      icon: Plane,
      color: 'bg-red-50 text-[#E63946]',
    },
    {
      title: t('ground_title'),
      description: t('ground_desc'),
      icon: Truck,
      color: 'bg-red-50 text-[#E63946]',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wider uppercase mb-3">{t('subtitle')}</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#07142b] mb-6">
            {t('title')}
          </h3>
          <p className="text-lg text-neutral-gray">
            {t('description')}
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICES.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={28} />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-[#07142b] group-hover:text-[#F05A28] transition-colors">
                {service.title}
              </h3>
              
              <p className="text-neutral-600 leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>
              
              <Link 
                href="/services" 
                className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
              >
                {t('learn_more')} 
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
