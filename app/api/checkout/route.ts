import { NextResponse } from 'next/server'
import { checkoutInputSchema } from '../../lib/validation'
import { sendConfirmationEmail } from '@/services/email'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const input = checkoutInputSchema.parse(data)

    const confirmationNumber = generateConfirmationNumber()

    const emailOptions = {
      prompt: input.prompt,
      email: input.email,
      productType: input.productType,
      specialInstructions: input.specialInstructions,
      fileName: input.fileName,
      confirmationNumber,
    }

    let emailInfo
    try {
      emailInfo = await sendConfirmationEmail(input.email, emailOptions)
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Continue with checkout even if email fails
      emailInfo = { error: 'Failed to send confirmation email' }
    }

    return NextResponse.json({ 
      success: true, 
      data: { 
        confirmationNumber,
        emailInfo,
      } 
    })
  } catch (error) {
    console.error('Checkout failed:', error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'An unexpected error occurred during checkout' },
      { status: 500 }
    )
  }
}

function generateConfirmationNumber(): string {
  return Math.random().toString(36).substr(2, 9).toUpperCase()
}