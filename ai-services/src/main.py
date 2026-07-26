from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import uvicorn

app = FastAPI(title="EduNavigator AI Services", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecommendationRequest(BaseModel):
    academicScore: Optional[float] = 0
    entranceScore: Optional[float] = 0
    budget: Optional[float] = 0
    preferredLocation: Optional[str] = ""
    preferredCourses: Optional[List[str]] = []
    careerGoal: Optional[str] = ""
    skills: Optional[List[str]] = []

class AdmissionPredictRequest(BaseModel):
    tenthMarks: Optional[float] = 0
    twelfthMarks: Optional[float] = 0
    ugCGPA: Optional[float] = 0
    entranceScore: Optional[float] = 0
    reservation: Optional[str] = "general"
    category: Optional[str] = "general"
    workExperience: Optional[float] = 0

class ScholarshipMatchRequest(BaseModel):
    income: Optional[float] = 0
    category: Optional[str] = ""
    gender: Optional[str] = ""
    state: Optional[str] = ""
    marks: Optional[float] = 0
    disability: Optional[bool] = False
    sports: Optional[bool] = False

class ChatRequest(BaseModel):
    message: str
    context: Optional[dict] = {}

class CareerGuidanceRequest(BaseModel):
    skills: Optional[List[str]] = []
    interests: Optional[List[str]] = []
    education: Optional[str] = ""

class ResumeAnalysisRequest(BaseModel):
    resumeText: str
    jobDescription: Optional[str] = ""

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "EduNavigator AI Services"}

@app.post("/api/v1/recommend")
def get_recommendations(req: RecommendationRequest):
    features = np.array([[
        req.academicScore / 100,
        req.entranceScore / 100,
        min(req.budget / 500000, 1.0),
        len(req.skills) / 10,
        1 if req.careerGoal else 0
    ]])
    score = float(np.mean(features) * 100)
    return {
        "success": True,
        "data": {
            "recommendationScore": round(min(score + 20, 99), 1),
            "matchLevel": "high" if score > 70 else "medium" if score > 40 else "low",
            "factors": ["Academic Performance", "Entrance Score", "Budget Fit", "Skill Match", "Career Alignment"]
        }
    }

@app.post("/api/v1/predict-admission")
def predict_admission(req: AdmissionPredictRequest):
    total = (
        req.tenthMarks * 0.2 +
        req.twelfthMarks * 0.3 +
        (req.ugCGPA or 0) * 10 * 0.3 +
        req.entranceScore * 0.2
    )
    probability = min(total + (10 if req.reservation != "general" else 0) + 5, 98)
    probability = max(probability, 5)
    return {
        "success": True,
        "data": {
            "admissionProbability": round(probability),
            "category": "Safe" if probability > 70 else "Moderate" if probability > 40 else "Dream",
            "recommendation": "Strong candidate" if probability > 70 else "Moderate chances" if probability > 40 else "Competitive"
        }
    }

@app.post("/api/v1/match-scholarships")
def match_scholarships(req: ScholarshipMatchRequest):
    score = 0
    if req.marks and req.marks > 85: score += 30
    if req.income and req.income < 500000: score += 25
    if req.category: score += 15
    if req.gender: score += 10
    if req.disability or req.sports: score += 10
    if req.state: score += 10
    return {
        "success": True,
        "data": {
            "eligibilityScore": min(score, 100),
            "estimatedMatches": max(1, score // 20),
            "categories": ["Merit Based", "Need Based"] if score > 50 else ["Need Based"]
        }
    }

@app.post("/api/v1/career-guidance")
def career_guidance(req: CareerGuidanceRequest):
    suggestions = [
        {"career": "Data Scientist", "matchScore": 92, "requiredSkills": ["Python", "ML", "Statistics"], "avgSalary": "₹25 LPA"},
        {"career": "AI/ML Engineer", "matchScore": 88, "requiredSkills": ["Python", "TensorFlow", "NLP"], "avgSalary": "₹28 LPA"},
        {"career": "Full Stack Developer", "matchScore": 85, "requiredSkills": ["React", "Node.js", "TypeScript"], "avgSalary": "₹18 LPA"},
    ]
    return {"success": True, "data": {"careerSuggestions": suggestions, "skillGaps": [], "roadmap": []}}

@app.post("/api/v1/chat")
def chat(req: ChatRequest):
    msg = req.message.lower()
    if "hello" in msg or "hi" in msg:
        reply = "Hello! I'm EduNavigator AI. How can I help you with your education journey?"
    elif "college" in msg or "university" in msg:
        reply = "I can help find the best universities! Tell me about your academic background and preferences."
    elif "scholarship" in msg:
        reply = "Check our Scholarships page! I can match you with scholarships based on your eligibility."
    elif "admission" in msg or "deadline" in msg:
        reply = "Use our Admission Predictor for personalized admission probability analysis!"
    elif "placement" in msg or "package" in msg:
        reply = "Top universities offer ₹20-30 LPA average packages. Use Compare to see details!"
    elif "career" in msg or "job" in msg:
        reply = "Visit Career Guidance for AI-powered career suggestions and learning roadmaps!"
    else:
        reply = "I can help with university recommendations, admissions, scholarships, placements, and career guidance."
    return {"success": True, "data": {"reply": reply}}

@app.post("/api/v1/analyze-resume")
def analyze_resume(req: ResumeAnalysisRequest):
    word_count = len(req.resumeText.split())
    has_email = "@" in req.resumeText
    has_phone = any(c.isdigit() for c in req.resumeText[:50])
    sections = [s.lower() for s in ["education", "experience", "skills", "projects"]]
    found_sections = [s for s in sections if s in req.resumeText.lower()]
    score = min(len(found_sections) * 20 + (10 if has_email else 0) + (10 if has_phone else 0) + 10, 100)
    return {
        "success": True,
        "data": {
            "overallScore": score,
            "missingSections": [s for s in sections if s not in found_sections],
            "suggestions": [
                "Add measurable achievements" if score < 80 else "Good resume",
                "Include relevant keywords" if score < 60 else None,
            ],
            "wordCount": word_count
        }
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
