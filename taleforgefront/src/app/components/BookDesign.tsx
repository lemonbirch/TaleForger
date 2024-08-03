import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PageProps {
  content: React.ReactNode;
  pageNumber: number;
}

const Page: React.FC<PageProps> = ({ content, pageNumber }) => (
  <div className="absolute w-full h-full bg-white shadow-md p-4">
    <div className="h-full overflow-y-auto">{content}</div>
    <div className="absolute bottom-2 right-2 text-gray-500">{pageNumber}</div>
  </div>
);

interface BookProps {
  pages: React.ReactNode[];
}

const Book: React.FC<BookProps> = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const flipPage = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative w-[600px] h-[800px] mx-auto mt-10 perspective-1000">
      <motion.div
        className="w-full h-full relative transform-style-3d"
        animate={{ rotateY: currentPage * -180 }}
        transition={{ duration: 0.5 }}
      >
        {pages.map((content, index) => (
          <motion.div
            key={index}
            className="absolute w-full h-full backface-hidden"
            style={{ transform: `rotateY(${index * 180}deg)` }}
          >
            <Page content={content} pageNumber={index + 1} />
          </motion.div>
        ))}
      </motion.div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 px-2 py-1 rounded"
        onClick={() => flipPage('prev')}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 px-2 py-1 rounded"
        onClick={() => flipPage('next')}
        disabled={currentPage === pages.length - 1}
      >
        Next
      </button>
    </div>
  );
};

export default function BookDesign() {
  const pages = [
    <div key="cover" className="text-center">
      <h1 className="text-4xl font-bold mt-20">My Book Title</h1>
      <p className="mt-4">By Author Name</p>
    </div>,
    <div key="page1">
      <h2 className="text-2xl font-semibold mb-4">Chapter 1</h2>
      <p>This is the content of page 1...</p>
    </div>,
    <div key="page2">
      <h2 className="text-2xl font-semibold mb-4">Chapter 2</h2>
      <p>This is the content of page 2...</p>
    </div>,
    <div key="backcover" className="text-center">
      <h2 className="text-2xl font-semibold mt-20">The End</h2>
      <p className="mt-4">Thank you for reading!</p>
    </div>,
  ];

  return <Book pages={pages} />;
}