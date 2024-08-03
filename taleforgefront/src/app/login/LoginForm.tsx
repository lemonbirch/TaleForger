'use client'
import React, { useState, useEffect } from 'react'
import InputText from '../components/InputText'
import { auth, googleAuthProvider } from '@/app/firebase/config'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { signInWithPopup } from "firebase/auth"

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(true))
      router.push('/')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      console.error("Email and password are required")
      return
    }

    try {
      await signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.error('Error signing in:', error)
    }
    console.log('Form submitted with:', { email, password })
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider)
      const user = result.user
      console.log('Google Sign-In user:', user)
      sessionStorage.setItem('user', JSON.stringify(true))
      router.push('/')
    } catch (error) {
      console.error("Error during Google sign in:", error)
    }
  }

  return (
    <div className="bg-teal-600 rounded-lg shadow-lg p-8 w-full max-w-2xl text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Login to TaleForge</h1>
      <div className="flex flex-col items-center gap-4 mb-6">
        <button 
          type="button" 
          className="btn btn-google w-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 rounded-md p-2" 
          onClick={handleGoogleSignIn}
        >
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" className="w-5 h-5 mr-2" />
          Sign In with Google
        </button>
        <hr className="w-full border-gray-300" />
      </div>
      <form onSubmit={handleSubmit}>
        <InputText 
          id="email" 
          label="Your Email Address:" 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <InputText 
          id="password" 
          label="Your Password" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <div className="flex flex-col items-center gap-4">
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>Login</button>
          {error && <p className="text-red-500">{error.message}</p>}
        </div>
      </form>
    </div>
  )
}

export default LoginForm
