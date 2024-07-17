//bookpage
import React from 'react';
import ButtonCard from '../components/buttonCard';
import SquareButton from '../components/SqaureButton';
import ChoiceCard from './choiceCard';
import DisplayText from './DisplayText';

const BookPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b flex flex-col items-center justify-center p-4 space-y-6" style={{ transform: 'scale(1.05)' }}>
      <div className="w-full max-w-5xl flex items-center justify-between px-4">
        <SquareButton direction="left" />
        
        <div className="bg-yellow-100 w-full max-w-md aspect-[3/3] rounded-3xl shadow-2xl overflow-hidden relative mx-4">
          {/* Book spine */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-yellow-200 shadow-inner"></div>
          
          {/* Page content */}
            {/* all the received data will be displayed here */}
           {/* Page content */}


          
          
          {/* Page curl effect with centered number */}
          
        </div>

        <SquareButton/>
      </div>
      
      <ChoiceCard />
    </div>
  );
};

export default BookPage;