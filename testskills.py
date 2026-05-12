from SkillsExtractor import extract_skills

text = """
Experienced Machine Learning Engineer with Python,
TensorFlow, FastAPI, MongoDB and NLP expertise.
"""

skills = extract_skills(text)

print(skills)