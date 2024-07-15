'use client'
import React, {useState} from 'react'
import AdvancedDropDown from './AdvancedDropDown';
import InputText from '../components/InputText'

const StoryBuilder = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [storyTheme, setStoryTheme] = useState('');
  const [readingLevel, setReadingLevel] = useState('');
  const [language, setLanguage] = useState('');
  const [pages, setPages] = useState('');
  const [artStyle, setArtStyle] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("information" + JSON.stringify({
        characterName,
        storyTheme,
        readingLevel,
        language,
        pages,
        artStyle
    }, null, 2));
      // Here you would typically send this data to your backend
  };

  return (
      <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-teal-600 rounded-lg shadow-lg p-8 w-full max-w-2xl text-white">
              <h1 className="text-3xl font-bold text-center mb-6">Personalize Your Story!</h1>
              <p className="text-center mb-6">Welcome to your story builder. Please fill out the fields below.</p>
              
              <form onSubmit={handleSubmit}>
                  <InputText 
                      id="name" 
                      label="Enter your character's name:" 
                      type="text" 
                      placeholder="Name" 
                      value={characterName}
                      onChange={(e) => setCharacterName(e.target.value)}
                  />
                  <InputText 
                      id="theme" 
                      label="Enter the story's theme:" 
                      type="text" 
                      placeholder="Theme" 
                      value={storyTheme}
                      onChange={(e) => setStoryTheme(e.target.value)}
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
                              <AdvancedDropDown 
                                  id="readingLevel" 
                                  name="Reading Level" 
                                  options={["Still learning to Read", "Beginner Reader", "Confident Reader"]}
                                  value={readingLevel}
                                  onChange={setReadingLevel}
                              />
                              <AdvancedDropDown 
                                  id="language" 
                                  name="Language" 
                                  options={["US English", "Arabic", "Spanish"]}
                                  value={language}
                                  onChange={setLanguage}
                              />
                              <AdvancedDropDown 
                                  id="pages" 
                                  name="Pages" 
                                  options={["5", "10", "15"]}
                                  value={pages}
                                  onChange={setPages}
                              />
                              <AdvancedDropDown 
                                  id="art" 
                                  name="Art Style" 
                                  options={["WaterColor", "Cartoon", "Collage Art"]}
                                  value={artStyle}
                                  onChange={setArtStyle}
                              />
                          </div>
                      </div>
                  )}
              </form>
          </div>
      </div>
  )
}

export default StoryBuilder