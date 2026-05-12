import re
import uuid
import spacy
from SkillsExtractor import extract_skills

from skills_db import (
    TECHNICAL_SKILLS,
    SOFT_SKILLS,
    TOOLS
)

nlp = spacy.load("en_core_web_sm")


def extract_email(text):
    emails = re.findall(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}",
        text
    )

    return emails[0] if emails else ""


def extract_phone(text):
    phones = re.findall(
        r"\+?\d[\d -]{8,12}\d",
        text
    )

    return phones[0] if phones else ""


def extract_name(text):
    doc = nlp(text)

    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text

    return ""


def extract_skills(text):
    text = text.lower()

    technical = []
    soft = []
    tools = []

    for skill in TECHNICAL_SKILLS:
        if skill.lower() in text:
            technical.append(skill)

    for skill in SOFT_SKILLS:
        if skill.lower() in text:
            soft.append(skill)

    for tool in TOOLS:
        if tool.lower() in text:
            tools.append(tool)

    return technical, soft, tools


def build_json(text):

    technical, soft, tools = extract_skills(text)

    data = {
        "candidate_id": str(uuid.uuid4()),
        "resume_id": str(uuid.uuid4()),

        "personal_information": {
            "full_name": extract_name(text),
            "email": extract_email(text),
            "phone": extract_phone(text),
            "location": "",
            "linkedin": "",
            "github": ""
        },

        "education": [],

        "experience": {
            "total_experience_years": 0,

            "experience_details": []
        },

        "skills": {
        "technical_skills": extract_skills(text),
        "soft_skills": [],
        "tools_and_technologies": []
    },

        "projects": [],

        "certifications": []
    }

    return data