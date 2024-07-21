'use client'
import React, { useState, useEffect } from 'react';
import RenderDataPage from '../bookpage/RenderDataPage';
import SquareButton from '../components/SqaureButton';
import ChoiceCard from '../bookpage/choiceCard';
import { fetchRenderData } from '../buildBook/FetchData';
import {sendStringToBackend} from '../bookpage/SendChoice';
const StoryPage: React.FC = (props: any) => {
  const [renderData, setRenderData] = useState<RenderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRenderData(setRenderData, setLoading, setError);
  }, []);
  
  async function sendChoice(value: string) {
    await sendStringToBackend(value); 
    fetchRenderData(setRenderData, setLoading, setError);

    
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b flex flex-col items-center justify-center p-4 space-y-6">
      <div className="w-full max-w-6xl flex items-center justify-between px-8 space-x-4">
        <SquareButton direction="left" />

        <div className="flex-grow">
          <RenderDataPage renderData={renderData} />
        </div>

        <SquareButton direction="right" />
      </div>

      {/* <ChoiceCard renderData={renderData} handleFetch={() => fetchRenderData(setRenderData, setLoading, setError)} />
       */}

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
    </div>
  );
}

export default StoryPage;
