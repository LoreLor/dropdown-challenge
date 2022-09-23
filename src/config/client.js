import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    "https://xylamfomrdlrtaxkardr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5bGFtZm9tcmRscnRheGthcmRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM4NzUwMzEsImV4cCI6MTk3OTQ1MTAzMX0.edAo4EWzYpVdA-cgyf8WT8U6kQRkMjF20i4JIsNRpV0"
)