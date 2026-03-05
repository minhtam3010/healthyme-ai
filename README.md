# HealthyMe AI - Smart Health Insight & Planner

HealthyMe AI is a responsive web application that generates personalized, AI-powered health insights and exercise recommendations to help users reach their goal weight. Built with React (TypeScript), Redux Toolkit, Ant Design, and the Gemini LLM API.

## Features

- **AI-Powered Health Plans:** Generates customized weekly exercise routines and nutrition insights.
- **Persistent Profiles:** Create multiple user profiles (stored locally using Redux Persist).
- **Interactive Data Visualization:** View progress and macronutrients using Ant Design charts.
- **Export to PDF:** Download your full personalized report as a PDF.

## How to Run Locally

### Prerequisites

- Node.js (v18+)
- npm or yarn
- A Gemini API Key

### Setup Instructions

1. Clone the repository (if applicable) and navigate into the project directory:

   ```bash
   cd healthyai
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup Environment Variables:
   Create a `.env` file in the root of the project and add your Gemini API Key:

   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Frontend Framework:** React 19 + Vite
- **Language:** TypeScript
- **State Management:** Redux Toolkit + Redux Persist
- **UI & Charts:** Ant Design + Ant Design Plots
- **LLM Integration:** Google Gemini API
- **PDF Generation:** html2canvas + jsPDF

## Live Demo

URL: https://healthyme-ai-pied.vercel.app/
