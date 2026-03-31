🚀 ResumeBot – AI-Powered Resume Analyzer

ResumeBot is a full-stack AI-powered web application that analyzes resumes and provides deep, actionable insights to improve ATS compatibility, recruiter appeal, and overall resume quality.

It simulates real-world recruiter evaluation and Applicant Tracking System (ATS) screening to help users optimize their resumes for better shortlisting chances.

✨ Key Features
📊 Resume Scoring-
Generates an overall Resume Score (0–100)
Based on clarity, structure, and impact of content

🤖 ATS Analysis-
Calculates ATS Score
Simulates how ATS systems scan resumes
Highlights keyword gaps and formatting issues

🔑 Keyword Intelligence-
Identifies Matched Keywords
Detects Missing Keywords
Improves alignment with job requirements

📈 Section-wise Scoring-
Breakdown of resume into:
Skills
Projects
Experience
Each section is scored individually for deeper insights.

🧠 Recruiter Insights-
Predicts recruiter perception
Highlights strengths and red flags
Suggests improvements from a hiring perspective

💡 Smart Suggestions-
Actionable, non-generic improvements
Focus on measurable impact and clarity

✍️ AI-Generated Bullet Points-
Converts weak bullets into high-impact statements
Uses action verbs + quantified achievements

📊 Deep Analysis
Includes:
Strengths & Weaknesses
Impact Analysis
ATS Gap Analysis
Recruiter Perspective

🖥️ Tech Stack
Frontend-
React.js
Axios
Custom CSS (Glassmorphism + Neon UI)
SVG-based animated progress rings

Backend-
Node.js
Express.js
Multer (file upload handling)

AI Integration-
Python(NLP)
OpenRouter API (OpenAI-compatible models)
Prompt engineering for structured JSON output

⚙️ How It Works
User uploads a resume (PDF)
Backend extracts and processes resume content
AI model analyzes resume using structured prompts
Returns:
Scores
Insights
Suggestions
Improved content

Frontend visualizes results using:
Animated score rings
Progress bars
Insight cards

📂 Project Structure
resumebot/
│
├── client/                # React Frontend
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── components/
│   └── public/
│
├── server/                # Node.js Backend
│   ├── routes/
│   │   └── upload.js
│   ├── utils/
│   │   └── ai.js
│   ├── uploads/
│   └── server.js
│
│──python/
│  ├──ats.py              #NLP spacey
│
├── README.md
└── .gitignore

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/rahulchengappa/ResumeBot.git
cd ResumeBot
2️⃣ Setup Backend
cd server
npm install

Create a .env file inside /server:

OPENROUTER_API_KEY=your_api_key_here

Run backend:

node server.js
3️⃣ Setup Frontend
cd client
npm install
npm start

🎯 Use Cases
Students preparing for placements
Job seekers optimizing resumes
Developers exploring AI + full-stack apps
Anyone wanting ATS-friendly resumes

⚠️ Important Notes
Backend must be running before frontend
Requires OpenRouter API key
Works best with clean, text-based PDF resumes

