import sys
import json
import spacy

nlp = spacy.load("en_core_web_sm")

resume_text = sys.stdin.read()

# Clean text
resume_text = resume_text.encode("utf-8", "ignore").decode("utf-8")

doc = nlp(resume_text.lower()[:100000])

#  Define categories
skills = {
    "languages": ["python", "java", "c", "c++", "javascript", "sql"],
    "tools": ["react", "node", "docker", "aws", "excel", "vmware", "ahrefs", "power bi"],
    "concepts": ["machine learning", "data analysis", "nlp", "deep learning", "api", "cloud"]
}

found = {
    "languages": [],
    "tools": [],
    "concepts": []
}


clean_text = resume_text.lower().replace("-", " ").replace(",", " ")
clean_text = " ".join(clean_text.split())

#  Match keywords properly
for category in skills:
    for keyword in skills[category]:
        if keyword in clean_text:
            found[category].append(keyword)

# ATS Score
total_keywords = sum(len(v) for v in skills.values())
matched_keywords = sum(len(v) for v in found.values())
score = int((matched_keywords / total_keywords) * 100)

result = {
    "ats_score": score,
    "categorized_keywords": found
}

print(json.dumps(result))