import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData, deleteData } from "../services/api";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

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

  return (
    <div>
      <h2>Question Repository</h2>
      <Link to="/add">Add New Question</Link>
      <ul>
        {questions.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <p>
              <strong>Category: </strong>
              {/* Checks if question belongs to more than one category */}
              {item.c.join(", ")}
            </p>
            <p>
              <strong>Complexity:</strong> {item.d}
            </p>
            <Link to={`/edit/${item.id}`}>Edit</Link>
            <button onClick={() => deleteQuestion(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
