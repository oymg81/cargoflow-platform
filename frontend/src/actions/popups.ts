'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getActivePopup() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('popups')
    .select('*')
    .eq('is_active', true)
    .single();
    
  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
    console.error('Error fetching active popup:', error);
    return null;
  }
  
  return data || null;
}

export async function getAllPopups() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('popups')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching all popups:', error);
    return [];
  }
  
  return data || [];
}

export async function createPopup(data: { title: string; content: string; image_url?: string; cta_text?: string; cta_link?: string; is_active?: boolean }) {
  const supabase = await createClient();
  
  // If setting to active, deactivate others first
  if (data.is_active) {
    await supabase.from('popups').update({ is_active: false }).neq('id', '00000000-0000-0000-0000-000000000000'); // Hack to update all
  }
  
  const { error } = await supabase
    .from('popups')
    .insert([data]);
    
  if (error) {
    console.error('Error creating popup:', error);
    return { success: false, error: error.message };
  }
  
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function updatePopup(id: string, data: { title: string; content: string; image_url?: string; cta_text?: string; cta_link?: string; is_active?: boolean }) {
  const supabase = await createClient();
  
  // If setting to active, deactivate others first
  if (data.is_active) {
    await supabase.from('popups').update({ is_active: false }).neq('id', id);
  }
  
  const { error } = await supabase
    .from('popups')
    .update(data)
    .eq('id', id);
    
  if (error) {
    console.error('Error updating popup:', error);
    return { success: false, error: error.message };
  }
  
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function togglePopupActive(id: string, currentStatus: boolean) {
  const supabase = await createClient();
  
  if (!currentStatus) {
    // We are activating it, so deactivate all others
    await supabase.from('popups').update({ is_active: false }).neq('id', id);
  }
  
  const { error } = await supabase
    .from('popups')
    .update({ is_active: !currentStatus })
    .eq('id', id);
    
  if (error) {
    console.error('Error toggling popup status:', error);
    return { success: false, error: error.message };
  }
  
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function deletePopup(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('popups')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting popup:', error);
    return { success: false, error: error.message };
  }
  
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}
