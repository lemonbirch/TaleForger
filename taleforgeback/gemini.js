// server.js
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as saveImage from "./image.js";
import * as storyModule from "./prompt.js";
import { storeBookData } from "./lib/storebook.js";

// Load environment variables
dotenv.config();
console.log("Environment loaded");

// Check for API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("API KEY NOT FOUND IN ENVIRONMENT!");
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}
console.log("API key found");

// Initialize Express
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
console.log("Express app initialized with bodyParser and CORS");

// Initialize the Google Generative AI client with your Gemini API key.
console.log("Initializing GenAI client...");
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Use the Gemini-pro model for text content.
console.log("Setting up models...");
const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const imageModel = genAI.getGenerativeModel({ model: "imagen-3.0-generate-001" });
console.log("Models initialized");

let latestRenderData = null;
let imgurls = [];
let storyList = [];
let artstyle = "";
let pagelist = [];

const state = {
  saveCount: 0
};

app.post('/api/submitFormData', async (req, res) => {
  console.log('------ FORM SUBMISSION STARTED ------');
  console.log('Request received at: ' + new Date().toISOString());
  const formData = req.body;
  console.log('Received form data:', JSON.stringify(formData, null, 2));

  // Validate form data
  if (
    !formData.characterName ||
    !formData.storyTheme ||
    !formData.readingLevel ||
    !formData.language ||
    !formData.pages ||
    !formData.artStyle
  ) {
    console.error('Missing required form data:', {
      characterName: Boolean(formData.characterName),
      storyTheme: Boolean(formData.storyTheme),
      readingLevel: Boolean(formData.readingLevel),
      language: Boolean(formData.language),
      pages: Boolean(formData.pages),
      artStyle: Boolean(formData.artStyle)
    });
    return res.status(400).json({ error: 'Missing required form data' });
  }

  console.log('Form validation passed');
  
  // Reset state variables
  storyList = [];
  imgurls = [];
  artstyle = formData.artStyle;
  const pages = Number(formData.pages);
  state.saveCount = pages;
  
  console.log('Creating prompt with the following parameters:');
  console.log(`- Character name: ${formData.characterName}`);
  console.log(`- Story theme: ${formData.storyTheme}`);
  console.log(`- Reading level: ${formData.readingLevel}`);
  console.log(`- Language: ${formData.language}`);
  console.log(`- Pages: ${pages}`);
  console.log(`- Art style: ${artstyle}`);
  
  const prompt = storyModule.formatInstructions(
    formData.characterName,
    formData.storyTheme,
    formData.readingLevel,
    formData.language,
    pages
  );
  console.log('Generated prompt:', prompt);
  storyList.push(prompt);

  try {
    console.log('Calling createContent...');
    const renderData = await createContent(prompt, pages);
    console.log('createContent completed successfully');
    latestRenderData = renderData;
    console.log('Sending response to client');
    res.json(renderData);
    console.log('------ FORM SUBMISSION COMPLETED ------');
  } catch (error) {
    console.error('Error in createContent:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: 'An error occurred', details: error.message });
    console.log('------ FORM SUBMISSION FAILED ------');
  }
});

app.post('/api/sendChoice', async (req, res) => {
  console.log('------ CHOICE SUBMISSION STARTED ------');
  let { value: choice } = req.body;
  console.log('Received choice:', choice);

  if (!choice) {
    console.error('Missing choice value in request');
    return res.status(400).json({ error: 'Missing choice value' });
  }

  try {
    console.log('Calling createNextPage...');
    const renderData = await createNextPage(storyList.length, choice);
    console.log("Latest render data:", JSON.stringify(renderData, null, 2));
    latestRenderData = renderData;
    res.json(renderData);
    console.log('------ CHOICE SUBMISSION COMPLETED ------');
  } catch (error) {
    console.error('Error in createNextPage:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: 'An error occurred', details: error.message });
    console.log('------ CHOICE SUBMISSION FAILED ------');
  }
});

app.get('/api/getRenderData', (req, res) => {
  console.log('Received getRenderData request');
  if (latestRenderData) {
    console.log('Returning render data');
    res.json({ renderData: latestRenderData, imgurls });
  } else {
    console.log('No render data available');
    res.status(404).json({ error: 'No render data available' });
  }
});

async function createContent(prompt, pages) {
  console.log('createContent started');
  console.log('Generating content...');
  const content = await generateAndSaveContent(prompt);
  console.log('Content generated successfully');
  console.log('Content sample (first 100 chars):', content.substring(0, 100));
  
  console.log('Generating images...');
  await generateAllImages(content, pages);
  console.log('Images generated successfully');
  
  console.log('Preparing render data...');
  const renderData = prepareRenderData(content, imgurls[0]);
  console.log('Render data prepared');
  return renderData;
}

async function createNextPage(pages, choice) {
  console.log('createNextPage started');
  console.log('Continuing story with choice:', choice);
  const newPrompt = storyModule.continueStory(choice, storyList);
  console.log('New prompt created');
  
  console.log('Generating content...');
  const content = await generateAndSaveContent(newPrompt);
  console.log('Content generated');
  console.log('Content sample (first 100 chars):', content.substring(0, 100));
  
  console.log('Preparing render data...');
  return prepareRenderData(content, imgurls[0]);
}

async function generateAllImages(content, pages) {
  console.log(`Generating ${pages} images...`);
  let imagePrompts = [];
  for (let i = 0; i < pages; i++) {
    console.log(`Creating image prompt for page ${i+1}...`);
    const createImagePrompt = storyModule.createImagePrompt(content, artstyle);
    console.log(`Image prompt for page ${i+1} (first 100 chars):`, createImagePrompt.substring(0, 100));
    imagePrompts.push(createImagePrompt);
  }

  imgurls = [];
  for (let i = 0; i < pages; i++) {
    try {
      console.log(`Generating image for page ${i+1}...`);
      const imageURL = await generateImage(imagePrompts[i]);
      console.log(`Image generated for page ${i+1} (data URL length: ${imageURL.length})`);
      imgurls.push(imageURL);
      const imageName = `image_${Date.now()}_${i}`;
      console.log(`Saving image with name: ${imageName}...`);
      await saveImage.saveDALLEImage(imageURL, imageName);
      console.log(`Image saved: ${imageName}`);
    } catch (error) {
      console.error(`Failed to generate or save image for page ${i+1}:`, error);
      console.error('Stack trace:', error.stack);
      imgurls.push("https://via.placeholder.com/200x300?text=Error");
      console.log(`Using placeholder image for page ${i+1}`);
    }
  }
  console.log(`Image generation complete. Generated ${imgurls.length} images.`);
}

async function generateAndSaveContent(prompt) {
  console.log('generateAndSaveContent started');
  const content = await generateContent(prompt);
  console.log('Content generated, adding to storyList');
  storyList.push(content);
  return content;
}

async function generateContent(prompt) {
  console.log('generateContent started');
  console.log('Calling Gemini API...');
  try {
    console.log('Sending prompt to textModel (first 100 chars):', prompt.substring(0, 100));
    const result = await textModel.generateContent(prompt);
    console.log('Received response from Gemini API');
    const response = result.response;
    const text = response.text();
    console.log('Text extracted successfully (first 100 chars):', text.substring(0, 100));
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}

async function generateImage(prompt) {
  console.log('generateImage started');
  console.log('Calling Imagen API using generateContent...');
  try {
    console.log('Sending prompt to imageModel (first 100 chars):', prompt.substring(0, 100));
    // Configuration: generate one image.
    const config = { number_of_images: 1 };

    // Use generateContent with a config object.
    const result = await imageModel.generateContent(prompt, config);
    console.log('Received response from Imagen API');

    // Extract image data from the response.
    // Expected structure (based on earlier error logs):
    // result.response.candidates[0].content.parts[0].inlineData.data
    const imageData = result.response.candidates[0].content.parts[0].inlineData.data;
    console.log('Extracted image data (length):', imageData.length);

    // Create a data URL for the image.
    const imageURL = `data:image/png;base64,${imageData}`;
    console.log('Data URL created');
    return imageURL;
  } catch (error) {
    console.error("Error generating image:", error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}


function prepareRenderData(content, imageURL) {
  console.log('prepareRenderData started');
  console.log('Formatting JSON from content...');
  const responseJSON = formatJSON(content);
  if (typeof responseJSON === "string") {
    console.error('Error formatting JSON:', responseJSON);
    throw new Error(responseJSON);
  }
  console.log('JSON formatted successfully');
  console.log('JSON structure:', JSON.stringify(responseJSON, null, 2));
  
  console.log('Saving book...');
  saveBook(responseJSON.Title, responseJSON.story, imageURL);
  
  console.log('Creating render data object...');
  return {
    title: responseJSON.Title,
    story: responseJSON.story,
    choice1: responseJSON.choices[0]?.choice1 || "N/A",
    choice2: responseJSON.choices[1]?.choice2 || "N/A",
    choice3: responseJSON.choices[2]?.choice3 || "N/A",
    imageURL
  };
}

function formatJSON(input) {
  console.log('formatJSON started');
  console.log('Input (first 200 chars):', input.substring(0, 200));
  let jsonString = input.trim();
  console.log('After trim (first 200 chars):', jsonString.substring(0, 200));
  jsonString = jsonString.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  console.log('After regex replacement (first 200 chars):', jsonString.substring(0, 200));
  try {
    console.log('Parsing JSON...');
    const parsed = JSON.parse(jsonString);
    console.log('JSON parsed successfully');
    return parsed;
  } catch (error) {
    console.error("Error in formatJSON: Invalid JSON input", error);
    console.error('Error message:', error.message);
    console.error('JSON string (first 200 chars):', jsonString.substring(0, 200));
    return `Error: Invalid JSON input. ${error.message}`;
  }
}

function saveBook(title, story, images) {
  console.log('saveBook started');
  console.log('Save count:', state.saveCount);
  if (state.saveCount > 0) {
    console.log('Saving page to pagelist');
    pagelist.push(story);
    state.saveCount -= 1;
    console.log('Page saved. Remaining pages:', state.saveCount);
  } else {
    console.log('All pages collected, saving the complete book');
    console.log('Title:', title);
    console.log('Number of pages:', pagelist.length);
    storeBookData(title, pagelist, images);
    console.log('Book saved successfully');
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`API endpoints available:`);
  console.log(`- POST /api/submitFormData: Submit story form data`);
  console.log(`- POST /api/sendChoice: Send user choice for story continuation`);
  console.log(`- GET /api/getRenderData: Get the latest render data`);
});