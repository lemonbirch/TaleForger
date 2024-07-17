'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface RenderData {
  story: string;
  choice1: string;
  choice2: string;
  choice3: string;
  imageURL: string;
}

const RenderDataPage: React.FC = () => {
  const [renderData, setRenderData] = useState<RenderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const submitFormData = async () => {
    const formData = {
      characterName: 'Example Name',
      storyTheme: 'Adventure',
      readingLevel: 'Beginner',
      language: 'English',
      pages: 10,
      artStyle: 'Cartoon',
    };

    try {
      await axios.post('http://localhost:3001/api/submitFormData', formData);
      await fetchRenderData(); // Fetch render data after submission
    } catch (error) {
      setError('An error occurred while submitting the form data');
    }
  };

  const fetchRenderData = async () => {
    try {
      const response = await axios.get<RenderData>('http://localhost:3001/api/getRenderData');
      setRenderData(response.data);
      setLoading(false);
    } catch (error) {
      setError('An error occurred while fetching render data');
      setLoading(false);
    }
  };

  useEffect(() => {
    submitFormData(); // Call this to initiate the process
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex space-x-4">
    <div className="bg-white w-full max-w-2xl aspect-[3/2] rounded-3xl shadow-2xl overflow-hidden relative mx-4">
      {/* Book spine */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gray-300 shadow-inner"></div>
    
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 bg-cover bg-center opacity-0" style={{ backgroundImage: "url('https://oaidalleapiprodscus.blob.core.windows.net/private/org-wu5GqWI8J6SGzX7Vz6q7H81Z/user-WcbDz9fVXoEqb6nusJxTAS7O/img-CYuHNPdbXHX9Rki7Yv25Z4Tf.png?st=2024-07-17T03%3A24%3A53Z&se=2024-07-17T05%3A24%3A53Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-17T00%3A42%3A19Z&ske=2024-07-18T00%3A42%3A19Z&sks=b&skv=2023-11-03&sig=X4S9or/yXAMVKnpLXtH7yUT9KmrWhwAa8hMj309X1fE%3D')" }} />
        <div className="relative z-10">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">My Awesome Book</h1>
            <p className="text-lg text-gray-700 mb-4 leading-loose">
              <div>
                {renderData && (
                  <div>
                    <p>{renderData.story}</p>
                  </div>
                )}
              </div>
            </p>
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-white rounded-tl-3xl shadow-2xl flex items-center justify-center">
              <span className="text-xl font-bold text-yellow-800">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-white w-full max-w-2xl aspect-[3/2] rounded-3xl shadow-2xl overflow-hidden relative mx-4">
      {/* Book spine */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gray-300 shadow-inner"></div>
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: "url('https://oaidalleapiprodscus.blob.core.windows.net/private/org-wu5GqWI8J6SGzX7Vz6q7H81Z/user-WcbDz9fVXoEqb6nusJxTAS7O/img-CYuHNPdbXHX9Rki7Yv25Z4Tf.png?st=2024-07-17T03%3A24%3A53Z&se=2024-07-17T05%3A24%3A53Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-17T00%3A42%3A19Z&ske=2024-07-18T00%3A42%3A19Z&sks=b&skv=2023-11-03&sig=X4S9or/yXAMVKnpLXtH7yUT9KmrWhwAa8hMj309X1fE%3D')" }} />
        <div className="relative z-10">
          <div className="p-8">
           
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default RenderDataPage;
