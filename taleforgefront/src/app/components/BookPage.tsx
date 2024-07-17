import React from 'react';
import ButtonCard from './buttonCard';
import SquareButton from './SqaureButton';
import ChoiceCard from './choiceCard';

interface BookPageProps {
  story: string
  choice1: string
  choice2: string
  choice3: string
  imageURL: string
}

const BookPage: React.FC<BookPageProps> = ({ story, choice1, choice2, choice3, imageURL }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b flex flex-col items-center justify-center p-4 space-y-6" style={{ transform: 'scale(1.05)' }}>
      <div className="w-full max-w-5xl flex items-center justify-between px-4">
        <SquareButton direction="left" />
        
        <div className="bg-yellow-100 w-full max-w-md aspect-[3/3] rounded-3xl shadow-2xl overflow-hidden relative mx-4">
          {/* Book spine */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-yellow-200 shadow-inner"></div>
          
          {/* Page content */}
          <div className="p-6">
            {story}
            <img src={imageURL} alt="Story illustration" className="w-full h-auto mt-4 rounded-lg" />
          </div>
        </div>

        <SquareButton />
      </div>
      
      <ChoiceCard choice1={choice1} choice2={choice2} choice3={choice3} />
    </div>
  );
};

export default BookPage;