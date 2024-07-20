import React, { useState } from 'react';
import { RenderData } from '../types/renderData';  // Adjust the import path as needed
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RenderDataPageProps {
  renderData: RenderData | null;
}

const RenderDataPage: React.FC<RenderDataPageProps> = ({ renderData }) => {
  const [currentPage, setCurrentPage] = useState(0);

  if (!renderData) {
    return <div><span class="loading loading-bars loading-xs"></span></div>;
  }
  var pages = []
  pages.push(renderData.story)
  pages.push('https://oaidalleapiprodscus.blob.core.windows.net/private/org-wu5GqWI8J6SGzX7Vz6q7H81Z/user-WcbDz9fVXoEqb6nusJxTAS7O/img-BJau26krbbyhbQ2csBgg7e5Q.png?st=2024-07-20T03%3A06%3A48Z&se=2024-07-20T05%3A06%3A48Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-19T23%3A14%3A36Z&ske=2024-07-20T23%3A14%3A36Z&sks=b&skv=2023-11-03&sig=nJ10IKuGgOrf23f%2BdE4bYjTUCBTzuOgoODR%2BrrfNwEE%3D')
  

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

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-2 max-w-4xl mx-auto">
      <div className="bg-white w-full sm:w-1/2 aspect-[4/5] rounded-2xl shadow-lg overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gray-300 shadow-inner"></div>
        <div className="relative w-full h-full flex flex-col">
          <div className="p-4 flex-grow overflow-y-auto">
            <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">My Awesome Book</h1>
            <p className="text-base text-gray-700 mb-2 leading-relaxed">
              {pages[currentPage]}
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
            src={renderData.imageURL || "/api/placeholder/400/320"} 
            alt="StoryImage" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RenderDataPage;