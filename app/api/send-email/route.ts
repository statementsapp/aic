import { NextResponse } from 'next/server'
import { sendConfirmationEmail } from '../../services/email'

export async function POST(request: Request) {
  const body = await request.json()
  const { to, confirmationNumber, productType, price } = body

  console.log('Attempting to send email:', { to, confirmationNumber, productType, price })

  const result = await sendConfirmationEmail({
    to,
    confirmationNumber,
    productType,
    price,
  })

  console.log('Email send result:', result)

  if (result.error) {
    console.error('Error sending email:', result.message)
    return NextResponse.json({ error: result.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data: result.data })
}