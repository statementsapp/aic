import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

interface EmailOptions {
  to: string
  subject: string
  text: string
}

export async function sendEmail({ to, subject, text }: EmailOptions): Promise<void> {
  console.log('Attempting to send email:', { to, subject });
  const msg = {
    to,
    from: process.env.FROM_EMAIL || 'jamiejamesandpatty@gmail.com',
    subject,
    text,
  }

  try {
    const result = await sgMail.send(msg);
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}