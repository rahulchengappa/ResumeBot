const axios = require("axios");
require("dotenv").config();

async function analyzeResume(resumeText) {
  const prompt = `
You are an expert ATS resume evaluator and hiring manager.

Your job is to deeply analyze the resume and provide HIGH-VALUE, ACTIONABLE insights — not generic advice.

---

 SCORING RULES (STRICT):
- 90–100 → Exceptional (rare, strong quantified impact, clear achievements)
- 70–85 → Good (solid but can improve impact/metrics)
- 40–60 → Average (basic, lacks clarity or measurable outcomes)
- Below 40 → Weak (poor structure, missing skills, low relevance)

⚠️ MOST resumes should fall between 60–80  
⚠️ DO NOT inflate scores  
⚠️ Penalize lack of metrics, vague descriptions, or generic wording  

---

 ANALYSIS REQUIREMENTS:

1. SUMMARY  
→ 2–3 lines explaining overall quality, impact, and positioning

2. STRENGTHS  
→ Specific, not generic

3. WEAKNESSES  
→ Clear gaps

4. IMPACT ANALYSIS  
5. RECRUITER INSIGHT  
6. ATS GAP ANALYSIS  

7. SUGGESTIONS (ACTIONABLE ONLY)  

8. MISSING KEYWORDS  

9. IMPROVED BULLET POINTS  

10. SECTION-WISE SCORING 
→ Give score (0–100) for:
- Skills
- Projects
- Experience

---

 OUTPUT FORMAT (STRICT JSON ONLY):

{
  "score": number,
  "summary": "...",

  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],

  "impact_analysis": ["...", "..."],
  "recruiter_insight": ["...", "..."],
  "ats_analysis": ["...", "..."],

  "suggestions": ["...", "..."],
  "missing_keywords": ["...", "..."],

  "improved_bullets": ["...", "..."],

  "section_scores": {
    "skills": number,
    "projects": number,
    "experience": number
  }
}

---

 RULES:
- DO NOT return text outside JSON
- DO NOT leave any field empty
- Be sharp, realistic, hiring-focused

---

Resume:
${resumeText.slice(0, 4000)}
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini", // 🔥 upgraded model
        messages: [
          {
            role: "system",
            content: "You are a strict ATS resume evaluator and hiring manager."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 2000, 
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let content = response.data.choices[0].message.content;

    let cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleaned = jsonMatch[0];
    }

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.log("⚠️ Raw AI response:", cleaned);

      return {
        score: 50,
        summary: "Could not fully analyze resume.",

        strengths: ["Basic structure detected", "Some relevant content present"],
        weaknesses: ["Parsing failed", "Incomplete analysis"],

        impact_analysis: ["Impact unclear", "No measurable outcomes detected"],
        recruiter_insight: ["May not shortlist", "Needs stronger positioning"],
        ats_analysis: ["Low keyword density", "Missing role-specific terms"],

        suggestions: ["Add measurable metrics", "Improve bullet clarity"],
        missing_keywords: ["metrics", "impact"],

        improved_bullets: [
          "Improved system efficiency by 15%",
          "Collaborated to deliver project milestones on time"
        ],

        section_scores: {
          skills: 50,
          projects: 50,
          experience: 50
        }
      };
    }

    // Score clamp
    if (typeof parsed.score !== "number") parsed.score = 60;
    parsed.score = Math.min(Math.max(parsed.score, 20), 90);

    const ensureArray = (arr, fallback) =>
      Array.isArray(arr) && arr.length >= 2 ? arr : fallback;

    parsed.strengths = ensureArray(parsed.strengths, [
      "Good foundational technical skills",
      "Relevant experience present"
    ]);

    parsed.weaknesses = ensureArray(parsed.weaknesses, [
      "Lacks quantified achievements",
      "Needs stronger impact statements"
    ]);

    parsed.impact_analysis = ensureArray(parsed.impact_analysis, [
      "Impact not clearly measurable",
      "Results lack quantification"
    ]);

    parsed.recruiter_insight = ensureArray(parsed.recruiter_insight, [
      "May pass initial screening",
      "Needs stronger differentiation"
    ]);

    parsed.ats_analysis = ensureArray(parsed.ats_analysis, [
      "Keyword density is moderate",
      "Missing role-specific terms"
    ]);

    parsed.suggestions = ensureArray(parsed.suggestions, [
      "Add % improvements or scale metrics",
      "Use stronger action verbs"
    ]);

    parsed.missing_keywords = ensureArray(parsed.missing_keywords, [
      "metrics",
      "impact-driven results"
    ]);

    parsed.improved_bullets = ensureArray(parsed.improved_bullets, [
      "Improved efficiency by 20% through optimization",
      "Delivered projects improving performance by 15%"
    ]);

    if (!parsed.section_scores) {
      parsed.section_scores = {
        skills: 60,
        projects: 60,
        experience: 60
      };
    }

    return parsed;

  } catch (err) {
    console.error("AI ERROR:", err.response?.data || err.message);
    return { error: "AI request failed" };
  }
}

module.exports = { analyzeResume };