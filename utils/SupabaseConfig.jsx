import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://kuolpepncedbnirbajxp.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1b2xwZXBuY2VkYm5pcmJhanhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxMjgxMjAsImV4cCI6MjA0NTcwNDEyMH0.5w5LN-veFlgRjwKVtN6wPRb4KH0ye4Re9NpT08jDfKs')
