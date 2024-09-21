import nodemailer from 'nodemailer'
import type { EmailOptions } from '@/types/email'

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST, // Updated host for Mailtrap
  port: Number(process.env.MAILTRAP_PORT), // Updated port for Mailtrap
  secure: process.env.MAILTRAP_SECURE === 'true', // false for Mailtrap
  auth: {
    user: process.env.MAILTRAP_USER, // Mailtrap username
    pass: process.env.MAILTRAP_PASS, // Mailtrap password
  },
})

export async function sendConfirmationEmail(to: string, options: EmailOptions) {
  const mailOptions = {
    from: `"Your Company" <${process.env.EMAIL_FROM}>`,
    to,
    subject: 'Checkout Confirmation',
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
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Failed to send confirmation email:', error)
    throw error // Re-throw to handle it in the calling function
  }
}