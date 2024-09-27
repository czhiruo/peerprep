import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  // Mock data fetching
  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setQuestions(storedQuestions);
  }, []);

  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  return (
    <div>
      <h2>Question Repository</h2>
      <Link to="/add">Add New Question</Link>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h3>{question.title}</h3>
            <p>{question.description}</p>
            <p>
              <strong>Category:</strong> {question.category}
            </p>
            <p>
              <strong>Complexity:</strong> {question.complexity}
            </p>
            <Link to={`/edit/${question.id}`}>Edit</Link>
            <button onClick={() => deleteQuestion(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
