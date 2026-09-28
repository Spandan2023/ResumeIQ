from app.services.similarity import calculate_similarity


resume_text = """
I am a full stack developer with experience in React,
Node.js, Express.js and MongoDB. I also work with JavaScript
and build web applications.
"""

jd_text = jd_text = """
We are looking for a financial accountant with experience
in auditing, taxation, balance sheets and financial reporting.
The candidate should understand accounting principles.
"""


similarity = calculate_similarity(resume_text, jd_text)

print("\n--- TEXT SIMILARITY ---")
print(similarity)

print("\n--- TEXT SIMILARITY (%) ---")
print(f"{similarity * 100:.2f}%")