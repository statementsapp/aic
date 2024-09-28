import { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, confirmationNumber, productType, price } = req.body

    try {
      const { data, error } = await resend.emails.send({
        from: 'UseAI.th <noreply@useai.th>',
        to: [to],
        subject: 'Order Confirmation - UseAI.th',
        html: `
          <h1>Thank you for your order!</h1>
          <p>Your order details:</p>
          <ul>
            <li>Confirmation Number: ${confirmationNumber}</li>
            <li>Product Type: ${productType}</li>
            <li>Price: ${price} THB</li>
          </ul>
          <p>We'll process your order shortly. If you have any questions, please contact our support team.</p>
          <p>Best regards,<br>The UseAI.th Team</p>
        `,
      })

      if (error) {
        return res.status(400).json({ error: error.message })
      }

      return res.status(200).json({ data })
    } catch (error) {
      return res.status(500).json({ error: 'An unexpected error occurred while sending the email' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}