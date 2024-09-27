import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import api from "../api";

const QuestionForm = ({ questionId }) => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    id: '',
    title: '',
    description: '',
    category: [],
    complexity: '',
  });

    useEffect(() => {
      if (questionId) {
        const fetchQuestion = async () => {
          try {
            const response = await api.get(`/questions?id=${questionId}`);
            const existingQuestion = response.data;
            console.log(existingQuestion)
            if (existingQuestion) {
              setQuestion({
                title: existingQuestion.question.questionTitle,
                description: existingQuestion.question.questionDescription,
                category: existingQuestion.question.questionCategory,
                complexity: existingQuestion.question.questionComplexity,
              });
            }
          } catch (error) {
            console.error("Error fetching question:", error);
          }
        };
        fetchQuestion();
      }
    }, [questionId]);

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const questionData = {
        title: question.title,
        desc: question.description,
        c: question.category,
        d: question.complexity.toLowerCase(),
      };
    
    try {
      if (questionId) {
        //update question
        await api.put(`/questions?id=${questionId}`, questionData);
      } else {
        //create a new question
        console.log(questionData);
        await api.post("/questions", questionData);
      }
        navigate("/");
    } catch (error) {
        console.error("Error saving question:", error);
    }
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
