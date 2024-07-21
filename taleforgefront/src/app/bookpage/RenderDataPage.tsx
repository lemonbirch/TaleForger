'use client'

import React, { useState, useEffect } from 'react';
import { RenderData } from '../types/renderData';  // Adjust the import path as needed
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RenderDataPageProps {
  renderData: RenderData | null;
}

const RenderDataPage: React.FC<RenderDataPageProps> = ({ renderData }) => {
  const [pages, setPages] = useState<{ story: string; imageURL: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (renderData && renderData.story && renderData.imageURL) {
      // Check if this page is already in the array
      const pageExists = pages.some(
        page => page.story === renderData.story && page.imageURL === renderData.imageURL
      );

      if (!pageExists) {
        setPages(prevPages => [
          ...prevPages,
          {
            story: renderData.story,
            imageURL: renderData.imageURL || "/api/placeholder/400/320"
          }
        ]);
      }
    }
  }, [renderData, pages]);

  useEffect(() => {
    // Move to the latest page when a new page is added
    if (pages.length > 0) {
      setCurrentPage(pages.length - 1);
    }
  }, [pages.length]);

  if (pages.length === 0) {
    return <div><span className="loading loading-bars loading-xs"></span></div>;
  }

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentPageData = pages[currentPage];

  if (!currentPageData) {
    return <div>No data available for this page.</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-2 max-w-4xl mx-auto">
      <div className="bg-white w-full sm:w-1/2 aspect-[4/5] rounded-2xl shadow-lg overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gray-300 shadow-inner"></div>
        <div className="relative w-full h-full flex flex-col">
          <div className="p-4 flex-grow overflow-y-auto">
            <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">{renderData?.title}</h1>
            <p className="text-base font-schoolbell text-gray-700 mb-2 leading-relaxed">
              {currentPageData.story}
            </p>
          </div>
      
          <div className="flex justify-between items-center p-2 bg-gray-100">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 0}
              className="p-1 bg-gray-200 rounded-full disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-bold text-gray-600">{currentPage + 1}/{pages.length}</span>
            <button 
              onClick={nextPage} 
              disabled={currentPage === pages.length - 1}
              className="p-1 bg-gray-200 rounded-full disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white w-full sm:w-1/2 aspect-[4/5] rounded-2xl shadow-lg overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gray-300 shadow-inner"></div>
        <div className="relative w-full h-full">
          <img 
            src={currentPageData.imageURL} 
            alt="StoryImage" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RenderDataPage;