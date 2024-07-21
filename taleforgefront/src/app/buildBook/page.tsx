// src/pages/StoryBuilder.tsx
'use client'
import React, { useState } from 'react';
import InputText from '../components/InputText';
import DropDown from '../components/Dropdown';
import BuildBook from './BuildBook';

const StoryBuilder: React.FC = () => {
  return (
    <div>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-teal-600 rounded-lg shadow-lg p-8 w-full max-w-2xl text-white">
           
            <BuildBook/>
            
          </div>
        </div>
      
    </div>
  );
};

export default StoryBuilder;
