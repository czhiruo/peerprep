import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const QuestionForm = ({ questionId }) => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    id: '',
    title: '',
    description: '',
    category: '',
    complexity: '',
  });

  useEffect(() => {
    if (questionId) {
      const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
      const existingQuestion = storedQuestions.find((q) => q.id === questionId);
      if (existingQuestion) {
        setQuestion(existingQuestion);
      }
    }
  }, [questionId]);

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];

    if (questionId) {
      const updatedQuestions = storedQuestions.map((q) =>
        q.id === questionId ? question : q
      );
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    } else {
      question.id = Date.now().toString();
      storedQuestions.push(question);
      localStorage.setItem('questions', JSON.stringify(storedQuestions));
    }
    navigate('/');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Question Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={question.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Question Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={question.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label>Question Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={question.category}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formComplexity">
          <Form.Label>Question Complexity</Form.Label>
          <Form.Control
            as="select"
            name="complexity"
            value={question.complexity}
            onChange={handleChange}
            required
          >
            <option value="">Select Complexity</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          {questionId ? 'Update' : 'Add'} Question
        </Button>
      </Form>
    </Container>
  );
};

export default QuestionForm;
