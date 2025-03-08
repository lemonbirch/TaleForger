import os
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
import sys
import base64
import json

def generate_images(prompt, num_images=4):
    # Read API key from environment variable
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise Exception("Missing GEMINI_API_KEY in environment variables")
        
    client = genai.Client(api_key=api_key)
    
    response = client.models.generate_images(
        model='imagen-3.0-generate-002',
        prompt=prompt,
        config=types.GenerateImagesConfig(
            number_of_images=num_images,
        )
    )
    images_base64 = []
    for generated_image in response.generated_images:
        img = Image.open(BytesIO(generated_image.image.image_bytes))
        buffered = BytesIO()
        img.save(buffered, format="PNG")
        img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
        images_base64.append(img_base64)
    return images_base64

if __name__ == '__main__':
    prompt = sys.argv[1] if len(sys.argv) > 1 else "Fuzzy bunnies in my kitchen"
    images = generate_images(prompt)
    print(json.dumps(images))
