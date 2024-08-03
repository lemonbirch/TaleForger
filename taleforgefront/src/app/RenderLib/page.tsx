
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import BookContent from './BookContent';
import BookDesign from '../components/BookDesign';
const BookPage = () => {
  const params = useParams();
  const bookId = params.bookId as string;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BookContent bookId={"1"} />
      
    </div>
  );
};

export default BookPage;