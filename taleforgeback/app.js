import express from 'express';
import bodyParser from 'body-parser';
import * as storyModule from "./prompt.js"
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import * as saveImage from "./saveimage.js"

const app = express();
const port = 4000;

app.use(express.static("views"));
app.use(express.static("public"));

dotenv.config(); 
const GEMINI_KEY = process.env.GEMINI_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const openai = new OpenAI();


var storyList = []
var artstyle = " "

app.get("/", (req, res) => {
  res.render("index.ejs");
});


app.get("/storychoicebuilder", (req, res) => {
  res.render("storychoicebuilder.ejs");
});

app.get("/story", async (req, res) => {
  storyList = []
  const characterName = req.query.character_name;
  const storyTheme = req.query.story_theme;
  const readingLevel = req.query.reading_level; // Correct parameter name
  const language = req.query.language;
  const numberOfPages = req.query.number_of_pages; // Correct parameter name
  artstyle = req.query.art_style;
  const voice = req.query.voice;
  const prompt = storyModule.formatInstructions(characterName, storyTheme, readingLevel, language, numberOfPages)
  // const prompt = storyModule.buildStory(characterName, storyTheme)
  storyList.push(prompt);

  await renderContent(req, res, prompt)
  
});



// Route handlers using the reusable function
app.get("/choice1", async (req, res) => {
  await handleChoice(req, res, 1);
});

app.get("/choice2", async (req, res) => {
  await handleChoice(req, res, 2);
});

app.get("/choice3", async (req, res) => {
  await handleChoice(req, res, 3);
});

const handleChoice = async (req, res, choice) => {
  const newPrompt = storyModule.continueStory(choice, storyList);
  await renderContent(req, res, newPrompt)
};

// Generate and save content
async function generateAndSaveContent(prompt) {
  const content = await generateContent(prompt);
  storyList.push(content);
  return content;
}

// Generate and save image
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

// Prepare data for rendering
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

// Main function
async function renderContent(req, res, prompt) {
  try {
    const content = await generateAndSaveContent(prompt);
    const imageURL = await generateAndSaveImage(content);
    //  "https://oaidalleapiprodscus.blob.core.windows.net/private/org-wu5GqWI8J6SGzX7Vz6q7H81Z/user-WcbDz9fVXoEqb6nusJxTAS7O/img-5iD3Fb8l7JMTwRFCzsSBV06L.png?st=2024-07-09T21%3A36%3A57Z&se=2024-07-09T23%3A36%3A57Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-09T18%3A51%3A41Z&ske=2024-07-10T18%3A51%3A41Z&sks=b&skv=2023-11-03&sig=a2RjeFpOrHgrlgMHJxtAPVX9JiCs65MVXu5pTkhQhtQ%3D"
    const renderData = prepareRenderData(content, imageURL);
    res.render("story.ejs", renderData);
  } catch (error) {
    console.error('Error in renderContent:', error);
    res.status(500).send('An error occurred while processing your request');
  }
}

app.get("/resetStory", async (req, res) => {
  storyList = [storyList[0]]; 
  const resetPrompt = storyList; 
  await renderContent(req, res, resetPrompt);
});
// app.get("/supriseStory", async (req, res) => {
//   storyList = []
//   const prompt = storyModule.supriseStory()
//   storyList.push(prompt);

//   const text = generateContent(prompt).then(content => {
//     // console.log("Generated Content:", content);
//     storyList.push(content);
//     // const text = splitContent(content);
//     // const choices = questions(content); 
//     res.render("story.ejs", {
//       story: text,
//       choices: choices
//     });
//   }); 
// });

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
// async function generateImage(imagePrompt) {
//   const image = await openai.images.generate({
//     model: "dall-e-2",
//     prompt: imagePrompt,
//     n: 1,
//     size: "1024x1024",
//     response_format: "url"
//   });

//   console.log(image.data);
// }


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
  console.log(`Server is running on port ${port}`);
});



