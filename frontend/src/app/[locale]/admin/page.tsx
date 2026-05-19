'use client';

import { useState, useEffect } from 'react';
import { Check, X, Clock, Trash2, Edit, Plus } from 'lucide-react';
import { getAllReviews, updateReviewStatus, deleteReview } from '@/actions/reviews';
import { getAllPopups, createPopup, updatePopup, togglePopupActive, deletePopup } from '@/actions/popups';

interface Review {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

interface Popup {
  id: string;
  title: string;
  content: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'popups'>('reviews');
  
  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Popups State
  const [popups, setPopups] = useState<Popup[]>([]);
  const [showPopupForm, setShowPopupForm] = useState(false);
  const [editingPopup, setEditingPopup] = useState<Popup | null>(null);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    if (activeTab === 'reviews') {
      const data = await getAllReviews();
      setReviews(data as any);
    } else {
      const data = await getAllPopups();
      setPopups(data as any);
    }
    setLoading(false);
  };

  // Review Actions
  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    await updateReviewStatus(id, status);
    loadData();
  };

  const handleDeleteReview = async (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      await deleteReview(id);
      loadData();
    }
  };

  // Popup Actions
  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      image_url: formData.get('image_url') as string,
      cta_text: formData.get('cta_text') as string,
      cta_link: formData.get('cta_link') as string,
      is_active: formData.get('is_active') === 'on',
    };

    if (editingPopup) {
      await updatePopup(editingPopup.id, data);
    } else {
      await createPopup(data);
    }
    
    setShowPopupForm(false);
    setEditingPopup(null);
    loadData();
  };

  const handleTogglePopup = async (id: string, currentStatus: boolean) => {
    await togglePopupActive(id, currentStatus);
    loadData();
  };

  const handleDeletePopup = async (id: string) => {
    if (confirm('Are you sure you want to delete this pop-up?')) {
      await deletePopup(id);
      loadData();
    }
  };

  if (loading) return <div className="p-24 text-center">Loading admin dashboard...</div>;

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#07142b] mb-4">Admin Dashboard</h1>
        <p className="text-neutral-600">Manage client reviews and website pop-ups securely via Supabase.</p>
      </div>

      <div className="flex gap-4 mb-8 border-b border-neutral-200">
        <button 
          onClick={() => setActiveTab('reviews')}
          className={`py-3 px-6 font-semibold transition-colors border-b-2 ${activeTab === 'reviews' ? 'border-[#F05A28] text-[#F05A28]' : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}
        >
          Client Reviews
        </button>
        <button 
          onClick={() => setActiveTab('popups')}
          className={`py-3 px-6 font-semibold transition-colors border-b-2 ${activeTab === 'popups' ? 'border-[#F05A28] text-[#F05A28]' : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}
        >
          Website Pop-ups
        </button>
      </div>

      {activeTab === 'reviews' && (
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
                    {new Date(review.created_at).toLocaleDateString()}
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
                          onClick={() => handleUpdateStatus(review.id, 'approved')}
                          className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {review.status !== 'rejected' && (
                        <button 
                          onClick={() => handleUpdateStatus(review.id, 'rejected')}
                          className="bg-amber-50 text-amber-600 hover:bg-amber-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          Reject
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteReview(review.id)}
                        className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'popups' && (
        <div>
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => { setEditingPopup(null); setShowPopupForm(!showPopupForm); }}
              className="bg-[#1E293B] hover:bg-[#334155] text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
            >
              {showPopupForm ? 'Cancel' : <><Plus size={18} /> New Pop-up</>}
            </button>
          </div>

          {showPopupForm && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 mb-8">
              <h3 className="text-xl font-bold mb-4">{editingPopup ? 'Edit Pop-up' : 'Create Pop-up'}</h3>
              <form onSubmit={handlePopupSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title *</label>
                    <input type="text" name="title" required defaultValue={editingPopup?.title} className="w-full border rounded-lg p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input type="url" name="image_url" defaultValue={editingPopup?.image_url} className="w-full border rounded-lg p-2" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Content/Message *</label>
                  <textarea name="content" required rows={3} defaultValue={editingPopup?.content} className="w-full border rounded-lg p-2 resize-none"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">CTA Button Text</label>
                    <input type="text" name="cta_text" defaultValue={editingPopup?.cta_text} className="w-full border rounded-lg p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CTA Link</label>
                    <input type="text" name="cta_link" defaultValue={editingPopup?.cta_link} className="w-full border rounded-lg p-2" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="is_active" name="is_active" defaultChecked={editingPopup?.is_active} className="w-4 h-4" />
                  <label htmlFor="is_active" className="text-sm font-medium">Set as Active Pop-up (Will disable others)</label>
                </div>

                <button type="submit" className="bg-[#F05A28] text-white font-bold py-2 px-6 rounded-lg">Save Pop-up</button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popups.map(popup => (
              <div key={popup.id} className={`bg-white rounded-2xl shadow-sm border ${popup.is_active ? 'border-[#F05A28]' : 'border-neutral-200'} p-6 relative`}>
                {popup.is_active && <span className="absolute -top-3 right-4 bg-[#F05A28] text-white text-xs font-bold px-3 py-1 rounded-full">ACTIVE</span>}
                <h4 className="font-bold text-lg mb-2">{popup.title}</h4>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-3">{popup.content}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-100">
                  <button onClick={() => handleTogglePopup(popup.id, popup.is_active)} className={`text-sm font-medium ${popup.is_active ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {popup.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingPopup(popup); setShowPopupForm(true); }} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                    <button onClick={() => handleDeletePopup(popup.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
