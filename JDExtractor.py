import re

from SkillsExtractor import extract_skills


# -----------------------------------
# Extract Experience From JD
# -----------------------------------

def extract_jd_experience(text):

    pattern = r'(\d+)\s*(?:year|years|yr|yrs)'

    match = re.search(pattern, text.lower())

    if match:
        return int(match.group(1))

    return 0


# -----------------------------------
# Build JD JSON
# -----------------------------------

def build_jd_json(text):

    skills = extract_skills(text)

    required_experience = (
        extract_jd_experience(text)
    )

    return {
        "skills": skills,
        "required_experience": required_experience
    }