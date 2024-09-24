import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import QuestionChart from './QuestionChart';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    console.log('Stored Questions:', storedQuestions); // Add this line
    setQuestions(storedQuestions);
  }, []);

  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  return (
    <Container>
      <h2 className="my-4">Question Repository</h2>
      <Link to="/add" className="btn btn-primary mb-3">Add New Question</Link>

      {/* Add the chart above the question list */}
      <QuestionChart />

      <Row>
        {questions.map((question) => (
          <Col md={4} key={question.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{question.title}</Card.Title>
                <Card.Text>{question.description}</Card.Text>
                <Card.Text><strong>Category:</strong> {question.category}</Card.Text>
                <Card.Text><strong>Complexity:</strong> {question.complexity}</Card.Text>
                <Button variant="outline-primary" as={Link} to={`/edit/${question.id}`}>Edit</Button>
                <Button variant="outline-danger" className="ml-2" onClick={() => deleteQuestion(question.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default QuestionList;
