import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xtezjzgzwckufeoziwfu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0ZXpqemd6d2NrdWZlb3ppd2Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MTU4ODYsImV4cCI6MjA2MTE5MTg4Nn0.Hzw2jwMOd9opCRlJinRxbfAE6VP_sxyq_ZgVMt3KCzA'

export const supabase = createClient(supabaseUrl, supabaseKey) 