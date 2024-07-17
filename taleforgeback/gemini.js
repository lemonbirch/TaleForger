// backend/gemini.js
import dotenv from "dotenv";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import CORS middleware
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import * as saveImage from "./image.js";
import * as storyModule from "./prompt.js";

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware

dotenv.config(); 
const GEMINI_KEY = process.env.GEMINI_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const openai = new OpenAI();
let latestRenderData = null;
var storyList = []
var artstyle = " "



app.post('/api/submitFormData', async (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);

  let storyList = [];
  const { characterName, storyTheme, readingLevel, language, pages, artStyle } = formData;
  let artstyle = artStyle;

  const prompt = storyModule.formatInstructions(characterName, storyTheme, readingLevel, language, pages);
  storyList.push(prompt);

  try {
    const renderData = await createContent(prompt);
    latestRenderData = renderData; // Store it for later retrieval
    console.log("This is the render data:", renderData);
    res.status(200).json(renderData);
  } catch (error) {
    console.error('Error in createContent:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});
app.get('/api/getRenderData', (req, res) => {
  if (latestRenderData) {
    res.status(200).json(latestRenderData);
  } else {
    res.status(404).json({ error: 'No render data available' });
  }
});


async function createContent(prompt) {
  try {
      const content = await generateAndSaveContent(prompt);
      const imageURL = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-wu5GqWI8J6SGzX7Vz6q7H81Z/user-WcbDz9fVXoEqb6nusJxTAS7O/img-5iD3Fb8l7JMTwRFCzsSBV06L.png?st=2024-07-09T21%3A36%3A57Z&se=2024-07-09T23%3A36%3A57Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-09T18%3A51%3A41Z&ske=2024-07-10T18%3A51%3A41Z&sks=b&skv=2023-11-03&sig=a2RjeFpOrHgrlgMHJxtAPVX9JiCs65MVXu5pTkhQhtQ%3D";
      
      const renderData = prepareRenderData(content, imageURL);
      console.log(renderData);

      return renderData; // Return the render data
  } catch (error) {
      console.error('Error in renderContent:', error);
      throw error; // Rethrow the error to be caught in the parent try-catch block
  }
}



  async function generateAndSaveContent(prompt) {
    const content = await generateContent(prompt);
    storyList.push(content);
    return content;
  }

  async function generateAndSaveImage(content) {
    const createImagePrompt = storyModule.createImagePrompt(content, artstyle);
    const imagePrompt = await generateContent(createImagePrompt);
    console.log("this is the image prompt" + imagePrompt);
    const imageURL = await generateImage(imagePrompt);
    const imageName = `image_${Date.now()}.png`;
    
    try {
      const filePath = await saveImage.saveDALLEImage(imageURL, imageName);
      console.log('Image saved at:', filePath);
    } catch (error) {
      console.error('Failed to save image:', error);
    }
  
    return imageURL;
  }

async function generateContent(prompt) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      return text;
    } catch (error) {
      console.error("Error generating content:", error);
    }
  }

async function generateImage(imagePrompt) {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024"
    });
    console.log(image.data);
    return image.data[0].url;
   
  }


  function prepareRenderData(content, imageURL) {
    const responseJSON = formatJSON(content);
    return {
      story: responseJSON.story,
      choice1: responseJSON.choices[0].choice1,
      choice2: responseJSON.choices[1].choice2,
      choice3: responseJSON.choices[2].choice3,
      imageURL: imageURL
    };
  }



function formatJSON(input) {
    let jsonString = input;
    
    // Remove ```json and ``` if present
    jsonString = jsonString.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    
    // Try to parse the JSON
    try {
      const parsedJSON = JSON.parse(jsonString);
      
      // Return the formatted JSON string
      return parsedJSON;
    } catch (error) {
      // If parsing fails, return an error message
      return `Error: Invalid JSON input. ${error.message}`;
    }
  }



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
