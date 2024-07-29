'use client'
import React, { useState } from 'react'
import InputText from '../components/InputText'
import { auth } from '@/app/firebase/config'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)
  const router = useRouter()  // Ensure using this instance of the router

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Validate email and password before making the API request
    if (!email || !password) {
      console.error("Email and password are required")
      return
    }

    try {
      const res = await signInWithEmailAndPassword(email, password)
      console.log('User signed in:', res)
      sessionStorage.setItem('user', JSON.stringify(true));
      setPassword('')
      setEmail('')
      console.log('User display name:', result.user.displayName);
      router.push('/')
    } catch (error) {
      console.error('Error signing in:', error)
    }
    console.log('Form submitted with:', { email, password })
  }

  return (
    <div className="bg-teal-600 rounded-lg shadow-lg p-8 w-full max-w-2xl text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Login to TaleForge</h1>
      <form onSubmit={handleSubmit}>
        <InputText id="email" label="Your Email Address:" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputText id="password" label="Your Password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex flex-col items-center gap-4">
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>Login</button>
          {error && <p className="text-red-500">{error.message}</p>}
        </div>
      </form>
    </div>
  )
}

export default LoginForm
