import React from 'react';
import QuestionForm from './QuestionForm';
import {updateData as editQuestion} from "../services/questionService";
import { useParams, useNavigate } from 'react-router-dom';

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (updatedQuestionData) => {
    try {
      await editQuestion(id, updatedQuestionData); // Use the editQuestion API function
      navigate('/'); // Navigate to home page after successful edit
    } catch (error) {
      console.error("Error editing question", error);
    }
  };

	return (
    <div>
      <h2>Edit Question</h2>
      <QuestionForm questionId={id} onSubmit={handleSubmit} />
    </div>
  	);
};

export default EditQuestion;

