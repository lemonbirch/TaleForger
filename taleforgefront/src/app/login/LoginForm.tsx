'use client'
import React, {useState} from 'react'
import InputText from '../components/InputText'
const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log('Form submitted with:', {email, password})
      // Here you would typically send this data to your backend
    }
  return (
    <div className="bg-teal-600 rounded-lg shadow-lg p-8 w-full max-w-2xl text-white">
    <h1 className="text-3xl font-bold text-center mb-6">Login to TaleForge</h1>
    
    <form onSubmit={handleSubmit}>
    <InputText id="email" label="Your Email Address:" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputText id="password" label="Your Password" type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
      
      
      <div className="flex flex-col items-center gap-4">
        <button type="submit" className="btn btn-primary w-full">Login</button>
        
      </div>
    </form>

    
  </div>
  )
}

export default LoginForm