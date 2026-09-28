from app.services.skills import extract_skills


jd_text = """
We are looking for a Full Stack Developer with experience in
React.js, Node.js, Express.js, MongoDB, JavaScript and Git.
Knowledge of Python and Machine Learning is a plus.
"""


skills = extract_skills(jd_text)

print("\n--- JD SKILLS ---\n")
print(skills)