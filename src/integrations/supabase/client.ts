// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://efusjzindfipavulmaxp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdXNqemluZGZpcGF2dWxtYXhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMTAzOTEsImV4cCI6MjA1NTc4NjM5MX0.-k-mo8E_GbRxNcSGc5c_O2mbSHjoynFb4GpMrLFIEAk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);