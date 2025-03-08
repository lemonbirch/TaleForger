'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Html2Canvas = dynamic(() => import('html2canvas'), { ssr: false });

const ScreenshotComponent = () => {
  const [url, setUrl] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const captureScreenshot = async () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    setError('');
    setScreenshotUrl('');
    setIsLoading(true);

    try {
      // Create an iframe to load the target webpage
      const iframe = document.createElement('iframe');
      iframe.style.width = '1024px';
      iframe.style.height = '768px';
      iframe.style.visibility = 'hidden';
      iframe.style.position = 'absolute';
      iframe.style.top = '-9999px';
      document.body.appendChild(iframe);

      // Load the webpage into the iframe
      iframe.src = url;
      await new Promise((resolve, reject) => {
        iframe.onload = resolve;
        iframe.onerror = reject;
        // Set a timeout in case the page doesn't load
        setTimeout(reject, 30000); // 30 seconds timeout
      });

      // Check if we can access the iframe's content
      if (!iframe.contentDocument || !iframe.contentDocument.body) {
        throw new Error('Unable to access iframe content. This might be due to cross-origin restrictions.');
      }

      // Wait for the iframe to fully load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Capture the screenshot
      const html2canvas = await Html2Canvas;
      const canvas = await html2canvas(iframe.contentDocument.body, {
        width: iframe.contentDocument.body.scrollWidth,
        height: iframe.contentDocument.body.scrollHeight,
        windowWidth: iframe.contentDocument.body.scrollWidth,
        windowHeight: iframe.contentDocument.body.scrollHeight,
      });

      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL('image/png');
      setScreenshotUrl(dataUrl);

      // Clean up
      document.body.removeChild(iframe);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      setError(`Error capturing screenshot: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Full-page Screenshot App</h1>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter the URL of the webpage"
        className="w-full px-3 py-2 border rounded-md mb-4"
        required
      />
      <button
        onClick={captureScreenshot}
        disabled={isLoading}
        className={`w-full ${
          isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        } text-white py-2 rounded-md transition-colors`}
      >
        {isLoading ? 'Capturing...' : 'Capture Screenshot'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {screenshotUrl && (
        <div className="mt-4">
          <a
            href={screenshotUrl}
            download="full_page_screenshot.png"
            className="block w-full text-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Download Screenshot
          </a>
          <img src={screenshotUrl} alt="Captured screenshot" className="mt-4 w-full" />
        </div>
      )}
    </div>
  );
};

export default ScreenshotComponent;
