-- Create habits table
CREATE TABLE IF NOT EXISTS public.habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Uncategorized',
  color TEXT DEFAULT '#8b5cf6',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create habit_logs table
CREATE TABLE IF NOT EXISTS public.habit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  habit_id UUID REFERENCES public.habits(id) ON DELETE CASCADE NOT NULL,
  status BOOLEAN DEFAULT false NOT NULL,
  note TEXT,
  logged_date DATE NOT NULL,
  UNIQUE(habit_id, logged_date)
);

-- Create sleep_logs table
CREATE TABLE IF NOT EXISTS public.sleep_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  logged_date DATE NOT NULL,
  hours_slept FLOAT DEFAULT 0.0 NOT NULL,
  is_restful BOOLEAN DEFAULT false NOT NULL,
  UNIQUE(logged_date)
);

-- Set Row Level Security
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_logs ENABLE ROW LEVEL SECURITY;

-- Create Policies
-- Make everything accessible for anonymous (local/dev testing bypass)

CREATE POLICY "Enable read access for all users"
  ON public.habits FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users"
  ON public.habits FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users"
  ON public.habits FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users"
  ON public.habits FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users"
  ON public.habit_logs FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users"
  ON public.habit_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users"
  ON public.habit_logs FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users"
  ON public.habit_logs FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users"
  ON public.sleep_logs FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users"
  ON public.sleep_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users"
  ON public.sleep_logs FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users"
  ON public.sleep_logs FOR DELETE USING (true);
