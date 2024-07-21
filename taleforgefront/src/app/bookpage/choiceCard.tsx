// src/components/ChoiceCard.tsx
'use client';
import React, {useState} from 'react';
import { RenderData } from '../types/renderData';  // Adjust the import path as needed
import { FormData } from '../types/choices';
import { sendStringToBackend } from './SendChoice';

interface RenderDataPageProps {
  renderData: RenderData | null;
}


const ChoiceCard: React.FC<RenderDataPageProps> = ({ renderData }) => {
  

  function sendChoice(value: string) {
    sendStringToBackend(value); 
    
  }
  

  if (!renderData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl" style={{ transform: 'scale(0.9)' }}>
        <div className="card-body">
          <h2 className="card-title">Choose your Path!</h2>
          <div className="card-actions justify-end">
            {renderData && (
              <div>
                <button onClick={() => sendChoice('1')} className="btn btn-primary">
                  {renderData.choice1}
                </button>
                <button onClick={() => sendChoice('2')} className="btn btn-primary">
                  {renderData.choice2}
                </button>
                <button onClick={() => sendChoice('3')} className="btn btn-primary">
                  {renderData.choice3}
                </button>
              </div>
            )}
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoiceCard;
