import React from 'react';

interface SquareButtonProps {
  direction: 'left' | 'right';
}

const SquareButton: React.FC<SquareButtonProps> = ({ direction }) => {
  return (
    <button 
      className={`w-12 h-12 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center`}
      aria-label={direction === 'left' ? 'Previous page' : 'Next page'}
    >
      {direction === 'left' ? '←' : '→'}
    </button>
  );
};

export default SquareButton;