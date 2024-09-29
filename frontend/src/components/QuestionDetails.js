// QuestionDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData as getQuestions } from '../services/api';
import { Container, Card, Button } from 'react-bootstrap';
import './QuestionDetails.css'; 

const QuestionDetails = () => {
  const { id } = useParams(); // Get the question ID from the URL params
  const [question, setQuestion] = useState(null);
  const navigate = useNavigate();

  // Fetch the selected question from the API or state
  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const questions = await getQuestions(); // Fetch all questions
        const selectedQuestion = questions.find((q) => q.id === id); // Find the question by ID
        setQuestion(selectedQuestion);
      } catch (error) {
        console.error('Error fetching question details:', error);
      }
    };
    fetchQuestionDetails();
  }, [id]);

  // If no question is found, show a message
  if (!question) {
    return (
      <Container>
        <h3>Question not found</h3>
        <Button onClick={() => navigate('/')}>Back to List</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{question.title}</Card.Title>
          <Card.Text>
            <strong>Description: </strong>{question.description}
          </Card.Text>
          <Card.Text>
            <strong>Category: </strong>{question.category}
          </Card.Text>
          <Card.Text>
            <strong>Complexity: </strong>{question.complexity}
          </Card.Text>
          <Button variant="primary" onClick={() => navigate('/')}>
            Back to List
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default QuestionDetails;

