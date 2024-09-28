import { Resend } from 'resend'

function getResendInstance() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return null
  }
  console.log('Resend API Key found')
  return new Resend(apiKey)
}

interface SendConfirmationEmailParams {
  to: string
  confirmationNumber: string
  productType: 'text' | 'photo'
  price: number
}

export async function sendConfirmationEmail({
  to,
  confirmationNumber,
  productType,
  price,
}: SendConfirmationEmailParams) {
  console.log('Sending confirmation email:', { to, confirmationNumber, productType, price })
  const resend = getResendInstance()
  if (!resend) {
    console.error('Failed to create Resend instance')
    return { error: true, message: 'Email service is not configured' }
  }

  try {
    console.log('Attempting to send email via Resend')
    const { data, error } = await resend.emails.send({
      from: 'UseAI.in.th <noreply@useai.in.th>',
      to: [to],
      subject: 'Order Confirmation - UseAI.in.th',
      html: `
        <h1>Thank you for your order!</h1>
        <p>Your order details:</p>
        <ul>
          <li>Confirmation Number: ${confirmationNumber}</li>
          <li>Product Type: ${productType}</li>
          <li>Price: ${price} THB</li>
        </ul>
        <p>We'll process your order shortly. If you have any questions, please contact our support team.</p>
        <p>Best regards,<br>The UseAI.in.th Team</p>
      `,
    })

    if (error) {
      console.error('Error from Resend:', error)
      return { error: true, message: error.message }
    }

    console.log('Email sent successfully:', data)
    return { error: false, data }
  } catch (error) {
    console.error('Unexpected error sending email:', error)
    return { error: true, message: 'An unexpected error occurred while sending the email' }
  }
}