'use client';

import { useState, useEffect } from 'react';
import { Check, X, Clock } from 'lucide-react';

interface Review {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function AdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/admin/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Failed to fetch reviews', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    try {
      const res = await fetch(`http://localhost:8000/api/admin/reviews/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  if (loading) return <div className="p-24 text-center">Loading admin panel...</div>;

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-[#07142b] mb-4">Admin Dashboard</h1>
        <p className="text-neutral-600">Manage client reviews and testimonials.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="p-4 font-semibold text-[#07142b]">Date</th>
              <th className="p-4 font-semibold text-[#07142b]">Client</th>
              <th className="p-4 font-semibold text-[#07142b]">Review</th>
              <th className="p-4 font-semibold text-[#07142b]">Status</th>
              <th className="p-4 font-semibold text-[#07142b] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-neutral-500">No reviews found.</td>
              </tr>
            ) : reviews.map((review) => (
              <tr key={review.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50">
                <td className="p-4 text-sm text-neutral-500 align-top">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 align-top">
                  <div className="font-bold text-[#07142b]">{review.author}</div>
                  <div className="text-sm text-neutral-500">{review.role}</div>
                  <div className="text-sm text-neutral-500">{review.company}</div>
                  <div className="text-xs text-[#F05A28] mt-1">{review.rating} Stars</div>
                </td>
                <td className="p-4 max-w-md align-top">
                  <p className="text-neutral-700 text-sm italic">"{review.quote}"</p>
                </td>
                <td className="p-4 align-top">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    review.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    review.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {review.status === 'approved' && <Check size={12} />}
                    {review.status === 'rejected' && <X size={12} />}
                    {review.status === 'pending' && <Clock size={12} />}
                    <span className="capitalize">{review.status}</span>
                  </span>
                </td>
                <td className="p-4 align-top text-right">
                  <div className="flex justify-end gap-2">
                    {review.status !== 'approved' && (
                      <button 
                        onClick={() => updateStatus(review.id, 'approved')}
                        className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        Approve
                      </button>
                    )}
                    {review.status !== 'rejected' && (
                      <button 
                        onClick={() => updateStatus(review.id, 'rejected')}
                        className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
