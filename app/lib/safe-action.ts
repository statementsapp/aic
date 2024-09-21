import { z } from 'zod'

export function action<T extends z.ZodType>(
  schema: T,
  handler: (input: z.infer<T>) => Promise<any>
) {
  return async (input: z.infer<T>) => {
    const result = schema.safeParse(input)
    if (!result.success) {
      return { success: false, message: 'Invalid input' }
    }
    return handler(result.data)
  }
}