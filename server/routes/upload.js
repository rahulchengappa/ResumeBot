const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { exec } = require("child_process");
const { analyzeResume } = require("../utils/ai");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;
    let text = "";

    if (file.mimetype === "application/pdf") {
      const data = await pdfParse(fs.readFileSync(file.path));
      text = data.text;
    } else {
      const data = await mammoth.extractRawText({ path: file.path });
      text = data.value;
    }

    // 🔥 AI RESULT (unchanged)
    const aiResult = await analyzeResume(text);

    // 🔥 PYTHON ATS RESULT (FIXED)
    const pythonProcess = exec(`python ../python/ats.py`, { maxBuffer: 1024 * 500 });

    pythonProcess.stdin.write(text);   // ✅ send resume text
    pythonProcess.stdin.end();

    pythonProcess.stdout.on("data", (data) => {
      try {
        const atsResult = JSON.parse(data);

        // 🔥 MERGE RESULTS
        const finalResult = {
          ...aiResult,
          ...atsResult
        };

        res.json(finalResult);

      } catch (e) {
        console.error("Parse ERROR:", e);
        res.json(aiResult); // fallback
      }
    });

    pythonProcess.stderr.on("data", (err) => {
      console.error("Python ERROR:", err.toString());
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;