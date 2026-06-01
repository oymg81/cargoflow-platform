-- Run this SQL in your Supabase SQL Editor to set up the tables for the Logisti-K platform.

-- 1. Create the Reviews table
CREATE TABLE public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    role TEXT,
    company TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT only pending reviews (Submit Review)
CREATE POLICY "Allow anonymous users to insert pending reviews"
    ON public.reviews
    FOR INSERT
    TO public
    WITH CHECK (status = 'pending');

-- Allow anonymous users to SELECT only APPROVED reviews
CREATE POLICY "Allow anonymous users to read approved reviews"
    ON public.reviews
    FOR SELECT
    TO public
    USING (status = 'approved');
    
-- Admin dashboard note:
-- Do NOT allow public anon users to update, approve, reject, or delete reviews in production.
-- Admin approve/reject/delete operations must be handled through protected server-side admin actions.


-- 2. Create the Popups table
CREATE TABLE public.popups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    cta_text TEXT,
    cta_link TEXT,
    is_active BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for popups
ALTER TABLE public.popups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to SELECT the active popup
CREATE POLICY "Allow anonymous users to read active popup"
    ON public.popups
    FOR SELECT
    TO public
    USING (is_active = true);
    
-- Admin dashboard note:
-- Do NOT allow public anon users to create, update, toggle, or delete popups in production.
-- Admin popup management must be handled through protected server-side admin actions.
