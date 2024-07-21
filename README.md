TaleForge
TaleForge is an interactive storybook website where users' choices affect the progression of the story. It's built with Next.js and TypeScript, providing a dynamic and engaging experience for young readers.
Features

Interactive storytelling with user choices
Dynamic image generation for each page
Responsive design for various devices
Custom fonts for a child-friendly interface

Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js (v14 or later)
npm or yarn package manager

Installation
To install TaleForge, follow these steps:

Clone the repository:
Copygit clone https://github.com/yourusername/taleforge.git

Navigate to the project directory:
Copycd taleforge

Install the dependencies:
Copynpm install
or if you're using yarn:
Copyyarn install


Usage
To run TaleForge locally, use the following command:
Copynpm run dev
or with yarn:
Copyyarn dev
This will start the development server. Open http://localhost:3000 in your browser to view the application.


app/: Contains the main application code
components/: Reusable React components
globals.css: Global styles
layout.tsx: Root layout component
page.tsx: Main page component
public/: Static assets
styles/: Additional style files
next.config.js: Next.js configuration
package.json: Project dependencies and scripts
tsconfig.json: TypeScript configuration

Contributing
Contributions to TaleForge are welcome. Please follow these steps to contribute:

Fork the repository
Create a new branch: git checkout -b feature-branch-name
Make your changes and commit them: git commit -m 'Add some feature'
Push to the branch: git push origin feature-branch-name
Create a pull request

License
This project is licensed under the MIT License.