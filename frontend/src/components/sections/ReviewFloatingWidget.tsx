'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Star, X } from 'lucide-react';

export default function ReviewFloatingWidget() {
  const t = useTranslations('ClientReviews');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the widget in this session
    const isDismissed = sessionStorage.getItem('review_widget_dismissed');
    if (!isDismissed) {
      // Elegant delay before showing the widget (1.5 seconds)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('review_widget_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-24 right-4 md:bottom-28 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-72 bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_10px_35px_rgba(0,0,0,0.15)] flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-5 duration-500"
      id="review-floating-popup"
    >
      {/* Dismiss Button */}
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-full transition-colors cursor-pointer"
        aria-label="Close review widget"
      >
        <X size={16} />
      </button>

      {/* Content */}
      <div className="pr-5">
        {/* Star Rating visualization */}
        <div className="flex gap-1 mb-2 text-[#F05A28]">
          <Star size={16} className="fill-current" />
          <Star size={16} className="fill-current" />
          <Star size={16} className="fill-current" />
          <Star size={16} className="fill-current" />
          <Star size={16} className="fill-current" />
        </div>
        
        <h4 className="text-sm md:text-[15px] font-bold text-[#07142b] leading-snug">
          {t('floating_title')}
        </h4>
      </div>

      {/* Action Button */}
      <a
        href="https://app.foes.pro/review/logisti-k"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#F05A28] hover:bg-[#D9481B] text-white text-xs font-bold py-2.5 px-4 rounded-xl text-center shadow-sm hover:shadow-md transition-all active:scale-98 duration-200"
      >
        {t('floating_btn')}
      </a>
    </div>
  );
}
