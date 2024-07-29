// app/signup/SignUpForm.tsx

'use client'
import React, { useState, useEffect } from 'react'
import InputText from '../components/InputText'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'

const SignUpForm = () => {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)

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
    }
  }, [user])

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!passwordsMatch) {
      console.error("Passwords do not match")
      return
    }

    try {
      await createUserWithEmailAndPassword(email, password)
    } catch (error) {
      console.error(error)
    }

    console.log('Form submitted with:', { username, email, password, confirmPassword })
  }

  return (
    <div className="bg-teal-600 rounded-lg shadow-lg p-8 w-full max-w-2xl text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Sign Up For Free!</h1>
      
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