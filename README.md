# Movie Review Sentiment Analysis

## 🚀 Live Site
- **Link:** [review-sentiment-analysis](https://review-sentiment-analysis-ashy.vercel.app/)

## 📌 About the Project
This project was developed as part of the **Elastiq AI assessment** to perform **sentiment analysis on movie reviews** using **Cohere's fine-tuned Classify model**. Users can enter a movie review, and the system will predict whether it is **positive** or **negative**.

## 🛠 Technologies Used
- **Frontend:** React, Bootstrap, Lucide React
- **Backend:** FastAPI (Python), Uvicorn
- **Machine Learning Model:** Cohere Classify (Fine-tuned with IMDB dataset)
- **Dataset:** [IMDB Dataset of 50K Movie Reviews](https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews)
- **Deployment:**
  - **Backend:** Deployed on Railway
  - **Frontend:** Deployed on Vercel
- **Containerization:** Docker (Dockerfile for both frontend & backend, docker-compose for deployment)

## 🎯 Features
- Sentiment analysis using Cohere AI
- Optional task completed: List of analyzed sentiments (stored in React LocalStorage)
- Responsive UI with Bootstrap & Lucide React
- Fully containerized application

## 📥 Installation Using Docker

1. **Clone the repository:**
   ```sh
   git clone https://github.com/LabdhPurohit/Movie-Review-Sentiment-Analysis.git
   cd Movie-Review-Sentiment-Analysis
   ```

2. **Build and run using Docker Compose:**
   ```sh
   docker-compose build
   docker-compose up
   ```

3. **Access the application in your browser:**
   ```sh
   http://localhost:3000  # Replace with actual frontend port
   ```

## 📸 Screenshots
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="https://raw.githubusercontent.com/LabdhPurohit/Movie-Review-Sentiment-Analysis/refs/heads/main/demo-imgs/demo.png" width="900">
  <img src="https://raw.githubusercontent.com/LabdhPurohit/Movie-Review-Sentiment-Analysis/refs/heads/main/demo-imgs/demo2.png" width="900">
</div>

## 🏗 Implementation Approach
1. **Frontend:** React UI for user input & result display
2. **Backend:** FastAPI API communicating with Cohere
3. **Model Integration:** Fine-tuned Cohere Classify model for review sentiment analysis
4. **Storage:** React LocalStorage to store analyzed sentiments
5. **Containerization:** Dockerized frontend & backend for easy deployment

## 🔥 Potential Improvements
- **Multilingual Support**: Analyze reviews in different languages  
- **More Sentiment Categories**: Expand beyond positive/negative (e.g., joy, anger, sadness)  
- **Performance Optimization**: Implement caching for faster responses  
- **Advanced NLP Features**: Show sentiment confidence scores or explainability insights  
- **UI Enhancements**: Add animations, word clouds, or real-time updates  

## ⚙️ Notes
- No authentication required
- Uses best coding practices with modular architecture
- Deployed & tested successfully

---
Feel free to contribute to this project or report any issues! 🚀
