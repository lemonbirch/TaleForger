// src/components/ChoiceCard.tsx
'use client';
import React from 'react';
import { RenderData } from '../types/renderData'; // Adjust the import path as needed

interface RenderDataPageProps {
  renderData: RenderData | null;
}

const ChoiceCard: React.FC<RenderDataPageProps> = ({ renderData }) => {
  function handleClick(value: string) {
    console.log(value + ' clicked');
  }

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl" style={{ transform: 'scale(0.9)' }}>
        <div className="card-body">
          <h2 className="card-title">Choices</h2>
          <div className="card-actions justify-end">
            {renderData && (
              <div>
                <button onClick={() => handleClick('1')} className="btn btn-primary">
                  {renderData.choice1}
                </button>
                <button onClick={() => handleClick('2')} className="btn btn-primary">
                  {renderData.choice2}
                </button>
                <button onClick={() => handleClick('3')} className="btn btn-primary">
                  {renderData.choice3}
                </button>
              </div>
            )}
            <button onClick={() => handleClick('3')} className="btn btn-primary">button</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoiceCard;
