'use client'
import React, { useState, useEffect } from 'react'
import InputText from '../components/InputText'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, googleAuthProvider } from '@/app/firebase/config'
import { updateProfile, signInWithPopup } from "firebase/auth";
import { useRouter } from 'next/navigation'

const SignUpForm = () => {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)
  const router = useRouter()

  const passwordsMatch = password === confirmPassword
  const bothPasswordFieldsTouched = passwordTouched && confirmPasswordTouched
  const showPasswordMismatchError = !passwordsMatch && bothPasswordFieldsTouched
  const isSubmitDisabled = loading || !passwordsMatch || password.length === 0 || email.length === 0 || username.length === 0

  useEffect(() => {
    if (user) {
      console.log(user)
      sessionStorage.setItem('user', JSON.stringify(true))
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setUsername('')
      setPasswordTouched(false)
      setConfirmPasswordTouched(false)
      router.push('/')
    }
  }, [user, router])

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!passwordsMatch) {
      console.error("Passwords do not match")
      return
    }

    try {
      const result = await createUserWithEmailAndPassword(email, password)
      if (result && result.user) {
        const user = result.user
        await updateProfile(user, {
          displayName: username
        })
        console.log('User display name:', result.user.displayName)
        console.log('User profile updated with display name:', username)
      }
    } catch (error) {
      console.error("Error during sign up:", error)
    }

    console.log('Form submitted with:', { username, email, password, confirmPassword })
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
      <h1 className="text-3xl font-bold text-center mb-6">Sign Up For Free!</h1>
      <div className="flex flex-col items-center gap-4 mb-6">
        <button 
          type="button" 
          className="btn btn-google w-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 rounded-md p-2" 
          onClick={handleGoogleSignIn}
        >
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
        <hr className="w-full border-gray-300" />
      </div>
      <form onSubmit={handleSignup}>
        <InputText 
          id="username" 
          label="Username" 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
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
          onBlur={() => setPasswordTouched(true)}
        />
        <InputText 
          id="confirm" 
          label="Confirm Your Password:" 
          type="password" 
          placeholder="Confirm Password"  
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => setConfirmPasswordTouched(true)}
        />
        
        <div className="flex flex-col items-center gap-4">
          <button 
            type="submit" 
            className={`btn w-full ${isSubmitDisabled ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'}`} 
            disabled={isSubmitDisabled}
          >
            Sign Up
          </button>
          
          {error && <p className="text-red-500">{error.message}</p>}
          {showPasswordMismatchError && <p className="text-red-500">Passwords do not match</p>}
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
