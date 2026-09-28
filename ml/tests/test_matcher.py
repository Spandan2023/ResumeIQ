from app.services.matcher import compare_skills


resume_skills = [
    "python",
    "javascript",
    "java",
    "react",
    "node.js",
    "express.js",
    "mongodb",
    "git",
    "machine learning"
]

jd_skills = [
    "python",
    "javascript",
    "react",
    "node.js",
    "express.js",
    "mongodb",
    "git",
    "machine learning",
    "docker",
    "aws"
]


result = compare_skills(resume_skills, jd_skills)

print("\n--- MATCHED SKILLS ---")
print(result["matched"])

print("\n--- MISSING SKILLS ---")
print(result["missing"])