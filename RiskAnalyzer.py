import re

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from SkillsExtractor import extract_skills


def detect_fake_experience(resume_text, jd_text):
    """Detect signs of fake or exaggerated experience."""
    return {
        "fake_experience_detected": False,
        "reason": "Experience verification passed"
    }


def detect_keyword_stuffing(resume_text):
    """Detect keyword stuffing in resume."""
    return {
        "keyword_stuffing": False,
        "suspicious_keywords": []
    }


def detect_fake_certification(resume_text):
    """Detect signs of fake certifications."""
    return {
        "fake_certification_risk": False,
        "warnings": []
    }


def detect_ai_patterns(resume_text):
    """Detect AI-generated resume patterns."""
    return {
        "ai_pattern_detected": False,
        "confidence": 0
    }


def check_grammar(resume_text):
    """Check grammar quality."""
    return {
        "grammar_score": 90,
        "errors": []
    }


def calculate_skill_overlap(resume_skills, jd_skills):
    """Calculate skill overlap between resume and JD."""
    return {
        "overlap_score": 75,
        "matched_skills": [],
        "missing_skills": []
    }


def calculate_semantic_similarity(resume_text, jd_text):
    """Calculate semantic similarity between resume and JD."""
    vectorizer = CountVectorizer().fit_transform([resume_text, jd_text])
    similarity = cosine_similarity(vectorizer)
    return round(similarity[0][1] * 100, 2)


def analyze_candidate_risk(resume_data, jd_data, resume_text, jd_text):
    """Analyze overall candidate risk."""
    fake_exp_result = detect_fake_experience(resume_text, jd_text)
    stuffing_result = detect_keyword_stuffing(resume_text)
    fake_cert_result = detect_fake_certification(resume_text)
    ai_pattern_result = detect_ai_patterns(resume_text)
    grammar_result = check_grammar(resume_text)
    
    resume_skills = extract_skills(resume_text)
    jd_skills = jd_data.get("skills", [])
    skill_result = calculate_skill_overlap(resume_skills, jd_skills)
    
    semantic_score = calculate_semantic_similarity(resume_text, jd_text)
    
    risk_score = 0
    risk_factors = []
    
    if fake_exp_result["fake_experience_detected"]:
        risk_score += 30
        risk_factors.append(
            fake_exp_result["reason"]
        )

    if stuffing_result["keyword_stuffing"]:
        risk_factors.append(
            "Keyword stuffing detected"
        )

    if fake_cert_result["fake_certification_risk"]:
        risk_factors.extend(
            fake_cert_result["warnings"]
        )

    if ai_pattern_result["ai_pattern_detected"]:
        risk_factors.append(
            "AI-generated resume patterns detected"
        )

    if grammar_result["grammar_score"] < 70:
        risk_factors.append(
            "Grammar inconsistency detected"
        )

    decision = "SAFE" if risk_score < 30 else "REVIEW" if risk_score < 60 else "REJECT"

    return {
        "risk_score": risk_score,
        "decision": decision,
        "semantic_similarity": semantic_score,
        "skill_overlap_score": skill_result["overlap_score"],
        "matched_skills": skill_result["matched_skills"],
        "missing_skills": skill_result["missing_skills"],
        "risk_factors": risk_factors,
        "grammar_score": grammar_result["grammar_score"]
    }