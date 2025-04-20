/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDatabase } from '@/lib/mongoose'
import { NextRequest, NextResponse } from 'next/server'                     // :contentReference[oaicite:0]{index=0}
import { UserProfile } from '../../../../models/UserProfile'

export async function GET(request: NextRequest) {
  // 1. Parse the ?code=… query param
  const { searchParams } = new URL(request.url)                            // :contentReference[oaicite:1]{index=1}
  const code = searchParams.get('code')
    const email = searchParams.get('email')
  if (!code) {
    return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 })
  }

  // 2. Exchange code for access token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', { // :contentReference[oaicite:2]{index=2}
    method: 'POST',
    headers: {
      'Accept':       'application/json',  
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id:     process.env.NEXT_PUBLIC_GITHUB_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri:  `${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}/api/auth/github`,
    }),
  })
  if (!tokenRes.ok) {
    return NextResponse.json({ error: 'Token exchange failed' }, { status: 502 })
  }
  const { access_token } = await tokenRes.json() as { access_token?: string }
  if (!access_token) {
    return NextResponse.json({ error: 'No access token returned' }, { status: 502 })
  }

    await connectToDatabase();



    // const result = await UserProfile.findOneAndUpdate(
    //     { email },
    //     { $set: { github_oauth: access_token } },
    //     { new: true, upsert: false }   // `new: true` returns the doc after update
    //   );


   


  // 4. Return the GitHub username
  return NextResponse.json({access_token  , email:email});

}