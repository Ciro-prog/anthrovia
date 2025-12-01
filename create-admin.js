import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Read .env file manually
const envPath = path.resolve(process.cwd(), '.env')
const envContent = fs.readFileSync(envPath, 'utf-8')

const envVars = envContent.split('\n').reduce((acc, line) => {
  const firstEquals = line.indexOf('=')
  if (firstEquals !== -1) {
    const key = line.slice(0, firstEquals).trim()
    const value = line.slice(firstEquals + 1).trim()
    // Remove quotes if present
    acc[key] = value.replace(/^["']|["']$/g, '')
  }
  return acc
}, {})

const supabaseUrl = envVars.VITE_SUPABASE_URL
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdmin() {
  const email = 'betsysanchez@anthroviahr.com'
  const password = 'james0701'

  console.log(`Creating user: '${email}' (Length: ${email.length})`)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Error creating user:', error.message)
    // Try to sign in to see if user already exists
    if (error.message.includes('already registered')) {
        console.log('User already exists, trying to sign in...')
    }
  } else {
    console.log('User created successfully:', data.user)
    console.log('NOTE: If email confirmation is enabled, you need to confirm the email before logging in.')
  }
}

createAdmin()
