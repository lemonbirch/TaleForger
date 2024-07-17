import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function saveDALLEImage(imageUrl, filename) {
  try {
    // Fetch the image data
    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    // Determine the file extension (assuming PNG, but you might want to make this dynamic)
    const fileExtension = '.png';

    // Create the full file path
    const filePath = path.join(__dirname, 'images', filename + fileExtension);

    // Ensure the images directory exists
    await fs.mkdir(path.join(__dirname, 'images'), { recursive: true });

    // Write the file
    await fs.writeFile(filePath, response.data);

    console.log('Image saved successfully:', filePath);
    return filePath;
  } catch (error) {
    console.error('Error saving image:', error.message);
    throw error;
  }
}

// Usage

