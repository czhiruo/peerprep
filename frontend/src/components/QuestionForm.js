import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { getData, updateData, addData } from '../services/api';
import './QuestionForm.css';

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
            const existingQuestion = await getData(`/${questionId}`);
            if (existingQuestion) {
              setQuestion({
                title: existingQuestion.title,
                description: existingQuestion.desc,
                category: existingQuestion.c,
                complexity: existingQuestion.d,
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
  const { name, value } = e.target;
  if (name === "category") {
    setQuestion({
      ...question,
      category: value.split(", "),
    });
  } else {
    setQuestion({ ...question, [name]: value });
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

      const questionData = {
        title: question.title,
        desc: question.description,
        c: question.category,
        d: question.complexity,
      };
    
    try {
      if (questionId) {
        //update question
        await updateData(`/${questionId}`, questionData);
      } else {
        //create a new question
        await addData("/", questionData);
      }
        navigate("/");
    } catch (error) {
        console.error("Error saving question:", error);
    }
  };
  return (
    <Container className="mt-4">
      <h3 className="mb-4">{questionId ? 'Edit Question' : 'Add New Question'}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Question Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={question.title}
            onChange={handleChange}
            required
            placeholder="Enter the title of the question"
          />
        </Form.Group>
        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Question Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={question.description}
            onChange={handleChange}
            required
            placeholder="Describe the question in detail"
          />
        </Form.Group>
        <Form.Group controlId="formCategory" className="mt-3">
          <Form.Label>Question Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={question.category}
            onChange={handleChange}
            required
            placeholder="Enter the category of the question"
          />
        </Form.Group>
        <Form.Group controlId="formComplexity" className="mt-3">
          <Form.Label>Question Complexity</Form.Label>
          <Form.Control
            as="select"
            name="complexity"
            value={question.complexity}
            onChange={handleChange}
            required
          >
            <option value="">Select Complexity</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          {questionId ? 'Update Question' : 'Add Question'}
        </Button>
      </Form>
    </Container>
  );
};

export default QuestionForm;
