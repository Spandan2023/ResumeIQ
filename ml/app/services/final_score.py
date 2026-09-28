def calculate_final_score(skill_score: float, text_similarity: float) -> float:
    final_score = (skill_score * 0.70) + (text_similarity * 0.30)

    return round(final_score, 2)