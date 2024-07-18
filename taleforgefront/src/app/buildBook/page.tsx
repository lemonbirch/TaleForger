// src/pages/StoryBuilder.tsx
'use client'
import React, { useState } from 'react';
import InputText from '../components/InputText';
import DropDown from '../components/Dropdown';
import { sendFormData } from '../utils/api';
import { FormData } from '../types/StoryBuilder';
import RenderDataPage from '../bookpage/RenderDataPage';
import SquareButton from '../components/SqaureButton';
import ChoiceCard from '../bookpage/choiceCard';
import axios from 'axios';
import { RenderData } from '../types/renderData';

const StoryBuilder: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showBook, setShow] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [renderData, setRenderData] = useState<RenderData | null>(null);

  const [formData, setFormData] = useState<FormData>({
    characterName: '',
    storyTheme: '',
    readingLevel: '',
    language: '',
    pages: '',
    artStyle: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDropdownChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendFormData(formData);
      console.log('Form data submitted successfully!' + JSON.stringify(formData));
      await fetchRenderData();
      setShow(true);
    } catch (error) {
      console.error('Error submitting form data:', error);
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

  return (
    <div>
      {showBook ? (
        <div className="min-h-screen bg-gradient-to-b flex flex-col items-center justify-center p-4 space-y-6">
          <div className="w-full max-w-6xl flex items-center justify-between px-8 space-x-4">
            <SquareButton direction="left" />
            
            {/* Page content */}
            <div className="flex-grow">
              <RenderDataPage renderData={renderData} />
            </div>
            
            <SquareButton direction="right" />
          </div>
        
          <ChoiceCard />
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-teal-600 rounded-lg shadow-lg p-8 w-full max-w-2xl text-white">
            <h1 className="text-3xl font-bold text-center mb-6">Personalize Your Story!</h1>
            <p className="text-center mb-6">Welcome to your story builder. Please fill out the fields below.</p>
            
            <form onSubmit={handleSubmit}>
              <InputText 
                id="characterName" 
                label="Enter your character's name:" 
                type="text" 
                placeholder="Name" 
                value={formData.characterName}
                onChange={handleInputChange}
              />
              <InputText 
                id="storyTheme" 
                label="Enter the story's theme:" 
                type="text" 
                placeholder="Theme" 
                value={formData.storyTheme}
                onChange={handleInputChange}
              />
              
              <div className="flex flex-col items-center gap-4">
                <button type="submit" className="btn btn-primary w-full">Create a Story</button>
                <button 
                  type="button" 
                  className="btn btn-secondary w-full"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  {showAdvanced ? 'Hide Advanced Options' : 'Advanced Options'}
                </button>
              </div>

              {showAdvanced && (
                <div className="mt-6 bg-teal-700 rounded-lg p-4">
                  <h2 className="text-xl font-semibold mb-4">Advanced Options</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <DropDown 
                      id="readingLevel" 
                      name="Reading Level" 
                      options={["Still learning to Read", "Beginner Reader", "Confident Reader"]}
                      value={formData.readingLevel}
                      onChange={(value) => handleDropdownChange('readingLevel', value)}
                    />
                    <DropDown 
                      id="language" 
                      name="Language" 
                      options={["US English", "Arabic", "Spanish"]}
                      value={formData.language}
                      onChange={(value) => handleDropdownChange('language', value)}
                    />
                    <DropDown 
                      id="pages" 
                      name="Pages" 
                      options={["5", "10", "15"]}
                      value={formData.pages}
                      onChange={(value) => handleDropdownChange('pages', value)}
                    />
                    <DropDown 
                      id="artStyle" 
                      name="Art Style" 
                      options={["WaterColor", "Cartoon", "Collage Art"]}
                      value={formData.artStyle}
                      onChange={(value) => handleDropdownChange('artStyle', value)}
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryBuilder;
