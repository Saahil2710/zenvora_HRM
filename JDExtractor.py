from SkillsExtractor import extract_skills

from ExperienceExtractor import (
    extract_experience
)


def build_jd_json(text):

    technical, soft, tools = (
        extract_skills(text)
    )

    experience = (
        extract_experience(text)
    )

    all_skills = list(

        set(
            technical + soft + tools
        )
    )

    return {

        "skills": all_skills,

        "required_experience": (

            experience.get(
                "total_experience_years",
                0
            )
        )
    }