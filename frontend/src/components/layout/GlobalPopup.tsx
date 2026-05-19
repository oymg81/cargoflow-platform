'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getActivePopup } from '@/actions/popups';

interface Popup {
  id: string;
  title: string;
  content: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
}

export default function GlobalPopup() {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function loadPopup() {
      // Check if user has closed this specific popup recently
      const activePopup = await getActivePopup();
      
      if (activePopup) {
        const closedKey = `popup_closed_${activePopup.id}`;
        const hasClosed = sessionStorage.getItem(closedKey);
        
        if (!hasClosed) {
          setPopup(activePopup as any);
          // Small delay before showing for better UX
          setTimeout(() => setIsVisible(true), 2000);
        }
      }
    }
    loadPopup();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (popup) {
      sessionStorage.setItem(`popup_closed_${popup.id}`, 'true');
    }
  };

  if (!popup || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full relative animate-in fade-in zoom-in duration-300"
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-neutral-800"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>
        
        {popup.image_url && (
          <div className="w-full h-48 bg-neutral-100 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={popup.image_url} 
              alt={popup.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold text-[#07142b] mb-4">{popup.title}</h3>
          <p className="text-neutral-600 mb-8 whitespace-pre-wrap">{popup.content}</p>
          
          {popup.cta_text && popup.cta_link && (
            <a 
              href={popup.cta_link}
              onClick={handleClose}
              className="inline-block bg-[#F05A28] hover:bg-[#D9481B] text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:-translate-y-0.5 w-full sm:w-auto"
            >
              {popup.cta_text}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
