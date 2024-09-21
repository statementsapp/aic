import { z } from 'zod'

export const checkoutInputSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  email: z.string().email("Invalid email address"),
  productType: z.enum(["text", "photo"]),
  specialInstructions: z.string().optional(),
  fileName: z.string().optional(),
})