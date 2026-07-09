'use client';

import { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  message: string;
  service_type?: string | null;
  created_at: string;
  is_featured: boolean;
}

export default function Testimonials() {
  const t = useTranslations('ClientReviews');
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://app.foes.pro/api/public/reviews?slug=logisti-k')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.reviews)) {
          // Filter to only display featured testimonials
          const featured = data.reviews.filter((review: Review) => review.is_featured);
          setTestimonials(featured);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch reviews:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth >= 768 ? 3 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, testimonials.length - itemsPerView);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerView, testimonials.length, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, testimonials.length - itemsPerView);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, testimonials.length - itemsPerView);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-[#DADADA]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#07142b] font-medium">Loading reviews...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-[#DADADA]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#F77F00] font-bold tracking-wider uppercase mb-3 text-sm">
            {t('section_subtitle')}
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#07142b] mb-6">
            {t('section_title')}
          </h3>
          <div className="w-12 h-1 bg-[#F05A28] mx-auto mt-6"></div>
        </div>

        <div className="max-w-7xl mx-auto relative px-4 md:px-16">
          
          <div 
            className="overflow-hidden relative z-10"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full md:w-1/3 shrink-0 px-4">
                  <div className="bg-white rounded-2xl p-8 shadow-xl flex flex-col hover:-translate-y-1 transition-transform duration-300 h-full">
                    <div className="mb-6">
                      <Quote size={48} className="text-[#F05A28] fill-[#F05A28] opacity-90" />
                    </div>
                    
                    <p className="text-neutral-700 font-medium leading-relaxed mb-8 flex-grow">
                      {testimonial.message}
                    </p>
                    
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} size={16} className="text-[#F05A28] fill-[#F05A28]" />
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-neutral-100 shadow-sm bg-neutral-100 flex items-center justify-center text-[#F05A28] font-bold">
                        {testimonial.reviewer_name ? testimonial.reviewer_name.charAt(0) : '?'}
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900">{testimonial.reviewer_name}</h4>
                        {testimonial.service_type && (
                          <p className="text-sm text-neutral-500">{testimonial.service_type}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls - Floating Arrows */}
          {testimonials.length > itemsPerView && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors shadow-sm hidden md:flex bg-white z-20 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#F05A28] flex items-center justify-center text-white hover:bg-[#D9481B] transition-colors shadow-lg hidden md:flex z-20 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Pagination Dots */}
          {testimonials.length > itemsPerView && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: testimonials.length - itemsPerView + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 cursor-pointer ${
                    currentIndex === i ? 'bg-[#F05A28]' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

