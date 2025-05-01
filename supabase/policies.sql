-- Enable RLS
alter table profiles enable row level security;

-- Create policy for inserting profiles
create policy "Users can insert their own profile"
on profiles for insert
with check (auth.uid() = id);

-- Create policy for selecting profiles
create policy "Users can view their own profile"
on profiles for select
using (auth.uid() = id);

-- Create policy for updating profiles
create policy "Users can update their own profile"
on profiles for update
using (auth.uid() = id); 