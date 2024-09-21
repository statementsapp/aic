export interface EmailOptions {
  prompt: string
  email: string
  productType: 'text' | 'photo'
  specialInstructions?: string
  fileName?: string
  confirmationNumber: string
}