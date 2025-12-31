-- Create a table to store analysis results
create table public.analysis_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id), -- Nullable if we want to allow guest saves, strictly link if logged in
  profile_data jsonb not null,
  ai_insights jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.analysis_results enable row level security;

-- Policy: Allow anyone to read results (for sharing)
create policy "Anyone can view analysis results"
  on public.analysis_results for select
  using ( true );

-- Policy: Allow authenticated users to insert their own results
create policy "Users can insert their own results"
  on public.analysis_results for insert
  with check ( auth.uid() = user_id );

-- Policy: Allow users to update their own results
create policy "Users can update their own results"
  on public.analysis_results for update
  using ( auth.uid() = user_id );
