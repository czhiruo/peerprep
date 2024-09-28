import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData, deleteData } from "../services/api";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getData("/");
        console.log(response);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const deleteQuestion = async (id) => {
    try {
        await deleteData(`/:${id}`)
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
          <li key={item._id}>
            <h3>{item.question.questionTitle}</h3>
            <p>{item.question.questionDescription}</p>
            <p>
              <strong>Category: </strong>
              {/* Checks if question belongs to more than one category */}
              {Array.isArray(item.question.questionCategory)
                ? item.question.questionCategory.join(", ")
                : item.question.questionCategory}
            </p>
            <p>
              <strong>Complexity:</strong> {item.question.questionComplexity}
            </p>
            <Link to={`/edit/${item._id}`}>Edit</Link>
            <button onClick={() => deleteQuestion(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
