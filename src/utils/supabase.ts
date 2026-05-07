import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ciyshjqzltzdqsjgdcrq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpeXNoanF6bHR6ZHFzamdkY3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwODExMDYsImV4cCI6MjA5MzY1NzEwNn0.XBuYVrAwa9NDTNJrLa-PA444injdOybbcj-1m2gHq1s';

export const supabase = createClient(supabaseUrl, supabaseKey);
