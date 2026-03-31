import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

/* ICONS */
const Icon = ({ type }) => {
  const icons = {
    resume: "📄",
    ats: "📊",
    skills: "🛠",
    projects: "📁",
    experience: "💼",
    keywords: "🔑",
    strengths: "💪",
    weaknesses: "⚠️",
    impact: "📈",
    recruiter: "🧠",
    ai: "🤖",
    suggestion: "💡",
    bullets: "📋"
  };
  return <span style={{ marginRight: "8px" }}>{icons[type]}</span>;
};

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedATS, setAnimatedATS] = useState(0);
  const [copied, setCopied] = useState(false);

  const [animatedSections, setAnimatedSections] = useState({
    skills: 0,
    projects: 0,
    experience: 0
  });

  const fullText =
    "Track. Optimize. Get ATS-Ready. Build resumes that actually get shortlisted.";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!data) return;

    let s = 0;
    let ats = 0;

    const interval = setInterval(() => {
      if (s < data.score) {
        s++;
        setAnimatedScore(s);
      }
      if (ats < data.ats_score) {
        ats++;
        setAnimatedATS(ats);
      }
      if (s >= data.score && ats >= data.ats_score) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    if (!data?.section_scores) return;

    let skills = 0;
    let projects = 0;
    let experience = 0;

    const interval = setInterval(() => {
      setAnimatedSections(prev => ({
        skills: skills < data.section_scores.skills ? ++skills : prev.skills,
        projects: projects < data.section_scores.projects ? ++projects : prev.projects,
        experience: experience < data.section_scores.experience ? ++experience : prev.experience
      }));

      if (
        skills >= data.section_scores.skills &&
        projects >= data.section_scores.projects &&
        experience >= data.section_scores.experience
      ) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [data]);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      const response = res.data;

      const matched = Object.values(response.categorized_keywords || {}).flat();

      const allKeywords = [
        "python","java","c","c++","javascript","sql","react","node",
        "excel","vmware","ahrefs","power bi","machine learning",
        "data analysis","api","cloud","docker","aws","kubernetes"
      ];

      const missing = allKeywords.filter(
        k => !matched.map(m => m.toLowerCase()).includes(k.toLowerCase())
      );

      setData({
        score: response.score || 50,
        summary: response.summary || "No summary available",

        strengths: response.strengths || [],
        weaknesses: response.weaknesses || [],

        impact_analysis: response.impact_analysis || [],
        recruiter_insight: response.recruiter_insight || [],
        ats_analysis: response.ats_analysis || [],

        suggestions: response.suggestions || [],
        improved_bullets: response.improved_bullets || [],

        ats_score: response.ats_score || 0,
        matched_keywords: matched,
        missing_keywords: missing,

        section_scores: response.section_scores || {
          skills: 50,
          projects: 50,
          experience: 50
        }
      });

      setTimeout(() => setShowHero(false), 300);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const handlePreview = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      window.open(url, "_blank");
    }
  };

  const handleBack = () => {
    setShowHero(true);
    setData(null);
    setFile(null);
    setAnimatedScore(0);
    setAnimatedATS(0);
    setCopied(false);
  };

  const handleCopy = () => {
    const text = data.improved_bullets.join("\n");
    navigator.clipboard.writeText(text);

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const renderList = (arr) =>
    arr?.length ? arr.map((item, i) => <li key={i}>{item}</li>) : <li>No data available</li>;

  return (
    <div className="app-container">

      {!showHero && (
        <div className="top-bar">
          <button className="back-btn" onClick={handleBack}>←</button>
        </div>
      )}

      {showHero && (
        <div className="hero fade-in">
          <h1>ResumeBot</h1>
          <p className="typewriter">{typedText}</p>

          <div className="upload-box">
            <div className="file-input-wrapper">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
                id="fileUpload"
              />

              <label htmlFor="fileUpload" className="file-btn">
                Choose File
              </label>

              {file && (
                <span className="file-name">
                  {file.name}
                  <button className="remove-file" onClick={() => setFile(null)}>✕</button>
                </span>
              )}
            </div>

            <button onClick={handlePreview}>Preview</button>
            <button onClick={handleUpload}>
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>
        </div>
      )}

      {data && (
        <div className="results fade-in">

          {/* RESUME SCORE */}
          <div className="card glass score-card">
            <div className="score-ring">
              <svg width="110" height="110">
                <defs>
                  <linearGradient id="grad">
                    <stop offset="0%" stopColor="#ff00cc" />
                    <stop offset="100%" stopColor="#6a00ff" />
                  </linearGradient>
                </defs>

                <circle cx="55" cy="55" r="50" stroke="#2a1a3f" strokeWidth="8" fill="none"/>
                <circle
                  cx="55"
                  cy="55"
                  r="50"
                  stroke="url(#grad)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="314"
                  strokeDashoffset={314 - (314 * animatedScore) / 100}
                  strokeLinecap="round"
                />
              </svg>

              <div className="score-text">{animatedScore}%</div>
            </div>

            <div>
              <h2><Icon type="resume" />Resume Score</h2>
              <p>{data.summary}</p>
            </div>
          </div>

          {/* ATS */}
          <div className="card glass">
            <h2><Icon type="ats" />ATS Score: {animatedATS}%</h2>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${animatedATS}%` }} />
            </div>
          </div>

          {/* SECTIONS */}
          <div className="section-row">
            {["skills", "projects", "experience"].map((key) => (
              <div className="card glass mini-card" key={key}>
                <div className="big-ring">
                  <svg width="120" height="120">
                    <circle cx="60" cy="60" r="50" stroke="#2a1a3f" strokeWidth="8" fill="none"/>
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="url(#grad)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="314"
                      strokeDashoffset={314 - (314 * animatedSections[key]) / 100}
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="big-text">{animatedSections[key]}%</div>
                </div>

                <h4><Icon type={key} />{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
              </div>
            ))}
          </div>

          {/* ✅ FIXED KEYWORDS */}
          <div className="card glass">
            <h3><Icon type="keywords" />Keywords Analysis</h3>

            <h4>Matched Keywords</h4>
            <ul>
              {data.matched_keywords?.length
                ? data.matched_keywords.map((k, i) => <li key={i}>{k}</li>)
                : <li>No matched keywords</li>}
            </ul>

            <h4>Missing Keywords</h4>
            <ul>
              {data.missing_keywords?.length
                ? data.missing_keywords.map((k, i) => <li key={i}>{k}</li>)
                : <li>No missing keywords</li>}
            </ul>
          </div>

          {/* OTHER CARDS */}
          {[
            ["strengths", "Strengths", data.strengths],
            ["weaknesses", "Weaknesses", data.weaknesses],
            ["impact", "Impact Analysis", data.impact_analysis],
            ["recruiter", "Recruiter Insight", data.recruiter_insight],
            ["ai", "ATS Analysis", data.ats_analysis],
            ["suggestion", "Suggestions", data.suggestions],
          ].map(([type, title, arr]) => (
            <div className="card glass" key={title}>
              <h3><Icon type={type} />{title}</h3>
              <ul>{renderList(arr)}</ul>
            </div>
          ))}

          {/* BULLETS */}
          <div className="card glass">
            <button
              type="button"
              className={`copy-btn ${copied ? "copied" : ""}`}
              onClick={handleCopy}
            >
              {copied ? "✔" : "📋"}
            </button>

            <h3><Icon type="bullets" />Improved Bullet Points</h3>

            <ul>{renderList(data.improved_bullets)}</ul>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;