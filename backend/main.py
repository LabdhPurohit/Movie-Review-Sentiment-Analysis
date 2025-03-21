import cohere
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import re

app = FastAPI()
co = cohere.Client("8aOV9Wb41G9leAw61Uwd3xsuBiHWCWP9eygR1zZy")


class ReviewRequest(BaseModel):
    review: str


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def is_valid_review(text):
    if text.isdigit():
        return False
    if len(text.split()) == 1:
        return False
    if not re.search(r"[aeiouAEIOU]", text):
        return False
    return True

@app.post("/analyze/")
async def analyze_review(request: ReviewRequest):
    if not is_valid_review(request.review):
        return {"error": "Not a review"}

    response = co.classify(
        model='bde923c4-c1a2-4712-aee2-0c8841eb5592-ft',
        inputs=[request.review])
    return response.classifications[0]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
