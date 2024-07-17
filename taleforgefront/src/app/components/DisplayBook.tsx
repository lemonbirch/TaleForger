// src/app/components/DisplayBook.tsx

'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import BookPage from './BookPage'
import LoadingSpinner from './LoadingSpinner'

interface BookData {
  story: string
  choice1: string
  choice2: string
  choice3: string
  imageURL: string
}

const DisplayBook: React.FC = () => {
  const router = useRouter()
  const [bookData, setBookData] = useState<BookData | null>(null)

  useEffect(() => {
    if (router.query.bookData) {
      const parsedData = JSON.parse(router.query.bookData as string)
      setBookData(parsedData)
    }
  }, [router.query])

  if (!bookData) {
    return <LoadingSpinner />
  }
  return (
    <BookPage
      story={bookData.story}
      choice1={bookData.choice1}
      choice2={bookData.choice2}
      choice3={bookData.choice3}
      imageURL={bookData.imageURL}
    />
  )
}

// Use dynamic import to ensure the component is only rendered on the client side
export default dynamic(() => Promise.resolve(DisplayBook), { ssr: false })
