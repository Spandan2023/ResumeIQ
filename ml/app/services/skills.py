import json
import re
from pathlib import Path


SKILLS_FILE = Path(__file__).resolve().parent.parent / "data" / "skills.json"


def load_skill_dictionary():
    with open(SKILLS_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def extract_skills(text: str) -> list[str]:
    skills = load_skill_dictionary()

    found_skills = []

    for canonical_skill, variations in skills.items():
        for variation in variations:
            pattern = r"\b" + re.escape(variation.lower()) + r"\b"

            if re.search(pattern, text.lower()):
                found_skills.append(canonical_skill)
                break

    return found_skills