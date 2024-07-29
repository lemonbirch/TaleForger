// server.js
import dotenv from "dotenv";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import * as saveImage from "./image.js";
import * as storyModule from "./prompt.js";

dotenv.config();
const GEMINI_KEY = process.env.GEMINI_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!GEMINI_KEY || !OPENAI_API_KEY) {
  throw new Error('Missing GEMINI_KEY or OPENAI_API_KEY in environment variables');
}

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const openai = new OpenAI(OPENAI_API_KEY);

let latestRenderData = null;
let imgurls = [];
let storyList = [];
let artstyle = "";

app.post('/api/submitFormData', async (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);

  if (!formData.characterName || !formData.storyTheme || !formData.readingLevel || !formData.language || !formData.pages || !formData.artStyle) {
    return res.status(400).json({ error: 'Missing required form data' });
  }

  storyList = [];
  imgurls = [];
  artstyle = formData.artStyle;
  const pages = formData.pages;
  const prompt = storyModule.formatInstructions(formData.characterName, formData.storyTheme, formData.readingLevel, formData.language, pages);
  storyList.push(prompt);

  try {
    const renderData = await createContent(prompt, pages);
    latestRenderData = renderData;
    res.status(200).json(renderData);
  } catch (error) {
    console.error('Error in createContent:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.post('/api/sendChoice', async (req, res) => {
  let { value: choice } = req.body;

  if (!choice) {
    return res.status(400).json({ error: 'Missing choice value' });
  }

  try {
    const renderData = await createNextPage(storyList.length, choice);
    console.log("this is the latest render data: " + renderData)
    latestRenderData = renderData;
    res.status(200).json(renderData);
  } catch (error) {
    console.error('Error in createNextPage:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.get('/api/getRenderData', (req, res) => {
  if (latestRenderData) {
    res.status(200).json({ renderData: latestRenderData, imgurls });
  } else {
    res.status(404).json({ error: 'No render data available' });
  }
});

async function createContent(prompt, pages) {
  const content = await generateAndSaveContent(prompt);
  await generateAllImages(content, pages);
  return prepareRenderData(content, imgurls[0]);
}


async function createNextPage(pages, choice) {
  const newPrompt = storyModule.continueStory(choice, storyList);
  const content = await generateAndSaveContent(newPrompt);
  console.log("this is the content " + content)
  return prepareRenderData(content, imgurls[0]);
}

async function generateAllImages(content, pages) {
  let imagePrompts = [];
  for (let i = 0; i < pages; i++) {
    const createImagePrompt = storyModule.createImagePrompt(content, artstyle);
    imagePrompts.push(createImagePrompt);
  }

  imgurls = [];
  for (let i = 0; i < pages; i++) {
    try {
      const imageURL = await generateImage(imagePrompts[i]);
      imgurls.push(imageURL);
      const imageName = `image_${Date.now()}_${i}.png`;
      await saveImage.saveDALLEImage(imageURL, imageName);
    } catch (error) {
      console.error('Failed to generate or save image:', error);
      imgurls.push("https://via.placeholder.com/200x300?text");
    }
  }
}

async function generateAndSaveContent(prompt) {
  const content = await generateContent(prompt);
  storyList.push(content);
  return content;
}

async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return await response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
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
    return image.data[0].url;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}

function prepareRenderData(content, imageURL) {
  const responseJSON = formatJSON(content);
  if (typeof responseJSON === 'string') {
    throw new Error(responseJSON);
  }
  return {
    title: responseJSON.Title,
    story: responseJSON.story,
    choice1: responseJSON.choices[0]?.choice1 || 'N/A',
    choice2: responseJSON.choices[1]?.choice2 || 'N/A',
    choice3: responseJSON.choices[2]?.choice3 || 'N/A',
    imageURL
  };
}

function formatJSON(input) {
  console.log("this is the input: " + input)
  let jsonString = input.trim();
  jsonString = jsonString.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error in formatJSON: Invalid JSON input", error);
    return `Error: Invalid JSON input. ${error.message}`;
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});