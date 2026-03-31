🚀 ResumeBot – AI-Powered Resume Analyzer

ResumeBot is a high-performance, full-stack web application designed to bridge the gap between job seekers and modern hiring systems. By simulating both Applicant Tracking Systems (ATS) and human recruiter intuition, ResumeBot provides deep, actionable insights to turn a standard CV into a shortlisting machine.

✨ Key Features

📊 Dynamic Resume Scoring

Generates an overall score (0–100) based on clarity, structure, and content impact.

🤖 Advanced ATS Simulation

Calculates an ATS-specific compatibility score.

Identifies formatting "red flags" that might cause parsing errors.

🔑 Keyword Intelligence

Extracts matched keywords and detects critical missing terms.

Ensures alignment with industry-standard job requirements.

📈 Granular Section Scoring

Detailed breakdowns for Skills, Projects, and Experience.

🧠 Recruiter Insights

Predicts how a human eye perceives your profile.

Highlights strengths and potential red flags (e.g., employment gaps or vague descriptions).

✍️ AI-Powered Content Enhancement

Smart Suggestions: Non-generic, actionable advice for every section.

Bullet Point Optimizer: Rewrites weak statements into high-impact, quantified achievements using action verbs.

🖥️ Tech Stack

Frontend

React.js: For a reactive and modular user interface.

Axios: Handling seamless API requests.

UI/UX: Custom CSS featuring Glassmorphism and Neon UI aesthetics.

Data Viz: SVG-based animated progress rings for real-time score visualization.

Backend

Node.js & Express.js: Robust server-side logic and routing.

Multer: Specialized middleware for handling PDF resume uploads.

AI Integration

Python (NLP): For initial text processing and parsing.

OpenRouter API: Accessing cutting-edge LLMs (OpenAI-compatible).

Prompt Engineering: Fine-tuned to return structured JSON for precise frontend rendering.

⚙️ How It Works

Upload: User uploads a PDF resume.

Process: The backend extracts text and sends it to the AI engine.

Analyze: The AI evaluates the content against specialized prompts for scoring, ATS gaps, and recruiter perspective.

Visualize: The frontend renders the structured JSON data into animated score rings, progress bars, and insight cards.

🎯 Use Cases

Students: Preparing for campus placements and internships.

Job Seekers: Optimizing resumes for competitive corporate roles.

Developers: Exploring the integration of AI models within a full-stack environment.

⚠️ Important Notes

Dependency: The backend server must be running for the frontend to fetch analysis data.
API Key: A valid OpenRouter API Key is required for the AI analysis features to function.
