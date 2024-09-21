import { z } from 'zod'

export const BusinessConsultingInquirySchema = z.object({
  // Define your schema here
})

export type BusinessConsultingInquiry = z.infer<typeof BusinessConsultingInquirySchema>