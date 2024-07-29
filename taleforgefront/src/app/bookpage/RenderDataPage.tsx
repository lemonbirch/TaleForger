import React, { useState, useEffect } from 'react';
import { RenderData } from '../types/renderData'; // Adjust the import path as needed
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RenderDataPageProps {
  renderData: RenderData | null;
  imgurls: string[] | null;
}

const RenderDataPage: React.FC<RenderDataPageProps> = ({ renderData, imgurls }) => {
  const [pages, setPages] = useState<{ story: string; imageURL: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (renderData && renderData.story && imgurls && imgurls.length > 0) {
      setPages(prevPages => {
        const newPageIndex = prevPages.findIndex(page => page.story === renderData.story);
        if (newPageIndex === -1) {
          // If this story doesn't exist, add it as a new page
          return [...prevPages, {
            story: renderData.story,
            imageURL: imgurls[prevPages.length % imgurls.length]
          }];
        }
        // If the story already exists, don't add a new page
        return prevPages;
      });
    }
  }, [renderData, imgurls]);

  useEffect(() => {
    if (pages.length > 0) {
      setCurrentPage(prevPage => Math.min(prevPage, pages.length - 1));
    }
  }, [pages]);

  if (pages.length === 0) {
    return <div><span className="loading loading-bars loading-xs"></span></div>;
  }

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, pages.length - 1));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const currentPageData = pages[currentPage];

  if (!currentPageData) {
    console.error("No data available for page", currentPage, "Total pages:", pages.length);
    return <div>Error: Unable to display page content. Please try refreshing the page.</div>;
  }

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
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">{renderData?.title}</h1>
            <p className="text-lg font-schoolbell text-gray-700 mb-4 leading-relaxed">
              {currentPageData.story}
            </p>
          </div>
          <div className="flex items-center p-4 bg-gray-100">
            <span className="text-lg font-bold text-gray-600 mx-auto">{currentPage + 1}/{pages.length}</span>            
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
          disabled={currentPage === pages.length - 1}
          className="w-16 h-16 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
          aria-label="Next page">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default RenderDataPage;