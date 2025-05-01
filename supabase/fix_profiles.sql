-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;

-- Create new policies that allow anonymous inserts
CREATE POLICY "Enable insert for authenticated users" ON profiles
    FOR INSERT TO authenticated, anon
    WITH CHECK (true);

CREATE POLICY "Enable select for users based on user_id" ON profiles
    FOR SELECT TO authenticated, anon
    USING (true);

CREATE POLICY "Enable update for users based on user_id" ON profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = id); 