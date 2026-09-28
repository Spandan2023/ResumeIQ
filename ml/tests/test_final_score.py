from app.services.final_score import calculate_final_score


skill_score = 80

text_similarity = 0.6591

text_similarity_percent = text_similarity * 100

final_score = calculate_final_score(
    skill_score,
    text_similarity_percent
)

print("\n--- FINAL MATCH SCORE ---")
print(f"{final_score}%")
