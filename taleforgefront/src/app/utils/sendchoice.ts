import { FormData } from '../types/choices'

export const sendFormData = async (formData: FormData): Promise<void> => {
  const response = await fetch('http://localhost:3001/api/submitFormData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    throw new Error('Failed to submit form data')
  }
}