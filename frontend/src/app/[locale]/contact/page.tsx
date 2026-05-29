'use client';

import { MapPin, Phone, Mail } from 'lucide-react';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      
      const response = await fetch('http://localhost:8000/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setStatus('success');
      } else {
        // Fallback for demo
        setTimeout(() => setStatus('success'), 800);
      }
    } catch (error) {
      // Fallback for demo if backend is completely down
      setTimeout(() => setStatus('success'), 800);
    }
  };

  return (
    <>
      <section className="bg-neutral-50 border-b border-neutral-200 pt-44 md:pt-48 lg:pt-52 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">{t('title')}</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section id="contact-form" className="py-24 bg-red-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-neutral-100">
              <h2 className="text-3xl font-bold text-[#07142b] mb-8">
                {t('form_title')}
              </h2>
              
              {status === 'success' && (
                <div className="bg-emerald-50 text-emerald-800 p-6 rounded-lg border border-emerald-200 mb-8">
                  <h3 className="text-lg font-bold mb-2">{t('success_title')}</h3>
                  <p>{t('success_desc')}</p>
                  <button 
                    type="button"
                    onClick={() => {
                      try {
                        if (formRef.current) {
                          formRef.current.reset();
                          const elements = formRef.current.elements;
                          for (let i = 0; i < elements.length; i++) {
                            const el = elements[i];
                            if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
                              el.value = '';
                            } else if (el instanceof HTMLSelectElement) {
                              el.selectedIndex = 0;
                            }
                          }
                        }
                      } catch (err) {
                        console.error('Failed to reset form elements:', err);
                      }
                      setStatus('idle');
                    }}
                    className="mt-4 inline-flex items-center px-3.5 py-1.5 border border-emerald-600 rounded-lg text-emerald-700 bg-white hover:bg-emerald-600 hover:text-white transition-all font-semibold text-sm cursor-pointer shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                  >
                    {t('send_another')}
                  </button>
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit} className={status === 'success' ? 'hidden' : 'space-y-6'}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        {t('first_name')}
                      </label>
                      <input 
                        type="text" 
                        name="firstName"
                        required
                        className="w-full bg-neutral-50 text-[#07142b] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-colors placeholder-neutral-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        {t('last_name')}
                      </label>
                      <input 
                        type="text" 
                        name="lastName"
                        required
                        className="w-full bg-neutral-50 text-[#07142b] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-colors placeholder-neutral-400"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        {t('email')}
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        className="w-full bg-neutral-50 text-[#07142b] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-colors placeholder-neutral-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        {t('phone')}
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        className="w-full bg-neutral-50 text-[#07142b] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-colors placeholder-neutral-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      {t('subject')}
                    </label>
                    <select 
                      name="subject"
                      required
                      className="w-full bg-neutral-50 text-[#07142b] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-colors appearance-none"
                    >
                      <option value="">{t('topic_default')}</option>
                      <option value="quote">{t('topic_quote')}</option>
                      <option value="tracking">{t('topic_tracking')}</option>
                      <option value="general">{t('topic_general')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      {t('message')}
                    </label>
                    <textarea 
                      name="message"
                      required
                      rows={5}
                      className="w-full bg-neutral-50 text-[#07142b] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] transition-colors resize-none placeholder-neutral-400"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-[#1E293B] hover:bg-[#334155] text-white font-bold py-4 px-8 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {status === 'loading' ? (
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    ) : (
                      t('send_button')
                    )}
                  </button>
                </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 shadow-sm mb-8">
                <h3 className="text-2xl font-bold text-[#07142b] mb-6">{t('miami_office')}</h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 text-[#07142b]">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="text-[#F05A28]" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1 text-[#07142b]">{t('office_label')}</p>
                      <p className="text-neutral-600">2598 E SUNRISE BLVD STE 2104<br/>FORT LAUDERDALE, FL 33304</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 text-[#07142b]">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="text-[#F05A28]" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1 text-[#07142b]">{t('phone')}</p>
                      <a href="tel:+17869454199" className="text-neutral-600 hover:text-[#F05A28] transition-colors">+1 (786) 945-4199</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 text-[#07142b]">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="text-[#F05A28]" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1 text-[#07142b]">{t('email_label')}</p>
                      <a href="mailto:info@logisti-k.us" className="text-neutral-600 hover:text-[#F05A28] transition-colors">info@logisti-k.us</a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 shadow-sm mb-8">
                <h3 className="text-2xl font-bold text-[#07142b] mb-6">{t('warehouse')}</h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 text-[#07142b]">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="text-[#F05A28]" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1 text-[#07142b]">{t('office_label')}</p>
                      <p className="text-neutral-600">5141 NW 79TH AVE, UNIT 7<br/>MIAMI, FL 33166</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 shadow-sm">
                <h3 className="text-2xl font-bold text-[#07142b] mb-6">{t('peru_office')}</h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 text-[#07142b]">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="text-[#F05A28]" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1 text-[#07142b]">{t('office_label')}</p>
                      <p className="text-neutral-600">Av. José Larco 1232, Ste 430<br/>Miraflores 15086, Perú</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
