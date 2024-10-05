import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { getData, deleteData } from "../services/questionService";
import './QuestionList.css'; // Custom CSS for QuestionList

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getData("/");
        setQuestions(response);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);
  		
  const deleteQuestion = async (id) => {
    try {
        await deleteData(`/${id}`);
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
    } catch (error) {
        console.error("Error deleting question:", error);
    }
  };

  const handleQuestionClick = (id) => {
	  navigate(`/questions/${id}`);
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Question Repository</h2>
      <Link to="/add" className="btn btn-primary mb-3">Add New Question</Link>
      <Row>
        {questions.map((question) => (
          <Col md={4} key={question.id} className="mb-4">
            <Card className="question-card shadow-sm" onClick={() => handleQuestionClick(question.id)}>
              <Card.Body>
                <Card.Title>{question.title}</Card.Title>
                <Card.Text><strong>Category:</strong> {question.c.join(', ')}</Card.Text>
                <Card.Text><strong>Complexity:</strong> {question.d}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-primary" as={Link} to={`/edit/${question.id}`} onClick={(e) => e.stopPropagation()}>Edit</Button>
                  <Button variant="outline-danger" onClick={(e) => {e.stopPropagation(); deleteQuestion(question.id)}}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
   );
};
export default QuestionList;
