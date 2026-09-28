from app.services.parser import extract_text_from_pdf
from app.services.cleaner import clean_text
from app.services.skills import extract_skills

pdf_path = r"C:\Users\Spandan\OneDrive\Documents\Spandan_GT_Resume.pdf"

text = extract_text_from_pdf(pdf_path)

cleaned_text = clean_text(text)

skills = extract_skills(cleaned_text)

print("\n--- DETECTED SKILLS ---\n")
print(skills)
print("\n--- CLEANED TEXT ---\n")
print(cleaned_text)