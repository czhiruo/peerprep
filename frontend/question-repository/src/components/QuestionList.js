import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "../api";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get("/api/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const deleteQuestion = async (id) => {
    try {
        await api.delete(`/api/questions?id=${id}`);
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
    } catch (error) {
        console.error("Error deleting question:", error);
    }
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
