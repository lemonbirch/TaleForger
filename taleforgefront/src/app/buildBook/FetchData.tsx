import axios from 'axios';
import { RenderData } from '../types/renderData';
import { Dispatch, SetStateAction } from 'react';

// Update this interface to match your new response structure
interface ApiResponse {
  renderData: RenderData;
  imgurls: string[]; // Assuming imgurls is an array of strings
}

export const fetchRenderData = async (
  setRenderData: Dispatch<SetStateAction<RenderData | null>>,
  setImgurls: Dispatch<SetStateAction<string[] | null>>, // New state setter for imgurls
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>
) => {
  try {
    const response = await axios.get<ApiResponse>('http://localhost:3001/api/getRenderData');
    console.log(response)
    setRenderData(response.data.renderData);
    setImgurls(response.data.imgurls);
    console.log("Render data:", response.data.renderData);
    console.log("Image URLs:", response.data.imgurls);
    setLoading(false);
  } catch (error) {
    setError('An error occurred while fetching render data');
    setLoading(false);
  }
};