
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://efusjzindfipavulmaxp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdXNqemluZGZpcGF2dWxtYXhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMTAzOTEsImV4cCI6MjA1NTc4NjM5MX0.-k-mo8E_GbRxNcSGc5c_O2mbSHjoynFb4GpMrLFIEAk';

export const supabase = createClient(supabaseUrl, supabaseKey);
