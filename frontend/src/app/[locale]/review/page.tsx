'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { submitReview } from '@/actions/reviews';
import { Link } from '@/i18n/routing';

export default function ReviewPage() {
  const t = useTranslations('ClientReviews');
  const tNav = useTranslations('Navigation');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg(null);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        quote: formData.get('quote') as string,
        author: formData.get('author') as string,
        role: formData.get('role') as string,
        company: formData.get('company') as string,
        rating: Number(formData.get('rating'))
      };
      
      const res = await submitReview(data);
      
      if (res.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(res.error || 'Unknown error occurred.');
      }
    } catch (error: any) {
      setStatus('error');
      setErrorMsg(error.message || 'Network error.');
    }
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden flex-1 flex flex-col justify-center">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-neutral-100">
          <h1 className="text-3xl md:text-4xl font-bold text-[#07142b] mb-4 text-center">{t('form_title')}</h1>
          <div className="w-12 h-1 bg-[#F05A28] mx-auto mb-8"></div>
          
          {status === 'success' ? (
            <div className="bg-emerald-50 text-emerald-800 p-8 rounded-xl border border-emerald-200 text-center flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4">{t('success_title')}</h3>
              <p className="mb-8">{t('success_msg')}</p>
              <Link 
                href="/"
                className="bg-[#F05A28] hover:bg-[#D9481B] text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md hover:-translate-y-0.5"
              >
                {tNav('home')}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('label_fullname')}</label>
                  <input type="text" name="author" required className="w-full bg-neutral-50 text-[#07142b] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('label_rating')}</label>
                  <select name="rating" required className="w-full bg-neutral-50 text-[#07142b] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28]">
                    <option value="5">{t('rating_5')}</option>
                    <option value="4">{t('rating_4')}</option>
                    <option value="3">{t('rating_3')}</option>
                    <option value="2">{t('rating_2')}</option>
                    <option value="1">{t('rating_1')}</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('label_role')}</label>
                  <input type="text" name="role" className="w-full bg-neutral-50 text-[#07142b] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('label_company')}</label>
                  <input type="text" name="company" className="w-full bg-neutral-50 text-[#07142b] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">{t('label_review')}</label>
                <textarea name="quote" required rows={4} className="w-full bg-neutral-50 text-[#07142b] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#F05A28] focus:ring-1 focus:ring-[#F05A28] resize-none"></textarea>
              </div>

              {status === 'error' && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-red-700 font-semibold text-sm mb-1">{t('error_msg')}</p>
                  <p className="text-red-600 text-xs font-mono break-words">{errorMsg}</p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-[#F05A28] hover:bg-[#D9481B] text-white font-bold py-4 px-8 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:-translate-y-0.5"
              >
                {status === 'loading' ? t('btn_submitting') : t('btn_submit_review')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
