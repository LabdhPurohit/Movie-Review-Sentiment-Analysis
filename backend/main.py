import cohere
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import re

app = FastAPI()
co = cohere.Client("8aOV9Wb41G9leAw61Uwd3xsuBiHWCWP9eygR1zZy")

# Define request model
class ReviewRequest(BaseModel):
    review: str

# Allow frontend to call FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (For production, restrict this)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to check if input is a valid review
def is_valid_review(text):
    # Check if it's just a number
    if text.isdigit():
        return False
    # Check if it contains only a name (single word)
    if len(text.split()) == 1:
        return False
    # Check if it contains gibberish (no vowels, random letters)
    if not re.search(r"[aeiouAEIOU]", text):
        return False
    return True

@app.post("/analyze/")
async def analyze_review(request: ReviewRequest):
    # prompt = f"Analyze the sentiment and confidence score of this movie review: '{request.review}' and Write like this example: 'Sentiment-positive Score-95' and if its a blank space or numbers then write Not a review"
    
    # response = co.generate(
    #     model="command",  
    #     prompt=prompt,
    #     max_tokens=10,  
    #     temperature=0.5, 
    # )

    # sentiment = response.generations[0].text.strip().lower()  
    # if sentiment == "not a review":
    #     return {"error": "Not a review"}
    if not is_valid_review(request.review):
        return {"error": "Not a review"}

    response = co.classify(
        model='bde923c4-c1a2-4712-aee2-0c8841eb5592-ft',
        inputs=[request.review])
    return response.classifications[0]
    # print(sentiment, type(sentiment))
    # ll = sentiment.split("-")  
    # sentiment = ll[1].split()[0].rstrip(",") 
    # score = ll[2].split()[0].rstrip(",")
    # return {"sentiment": sentiment.capitalize(), "score": score+"%"}


@app.get("/")
def read_root():
    return {"Hello": "World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
