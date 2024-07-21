import axios from 'axios';
import { RenderData } from '../types/renderData';

// You might need these if you're using the state setters outside this file
import { Dispatch, SetStateAction } from 'react';

export const fetchRenderData = async (
  setRenderData: Dispatch<SetStateAction<RenderData | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>
) => {
  try {
    const response = await axios.get<RenderData>('http://localhost:3001/api/getRenderData');
    setRenderData(response.data);
    console.log("this is the response data " + response.data)
    setLoading(false);
  } catch (error) {
    setError('An error occurred while fetching render data');
    setLoading(false);
  }
};