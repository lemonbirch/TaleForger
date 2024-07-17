//bookpage
import React from 'react';
import SquareButton from '../components/SqaureButton';
import ChoiceCard from './choiceCard';
import RenderDataPage from '../components/RenderDataPage';

const BookPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b flex flex-col items-center justify-center p-4 space-y-6">
      <div className="w-full max-w-6xl flex items-center justify-between px-8 space-x-4">
        <SquareButton direction="left" />
        
        {/* Page content */}
        <div className="flex-grow">
          <RenderDataPage />
        </div>
        
        <SquareButton direction="right" />
      </div>
    
      <ChoiceCard />
    </div>
  );
};

export default BookPage;
