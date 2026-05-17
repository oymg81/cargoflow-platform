'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PackageSearch, ArrowRight, PackageCheck, MapPin, Truck, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Tracking Data (For Future Backend Integration)
const MOCK_TRACKING_DATA = {
  status: 'In Transit',
  eta: 'May 12, 2026',
  destination: 'Miami, FL, USA',
  origin: 'Shanghai, China',
  timeline: [
    { status: 'Shipment Picked Up', location: 'Shanghai, China', date: 'May 05, 2026', completed: true },
    { status: 'Processed at Origin Hub', location: 'Shanghai, China', date: 'May 06, 2026', completed: true },
    { status: 'Departed Facility', location: 'Shanghai, China', date: 'May 07, 2026', completed: true },
    { status: 'In Transit', location: 'Ocean Transit', date: 'May 08, 2026', completed: true },
    { status: 'Arrived at Destination Port', location: 'Los Angeles, CA', date: 'Pending', completed: false },
    { status: 'Out for Delivery', location: 'Miami, FL', date: 'Pending', completed: false },
  ]
};

export default function TrackingPreview() {
  const t = useTranslations('TrackingPreview');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<typeof MOCK_TRACKING_DATA | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(`http://localhost:8000/api/v1/tracking/${trackingNumber}`);
      if (response.ok) {
        const data = await response.json();
        setResult(data.data);
      } else {
        // Fallback if backend isn't running
        setTimeout(() => setResult(MOCK_TRACKING_DATA), 800);
      }
    } catch (error) {
      // Fallback for demo/dev purposes if backend is completely down
      setTimeout(() => setResult(MOCK_TRACKING_DATA), 800);
    } finally {
      setIsLoading(false);
    }
  };

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

            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <PackageSearch className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder={t('placeholder')}
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full bg-white text-[#07142b] pl-12 pr-4 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F05A28] shadow-sm text-lg border border-gray-200"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-md font-medium text-lg transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                ) : (
                  <>
                    {t('track_btn')} <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Side: Results UI */}
          <div className="bg-gray-50 rounded-xl shadow-lg p-6 md:p-8 min-h-[400px] flex flex-col justify-center border border-gray-100">
            <AnimatePresence mode="wait">
              {!result && !isLoading && (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center flex flex-col items-center justify-center text-neutral-400"
                >
                  <PackageCheck size={64} className="mb-4 opacity-50" />
                  <p className="text-lg">{t('empty_state')}</p>
                </motion.div>
              )}

              {isLoading && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 border-4 border-neutral-200 border-t-primary rounded-full animate-spin mb-4"></div>
                  <p className="text-neutral-500 font-medium">{t('loading')}</p>
                </motion.div>
              )}

              {result && !isLoading && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full"
                >
                  <div className="flex justify-between items-start mb-6 pb-6 border-b border-neutral-100">
                    <div>
                      <p className="text-sm text-neutral-500 font-medium uppercase mb-1">{t('tracking_number')}</p>
                      <p className="text-xl font-bold text-[#07142b] uppercase">{trackingNumber}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold tracking-wide">
                        {result.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start gap-3">
                      <Calendar className="text-[#F05A28] mt-0.5" size={20} />
                      <div>
                        <p className="text-xs text-neutral-500 font-medium uppercase">{t('est_delivery')}</p>
                        <p className="font-semibold text-[#07142b]">{result.eta}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-[#F05A28] mt-0.5" size={20} />
                      <div>
                        <p className="text-xs text-neutral-500 font-medium uppercase">{t('destination')}</p>
                        <p className="font-semibold text-[#07142b]">{result.destination}</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative pl-6 border-l-2 border-neutral-200 space-y-6">
                    {result.timeline.slice(0, 3).map((item, index) => (
                      <div key={index} className="relative">
                        <div className={`absolute -left-[33px] p-1 rounded-full ${item.completed ? 'bg-[#F05A28] text-white' : 'bg-neutral-200 text-neutral-400'}`}>
                          {item.completed ? <PackageCheck size={14} /> : <div className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <p className={`font-medium ${item.completed ? 'text-[#07142b]' : 'text-neutral-400'}`}>
                            {item.status}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {item.location} • {item.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <button className="text-[#F05A28] font-medium text-sm hover:underline">
                      {t('view_history')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
