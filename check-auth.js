
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Read .env file manually
const envPath = path.resolve(process.cwd(), '.env')
let envVars = {}
try {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    envVars = envContent.split('\n').reduce((acc, line) => {
        const firstEquals = line.indexOf('=')
        if (firstEquals !== -1) {
            const key = line.slice(0, firstEquals).trim()
            const value = line.slice(firstEquals + 1).trim()
            acc[key] = value.replace(/^["']|["']$/g, '')
        }
        return acc
    }, {})
} catch (e) {
    console.log('Could not read .env file, trying process.env')
    envVars = process.env
}

const supabaseUrl = envVars.VITE_SUPABASE_URL
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkAuth() {
  const email = 'betsysanchez@anthroviahr.com'
  const password = 'james0701'

  console.log(`Attempting login for: ${email}`)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Login FAILED:', error.message)
    if (error.message.includes('Email not confirmed')) {
        console.log('ACTION NEEDED: The email address needs to be confirmed. Check the inbox for ' + email)
    }
  } else {
    console.log('Login SUCCESSFUL!')
    console.log('User ID:', data.user.id)
    console.log('Email:', data.user.email)
  }
}

checkAuth()
