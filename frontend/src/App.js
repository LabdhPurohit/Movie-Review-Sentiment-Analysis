import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MessageSquare, Trash2, BarChart2 } from 'lucide-react';

function App() {
  const [review, setReview] = useState("");
  const [prediction, setPrediction] = useState(null);
  // eslint-disable-next-line
  const [confidence, setConfidence] = useState(null);
  const [positiveConfidence, setPositiveConfidence] = useState(null);
  const [negativeConfidence, setNegativeConfidence] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("reviewHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const clearText = () => {
    setReview("");
    setPrediction(null);
    setConfidence(null);
    setPositiveConfidence(null);
    setNegativeConfidence(null);
  }

  const analyzeSentiment = async (e) => {
    e.preventDefault();
    if (!review.trim()) {
      alert("Please enter a review before submitting!");
      return;
    }
    const response = await fetch("http://127.0.0.1:8000/analyze/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review }),
    });

    const data = await response.json();

    if (data.error) {
      setPrediction("Not a valid review");
      setConfidence("");
      setPositiveConfidence("");
      setNegativeConfidence("");
      return;
    }

    setPrediction(data.prediction);
    setConfidence((data.confidence * 100).toFixed(2));
    setPositiveConfidence((data.labels.positive.confidence * 100).toFixed(2));
    setNegativeConfidence((data.labels.negative.confidence * 100).toFixed(2));


    const newHistory = [...history, {
      review,
      prediction: data.prediction,
      confidence: (data.confidence * 100).toFixed(2),
      positiveConfidence: (data.labels.positive.confidence * 100).toFixed(2),
      negativeConfidence: (data.labels.negative.confidence * 100).toFixed(2),
    }];
    setHistory(newHistory);
    localStorage.setItem("reviewHistory", JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("reviewHistory");
   
  };

  return (
    <div className="gradient-bg min-vh-100 py-5">
      <Container>
        <h1 className="section-title d-flex align-items-center justify-content-center">
          <BarChart2 className="me-2" size={32} />
          Movie Review Sentiment Analyzer
        </h1>

        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="glass-card p-4 mb-5">
              <Form onSubmit={analyzeSentiment}>
                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"

                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Enter your movie review..."
                    className="custom-textarea"
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button type="submit" className="custom-button">
                    <MessageSquare size={18} className="me-2" />
                    Analyze Sentiment
                  </Button>
                  <Button type="button" onClick={clearText} className="custom-button ms-3">
                    <Trash2 size={18} className="me-2" />
                    Clear
                  </Button>
                </div>
              </Form>

              {prediction && (
                <div className="mt-4 text-center text-white">
                  <h3 className="mb-4">
                    Sentiment: <span className="text-uppercase">{prediction}</span>
                  </h3>
                  <Row className="justify-content-center">
                    <Col xs={6} md={4}>
                      <div className="confidence-container mb-3">
                        <CircularProgressbar
                          value={Number(positiveConfidence)}
                          text={`${positiveConfidence}%`}
                          styles={buildStyles({
                            textColor: '#fff',
                            pathColor: '#00ff00',
                            trailColor: 'rgba(255, 255, 255, 0.2)'
                          })}
                        />
                        <p className="mt-2">Positive</p>
                      </div>
                    </Col>
                    <Col xs={6} md={4}>
                      <div className="confidence-container mb-3">
                        <CircularProgressbar
                          value={Number(negativeConfidence)}
                          text={`${negativeConfidence}%`}
                          styles={buildStyles({
                            textColor: '#fff',
                            pathColor: '#ff4757',
                            trailColor: 'rgba(255, 255, 255, 0.2)'
                          })}
                        />
                        <p className="mt-2">Negative</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          </Col>
        </Row>

       
        <Row className="justify-content-center mt-5">
          <Col md={10}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="section-title m-0">Analysis History</h2>
              {history.length > 0 && (
                <Button variant="danger" className="custom-button" onClick={clearHistory}>
                  <Trash2 size={18} className="me-2" />
                  Clear History
                </Button>
              )}
            </div>
            
            {history.length === 0 ? (
              <p className="text-center text-secondary">No history available.</p>
            ) : (
              <Row>
                {history.map((item, index) => (
                  <Col key={index} lg={6} className="mb-4">
                    <Card className="history-card h-100">
                      <Card.Body>
                        <Card.Title className="d-flex justify-content-between">
                          <span className="text-uppercase">{item.prediction}</span>
                          <span className="text-secondary">{item.confidence}%</span>
                        </Card.Title>
                        <Card.Text className="text-secondary mb-3">{item.review}</Card.Text>
                        <Row>
                          <Col xs={6}>
                            <div className="text-center">
                              <small className="d-block text-success mb-1">Positive</small>
                              <strong>{item.positiveConfidence}%</strong>
                            </div>
                          </Col>
                          <Col xs={6}>
                            <div className="text-center">
                              <small className="d-block text-danger mb-1">Negative</small>
                              <strong>{item.negativeConfidence}%</strong>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
