'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })
    if (result?.error) {
      // Handle error
      console.error(result.error)
    } else {
      router.push('/checkout')
    }
  }

  const handleSocialSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/checkout' })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full mb-4">Sign In with Email</Button>
        </form>
        <div className="flex flex-col space-y-2">
          <Button onClick={() => handleSocialSignIn('google')} className="w-full bg-red-500 hover:bg-red-600">
            Sign in with Google
          </Button>
          <Button onClick={() => handleSocialSignIn('twitter')} className="w-full bg-blue-400 hover:bg-blue-500">
            Sign in with Twitter
          </Button>
        </div>
      </div>
    </div>
  )
}