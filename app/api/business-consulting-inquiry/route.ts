import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Implement your GET logic here
  return NextResponse.json({ message: 'GET request received' })
}

export async function POST(request: Request) {
  // Implement your POST logic here
  const body = await request.json()
  return NextResponse.json({ message: 'POST request received', data: body })
}
