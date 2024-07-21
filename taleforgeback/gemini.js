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
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const openai = new OpenAI(OPENAI_API_KEY);
let latestRenderData = null;
let storyList = [];
let artstyle = " ";

app.post('/api/submitFormData', async (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);

  storyList = [];
  const { characterName, storyTheme, readingLevel, language, pages, artStyle } = formData;
  artstyle = artStyle;

  const prompt = storyModule.formatInstructions(characterName, storyTheme, readingLevel, language, pages);
  // console.log("this is the completed prompt" + prompt)
  storyList.push(prompt);

  try {
    const renderData = await createContent(prompt);
    latestRenderData = renderData; // Store it for later retrieval
    // console.log("This is the render data:", renderData);
    res.status(200).json(renderData);
  } catch (error) {
    console.error('Error in createContent:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});


app.post('/api/sendChoice', async (req, res) => {
  const choice = req.body;
  // console.log('Received choice:', choice);
  const newChoicePrompt = storyModule.continueStory(choice, storyList);
  // console.log("this is the new choice prompt" + newChoicePrompt);
  try {
    console.log(newChoicePrompt)
    const renderData = await createContent(newChoicePrompt);
    latestRenderData = renderData; // Store it for later retrieval
    // console.log("This is the render data:", renderData);
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
    // const imageURL = await generateAndSaveImage(content);
    console.log("this is the content" + content)
    const renderData = prepareRenderData(content, "https://picsum.photos/200");
    console.log(renderData);

    return renderData; // Return the render data
  } catch (error) {
    console.error('Error in createContent:', error);
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
  // console.log("this is the image prompt" + imagePrompt);
  const imageURL = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-wu5GqWI8J6SGzX7Vz6q7H81Z/user-WcbDz9fVXoEqb6nusJxTAS7O/img-BJau26krbbyhbQ2csBgg7e5Q.png?st=2024-07-20T03%3A06%3A48Z&se=2024-07-20T05%3A06%3A48Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-19T23%3A14%3A36Z&ske=2024-07-20T23%3A14%3A36Z&sks=b&skv=2023-11-03&sig=nJ10IKuGgOrf23f%2BdE4bYjTUCBTzuOgoODR%2BrrfNwEE%3D"
  // await generateImage(imagePrompt);
  const imageName = `image_${Date.now()}.png`;

  try {
    const filePath = await saveImage.saveDALLEImage(imageURL, imageName);
    console.log("image temporarily disabled")
    console.log('Image saved at:', filePath);
  } catch (error) {
    console.error('Failed to save image:', error);
  }

  return imageURL;
}


async function generateAllImages(content) {
  imagePrompts = []
  for (i=0; i<pages.length; i++) {
    const createImagePrompt = storyModule.createImagePrompt(content, artstyle);
    imagePrompt.push(createImagePrompt)
  }

  var imageURLS = []
  const imagePrompt = await generateContent(createImagePrompt);
  for (i=0; i<pages.length; i++) {
    await generateImage(imagePrompts[i]);
    imageURLS.push()
  }
  
  // console.log("this is the image prompt" + imagePrompt);
  const imageURL = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-wu5GqWI8J6SGzX7Vz6q7H81Z/user-WcbDz9fVXoEqb6nusJxTAS7O/img-BJau26krbbyhbQ2csBgg7e5Q.png?st=2024-07-20T03%3A06%3A48Z&se=2024-07-20T05%3A06%3A48Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-19T23%3A14%3A36Z&ske=2024-07-20T23%3A14%3A36Z&sks=b&skv=2023-11-03&sig=nJ10IKuGgOrf23f%2BdE4bYjTUCBTzuOgoODR%2BrrfNwEE%3D"
  // await generateImage(imagePrompt);
  const imageName = `image_${Date.now()}.png`;

  try {
    const filePath = await saveImage.saveDALLEImage(imageURL, imageName);
    console.log("image temporarily disabled")
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
    throw error; // Rethrow the error to be caught in the parent try-catch block
  }
}

async function generateImage(imagePrompt) {
  try {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024"
    });
    // console.log(image.data);
    return image.data[0].url;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error; // Rethrow the error to be caught in the parent try-catch block
  }
}

function prepareRenderData(content, imageURL) {
  const responseJSON = formatJSON(content);
  if (typeof responseJSON === 'string') {
    throw new Error(responseJSON); // If formatJSON returns an error message, throw it
  }
  return {
    title: responseJSON.Title,
    story: responseJSON.story,
    choice1: responseJSON.choices[0]?.choice1 || 'N/A',
    choice2: responseJSON.choices[1]?.choice2 || 'N/A',
    choice3: responseJSON.choices[2]?.choice3 || 'N/A',
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
