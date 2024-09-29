"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Twitter } from 'lucide-react'
import { useTheme } from '@/app/contexts/ThemeContext'
import { z } from 'zod'

const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  message: z.string().min(1, 'Message is required'),
})

type InquiryForm = z.infer<typeof inquirySchema>

// function ThemeSwitcher() {
//   const { theme, setTheme } = useTheme()
//   return (
//     <div className="flex space-x-2">
//       <button onClick={() => setTheme('default')} className={`px-2 py-1 rounded text-sm ${theme === 'default' ? 'bg-blue-500' : 'bg-blue-700'}`}>Default</button>
//       <button onClick={() => setTheme('modern')} className={`px-2 py-1 rounded text-sm ${theme === 'modern' ? 'bg-gray-700' : 'bg-gray-900'}`}>Modern</button>
//       <button onClick={() => setTheme('vibrant')} className={`px-2 py-1 rounded text-sm ${theme === 'vibrant' ? 'bg-purple-500' : 'bg-purple-700'}`}>Vibrant</button>
//     </div>
//   )
// }

function Header() {
  return (
    <div className="relative z-10">
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center py-8 relative">
          <Link href="/" className="flex items-center">
            <Sparkles className="w-8 h-8 mr-2" />
            <span className="text-2xl font-bold tracking-tight">UseAI.th</span>
          </Link>
          <div className="absolute left-1/4 top-0 transform -translate-x-1/2">
            {/*<ThemeSwitcher />*/}
          </div>
          <div className="flex items-center">
            <Link href="https://twitter.com/useaith" target="_blank" rel="noopener noreferrer" className="ml-4">
              <Twitter className="w-6 h-6 text-blue-400" />
            </Link>
          </div>
        </header>
      </div>
    </div>
  )
}

export function BusinessConsultingInquiry() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
  })
  const { theme } = useTheme()

  function onSubmit(data: InquiryForm) {
    console.log(data)
    setIsSubmitted(true)
  }

  function getThemeClasses() {
    if (theme === 'modern') return 'bg-gray-900 text-white'
    if (theme === 'vibrant') return 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white'
    return 'bg-blue-600 text-white'
  }

  function getButtonClasses() {
    if (theme === 'modern') return 'bg-white text-gray-800 hover:bg-gray-200'
    if (theme === 'vibrant') return 'bg-yellow-400 text-red-600 hover:bg-yellow-300'
    return 'bg-white text-blue-500 hover:bg-blue-100'
  }

  function getInputClasses() {
    if (theme === 'modern') return 'bg-gray-700 text-white border-gray-600 focus:border-gray-500'
    if (theme === 'vibrant') return 'bg-red-500 text-white border-red-400 focus:border-yellow-400'
    return 'bg-blue-400 text-white border-blue-300 focus:border-white'
  }

  return (
    <div className={`min-h-screen ${getThemeClasses()}`}>
      <Header />
      <div className="container mx-auto px-4">
        {!isSubmitted ? (
          <>
            <Link href="/" className="inline-flex items-center mb-4 text-sm hover:underline">
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-6 text-center">How can we help you?</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl mx-auto bg-opacity-20 bg-black p-8 rounded-lg shadow-md">
              <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <input
                  {...register('name')}
                  id="name"
                  className={`w-full p-2 border rounded ${getInputClasses()}`}
                  placeholder="Enter your name"
                  required
                />
                {errors.name && <span className="text-yellow-300 text-sm">{errors.name.message}</span>}
              </div>

              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  className={`w-full p-2 border rounded ${getInputClasses()}`}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && <span className="text-yellow-300 text-sm">{errors.email.message}</span>}
              </div>

              <div>
                <label htmlFor="message" className="block mb-1">Message</label>
                <textarea
                  {...register('message')}
                  id="message"
                  className={`w-full p-2 border rounded h-32 ${getInputClasses()}`}
                  placeholder="How can we assist you?"
                />
                {errors.message && <span className="text-yellow-300 text-sm">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                className={`w-full px-4 py-2 rounded ${getButtonClasses()}`}
              >
                Submit Inquiry
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">Thank you for your inquiry!</h1>
            <p className="mb-6">We've received your message and will get back to you soon.</p>
            <Link href="/" className="inline-flex items-center text-sm hover:underline">
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}