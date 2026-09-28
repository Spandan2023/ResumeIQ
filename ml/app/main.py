from fastapi import FastAPI

app = FastAPI(
    title="ResumeIQ ML Service",
    description="NLP and ML service for ResumeIQ",
    version="1.0.0"
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "resumeiq-ml"
    }