import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ctxjykefuvdnzgmepqok.supabase.co"
const supabaseKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0eGp5a2VmdXZkbnpnbWVwcW9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyNTkyMDcsImV4cCI6MjA0NzgzNTIwN30.rnfvorJEXMG_YK_lGK-5ZUup1olQ5_gWLl8Fn0SK3E0"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase