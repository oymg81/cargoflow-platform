'use client';

import { useState, useEffect } from 'react';
import { Quote, Star, User, Building, Briefcase } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Review {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

import { getApprovedReviews, submitReview } from '@/actions/reviews';

export default function ClientReviews() {
  const t = useTranslations('ClientReviews');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadReviews() {
      const data = await getApprovedReviews();
      setReviews(data as any);
    }
    loadReviews();

    // Check for shareable review link
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (window.location.hash === '#review' || urlParams.get('review') === 'true') {
        setShowForm(true);
        setTimeout(() => {
          document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, []);

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
        setTimeout(() => {
          setShowForm(false);
          setStatus('idle');
        }, 3000);
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
    <section id="reviews-section" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#F77F00] font-bold tracking-wider uppercase mb-3 text-sm">{t('section_subtitle')}</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#07142b] mb-6">
            {t('section_title')}
          </h3>
          <div className="w-12 h-1 bg-[#F05A28] mx-auto mt-6 mb-8"></div>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-[#1E293B] hover:bg-[#334155] text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:-translate-y-0.5"
          >
            {showForm ? t('btn_cancel') : t('btn_submit_review')}
          </button>
        </div>

        {showForm && (
          <div className="max-w-2xl mx-auto mb-16 bg-white p-8 rounded-2xl shadow-xl border border-neutral-100">
            <h4 className="text-2xl font-bold text-[#07142b] mb-6">{t('form_title')}</h4>
            
            {status === 'success' ? (
              <div className="bg-emerald-50 text-emerald-800 p-6 rounded-lg border border-emerald-200">
                <h3 className="text-lg font-bold mb-2">{t('success_title')}</h3>
                <p>{t('success_msg')}</p>
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
                  className="w-full bg-[#F05A28] hover:bg-[#D9481B] text-white font-bold py-4 px-8 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? t('btn_submitting') : t('btn_submit_review')}
                </button>
              </form>
            )}
          </div>
        )}

        <div className="max-w-7xl mx-auto relative px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-8 shadow-xl flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="mb-6">
                  <Quote size={40} className="text-[#F05A28] fill-[#F05A28] opacity-90" />
                </div>
                
                <p className="text-neutral-700 font-medium leading-relaxed mb-8 flex-grow">
                  {review.quote}
                </p>
                
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-[#F05A28] fill-[#F05A28]" />
                  ))}
                </div>
                
                <div className="flex items-center gap-4 border-t border-neutral-100 pt-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-neutral-100 shadow-sm bg-neutral-100 flex items-center justify-center text-[#F05A28] font-bold text-lg">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 leading-tight">{review.author}</h4>
                    <p className="text-sm text-neutral-500 mt-1 flex items-center gap-1.5">
                      <Briefcase size={12} /> {review.role}
                    </p>
                    <p className="text-sm text-neutral-500 mt-0.5 flex items-center gap-1.5">
                      <Building size={12} /> {review.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {reviews.length === 0 && !showForm && (
              <div className="col-span-1 md:col-span-3 text-center text-neutral-500 py-12">
                {t('empty_state')}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
