import nodemailer from 'nodemailer'
import type { EmailOptions } from '@/types/email'

const transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: process.env.MAILTRAP_PASSWORD
  },
  secure: false, // Use STARTTLS
})

export async function sendConfirmationEmail(to: string, options: EmailOptions) {
  const mailOptions = {
    from: `"UseAI.th" <${process.env.EMAIL_FROM || 'noreply@useai.th'}>`,
    to,
    subject: 'Checkout Confirmation',
    text: `Thank you for your purchase!\n\nPrompt: ${options.prompt}\nEmail: ${options.email}\nProduct Type: ${options.productType}\n${options.specialInstructions ? `Special Instructions: ${options.specialInstructions}\n` : ''}${options.fileName ? `File: ${options.fileName}\n` : ''}Your confirmation number is: ${options.confirmationNumber}`,
    html: `
      <h1>Thank you for your purchase!</h1>
      <p><strong>Prompt:</strong> ${options.prompt}</p>
      <p><strong>Email:</strong> ${options.email}</p>
      <p><strong>Product Type:</strong> ${options.productType}</p>
      ${options.specialInstructions ? `<p><strong>Special Instructions:</strong> ${options.specialInstructions}</p>` : ''}
      ${options.fileName ? `<p><strong>File:</strong> ${options.fileName}</p>` : ''}
      <p>Your confirmation number is: ${options.confirmationNumber}</p>
    `,
  }

  try {
    console.log('Attempting to send email to:', to)
    const info = await transport.sendMail(mailOptions)
    console.log('Confirmation email sent successfully to:', to)
    console.log('Message ID:', info.messageId)
    return info
  } catch (error) {
    console.error('Failed to send confirmation email:', error)
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
    }
    throw error
  }
}