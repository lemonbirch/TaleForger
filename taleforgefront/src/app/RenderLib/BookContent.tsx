// src/app/RenderLib/[bookId]/BookContent.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import mockStoryDatabase from './MockStoryDatabase ';

type Page = {
  page: number;
  story: string;
  imageURL: string;
};

type Book = {
  id: number;
  title: string;
  coverImage: string;
  pages: Page[];
};

type BookContentProps = {
  bookId: string;
};

const BookContent: React.FC<BookContentProps> = ({ bookId }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchedBook = mockStoryDatabase.find(b => b.id === parseInt(bookId));
    setBook(fetchedBook || null);
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, book.pages.length - 1));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const currentPageData = book.pages[currentPage];

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 p-4 max-w-6xl mx-auto">
      <div className="flex flex-col justify-center">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 0}
          className="w-16 h-16 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
          aria-label="Previous page">
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="bg-white w-full sm:w-3/5 aspect-[4/5] rounded-2xl shadow-lg overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gray-300 shadow-inner"></div>
        <div className="relative w-full h-full flex flex-col">
          <div className="p-6 flex-grow overflow-y-auto">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">{book.title}</h1>
            <p className="text-lg font-schoolbell text-gray-700 mb-4 leading-relaxed">
              {currentPageData.story}
            </p>
          </div>
          <div className="flex items-center p-4 bg-gray-100">
            <span className="text-lg font-bold text-gray-600 mx-auto">{currentPage + 1}/{book.pages.length}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white w-full sm:w-3/5 aspect-[4/5] rounded-2xl shadow-lg overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gray-300 shadow-inner"></div>
        <div className="relative w-full h-full">
          <img 
            src={currentPageData.imageURL} 
            alt="StoryImage" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <button 
          onClick={nextPage} 
          disabled={currentPage === book.pages.length - 1}
          className="w-16 h-16 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
          aria-label="Next page">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default BookContent;