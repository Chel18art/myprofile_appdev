import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fdtsjrqjfhsypaygnjlv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkdHNqcnFqZmhzeXBheWduamx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMzA4NTcsImV4cCI6MjA1MjcwNjg1N30.t2sPHBF8VyUIDSrBFNHaNOCUg3mo1aowju2LrT3xLEE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
