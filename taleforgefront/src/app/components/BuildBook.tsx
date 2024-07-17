// src/app/components/BuildBook.tsx

'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import InputText from './InputText'
import DropDown from './Dropdown'
import { sendFormData } from '../utils/api'
import { FormData } from '../types/StoryBuilder'
import LoadingSpinner from './LoadingSpinner'

const BuildBook: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    characterName: '',
    storyTheme: '',
    readingLevel: '',
    language: '',
    pages: '',
    artStyle: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [router, setRouter] = useState(null)

  useEffect(() => {
    setRouter(useRouter())
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleDropdownChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await sendFormData(formData)
      console.log('Form data submitted successfully!')
      router.push({
        pathname: '/book-page',
        query: { bookData: JSON.stringify(response) }
      })
    } catch (error) {
      console.error('Error submitting form data:', error)
      setIsLoading(false)
      // Show error message to user
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-teal-600 rounded-lg shadow-lg p-8 w-full max-w-2xl text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Personalize Your Story!</h1>
        <p className="text-center mb-6">Welcome to your story builder. Please fill out the fields below.</p>
        
        <form onSubmit={handleSubmit}>
          <InputText 
            id="characterName" 
            label="Enter your character's name:" 
            type="text" 
            placeholder="Name" 
            value={formData.characterName}
            onChange={handleInputChange}
          />
          <InputText 
            id="storyTheme" 
            label="Enter the story's theme:" 
            type="text" 
            placeholder="Theme" 
            value={formData.storyTheme}
            onChange={handleInputChange}
          />
          
          <div className="flex flex-col items-center gap-4">
            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
              {isLoading ? 'Creating Story...' : 'Create a Story'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary w-full"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Hide Advanced Options' : 'Advanced Options'}
            </button>
          </div>

          {isLoading && <LoadingSpinner />}

          {showAdvanced && (
            <div className="mt-6 bg-teal-700 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Advanced Options</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <DropDown 
                  id="readingLevel" 
                  name="Reading Level" 
                  options={["Still learning to Read", "Beginner Reader", "Confident Reader"]}
                  value={formData.readingLevel}
                  onChange={(value) => handleDropdownChange('readingLevel', value)}
                />
                <DropDown 
                  id="language" 
                  name="Language" 
                  options={["US English", "Arabic", "Spanish"]}
                  value={formData.language}
                  onChange={(value) => handleDropdownChange('language', value)}
                />
                <DropDown 
                  id="pages" 
                  name="Pages" 
                  options={["5", "10", "15"]}
                  value={formData.pages}
                  onChange={(value) => handleDropdownChange('pages', value)}
                />
                <DropDown 
                  id="artStyle" 
                  name="Art Style" 
                  options={["WaterColor", "Cartoon", "Collage Art"]}
                  value={formData.artStyle}
                  onChange={(value) => handleDropdownChange('artStyle', value)}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

// Use dynamic import to ensure the component is only rendered on the client side
export default dynamic(() => Promise.resolve(BuildBook), { ssr: false })
