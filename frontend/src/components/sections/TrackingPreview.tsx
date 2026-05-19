'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PackageSearch, ArrowRight, Truck, Package, MapPin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrackingPreview() {
  const t = useTranslations('TrackingPreview');
  const [trackingNumber, setTrackingNumber] = useState('');

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F05A28] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200 opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Content & Form */}
          <div className="max-w-xl text-[#07142b]">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="text-neutral-600 text-lg mb-8 leading-relaxed">
              {t('desc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <PackageSearch className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder={t('placeholder')}
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full bg-white text-[#07142b] pl-12 pr-4 py-4 rounded-md shadow-sm text-lg border border-gray-200"
                  readOnly
                />
              </div>
              <a
                href="https://logisti-k.managercargo.com/public/status/indexstatus/indexstatusacc/wi/si"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-md font-medium text-lg transition-colors flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto text-center"
              >
                {t('track_btn')} <ArrowRight size={20} />
              </a>
            </div>
          </div>

          {/* Right Side: Animated Illustration */}
          <div className="bg-gray-50 rounded-xl shadow-lg p-6 md:p-8 min-h-[400px] flex items-center justify-center border border-gray-100 overflow-hidden relative">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              
              {/* Background Globe rotating slowly */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center opacity-10 text-[#1E293B]"
              >
                <Globe size={300} strokeWidth={1} />
              </motion.div>

              {/* Dotted path */}
              <svg className="absolute w-full h-full" viewBox="0 0 400 400">
                <motion.path 
                  d="M 50 200 Q 200 100 350 200"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="3"
                  strokeDasharray="8,8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                />
              </svg>

              {/* Left Map Pin (Origin) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                <MapPin className="text-[#1E293B] fill-white" size={32} />
                <div className="w-2 h-2 bg-[#1E293B] rounded-full mt-1"></div>
              </motion.div>

              {/* Right Map Pin (Destination) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 2.2, type: "spring" }}
                className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                <MapPin className="text-[#F05A28] fill-white" size={32} />
                <div className="w-2 h-2 bg-[#F05A28] rounded-full mt-1 animate-ping absolute top-[36px]"></div>
                <div className="w-2 h-2 bg-[#F05A28] rounded-full mt-1"></div>
              </motion.div>

              {/* Delivery Truck moving along path */}
              <motion.div
                initial={{ x: -120, y: 0, opacity: 0 }}
                animate={{ 
                  x: [ -120, -60, 0, 60, 120 ], 
                  y: [ 0, -25, -35, -25, 0 ],
                  opacity: [0, 1, 1, 1, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
                className="absolute flex items-center justify-center bg-white p-3 rounded-full shadow-lg border border-gray-100 z-10"
              >
                <Truck className="text-[#1E293B]" size={28} />
              </motion.div>

              {/* Floating Package */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-1/3 bg-[#F05A28] p-3 rounded-xl shadow-lg shadow-[#F05A28]/20 text-white z-20 transform rotate-12"
              >
                <Package size={24} />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
