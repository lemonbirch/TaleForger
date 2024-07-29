'use client'
import React, { useState, useEffect } from 'react';
import RenderDataPage from '../bookpage/RenderDataPage';
import SquareButton from '../components/SqaureButton';
import { fetchRenderData } from '../buildBook/FetchData';
import { sendStringToBackend } from '../bookpage/SendChoice';
import { RenderData } from '../types/renderData'; // Make sure this import is correct

const StoryPage: React.FC = (props: any) => {
  const [renderData, setRenderData] = useState<RenderData | null>(null);
  const [imgurls, setImgurls] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isClickable, setIsClickable] = useState(true);

  useEffect(() => {
    fetchRenderData(setRenderData, setImgurls, setLoading, setError);
  }, []);
  
  async function sendChoice(value: string) {
    await sendStringToBackend(value); 
    fetchRenderData(setRenderData, setImgurls, setLoading, setError);
    setIsClickable(true);
  }

  const handleChoice = (choice: string) => {
    if (isClickable) {
      sendChoice(choice);
      setIsClickable(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b flex flex-col items-center justify-center p-4 space-y-6">
      <div className="w-full max-w-6xl flex items-center justify-between px-8 space-x-4">
       

        <div className="flex-grow">
          <RenderDataPage renderData={renderData} imgurls={imgurls} />
        </div>

       
      </div>
      <div>
      <div className="card card-side bg-base-100 shadow-xl" style={{ transform: 'scale(0.9)' }}>
        <div className="card-body">
          <h2 className="card-title">Choose your Path!</h2>
          <div className="card-actions justify-end">
            {renderData && (
              <div>
                <button 
                  onClick={() => handleChoice('1')} 
                  className={`btn ${isClickable ? 'btn-primary' : 'btn-disabled'}`}
                  disabled={!isClickable}
                >
                  {renderData.choice1}
                </button>
                <button 
                  onClick={() => handleChoice('2')} 
                  className={`btn ${isClickable ? 'btn-primary' : 'btn-disabled'}`}
                  disabled={!isClickable}
                >
                  {renderData.choice2}
                </button>
                <button 
                  onClick={() => handleChoice('3')} 
                  className={`btn ${isClickable ? 'btn-primary' : 'btn-disabled'}`}
                  disabled={!isClickable}
                >
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