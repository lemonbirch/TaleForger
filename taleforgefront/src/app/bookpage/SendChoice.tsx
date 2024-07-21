import React from 'react';
import axios from 'axios';
import { RenderData } from '../types/renderData';
import { sendFormData } from '../utils/api';
import { Dispatch, SetStateAction } from 'react';



export const sendStringToBackend = async (
  stringValue: string,
 
) => {
  try {
    const response = await axios.post('http://localhost:3001/api/sendChoice', { value: stringValue });
    console.log('Response from backend:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};






