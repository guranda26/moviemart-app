import createClient from "@/utils/supabase/server"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { email, name, type, language, year, comment, image_src } = await req.json()

    if (!email || !name || !type || !language || !year) {
      return new Response(
        JSON.stringify({ error: 'All fields are required.' }),
        { status: 400 }
      )
    }
    
    const supabase = await createClient()
    const { data, error } = await supabase.from('wishlist').insert([
      {
        email,
        name,
        type,
        language,
        year,
        comment,
        image_src
      },
    ])

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ message: 'Form submitted successfully', data }),
      { status: 200 }
    )
  } catch (error) {
    if(error instanceof Error) {
      console.error('Error submitting form:', error)
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      )
    } else {
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        { status: 500 }
      )
    }
  }
}
