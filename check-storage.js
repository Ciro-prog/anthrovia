
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

async function verifyUpload() {
  console.log('1. Logging in...')
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'betsysanchez@anthroviahr.com',
    password: 'james0701',
  })

  if (authError) {
    console.error('Login Failed:', authError.message)
    return
  }
  console.log('Login Successful!')

  console.log('2. Attempting upload to "media" bucket...')
  
  // Create a dummy file object (mocking browser File object structure if needed, but for node we pass Buffer/string)
  // We need to pass the 'content-type' option to satisfy the bucket restriction
  const fileName = `test-image-${Date.now()}.png`
  const fileBody = Buffer.from('fake image content') // In node we can use Buffer
  
  const { data, error } = await supabase.storage
    .from('media')
    .upload(fileName, fileBody, {
        contentType: 'image/png'
    })

  if (error) {
    console.error('Upload Error:', error.message)
    console.error('Error Details:', error)
  } else {
    console.log('Upload SUCCESSFUL!', data)
    console.log('RLS Policy Verification: PASSED')
    
    // Cleanup
    console.log('3. Cleaning up (deleting test file)...')
    await supabase.storage.from('media').remove([fileName])
  }
}

verifyUpload()
