'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitReview(data: { quote: string; author: string; role: string; company: string; rating: number }) {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('reviews')
      .insert([
        {
          ...data,
          status: 'pending',
        }
      ]);
      
    if (error) {
      console.error('Supabase Insert Error:', JSON.stringify(error, null, 2));
      return { success: false, error: error.message || 'Failed to insert into Supabase' };
    }
    
    return { success: true };
  } catch (err: any) {
    console.error('Catch Error submitting review:', err);
    return { success: false, error: err.message || 'Unknown error occurred' };
  }
}

export async function getApprovedReviews() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching approved reviews:', error);
    return [];
  }
  
  return data || [];
}

// Admin Actions
export async function getAllReviews() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching all reviews:', error);
    return [];
  }
  
  return data || [];
}

export async function updateReviewStatus(id: string, status: 'pending' | 'approved' | 'rejected') {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('reviews')
    .update({ status })
    .eq('id', id);
    
  if (error) {
    console.error('Error updating review status:', error);
    return { success: false, error: error.message };
  }
  
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteReview(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting review:', error);
    return { success: false, error: error.message };
  }
  
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}
