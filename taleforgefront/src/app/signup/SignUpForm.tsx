// app/signup/SignUpForm.tsx
'use client'
import React, {useState} from 'react'
import InputText from '../components/InputText'

const SignUpForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted with:', { username, email, password, confirmPassword })
    // Here you would typically send this data to your backend
  }
  return (
    <div className="bg-teal-600 rounded-lg shadow-lg p-8 w-full max-w-2xl text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Sign Up For Free!</h1>
      
      <form onSubmit={handleSubmit}>
        <InputText id="username" label="Username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <InputText id="email" label="Your Email Address:" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputText id="password" label="Your Password" type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
        <InputText id="confirm" label=" Confirm Your Password:" type="password" placeholder="Confirm Password"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        
        <div className="flex flex-col items-center gap-4">
          <button type="submit" className="btn btn-primary w-full">Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm