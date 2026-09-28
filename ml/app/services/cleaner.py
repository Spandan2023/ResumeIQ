import re


def clean_text(text: str) -> str:
    """
    Clean extracted resume or job-description text.
    """

    # Convert everything to lowercase
    text = text.lower()

    # Replace line breaks and tabs with spaces
    text = re.sub(r"\s+", " ", text)

    # Remove unnecessary spaces around punctuation
    text = re.sub(r"\s+([,.;:])", r"\1", text)

    # Remove leading/trailing spaces
    text = text.strip()

    return text