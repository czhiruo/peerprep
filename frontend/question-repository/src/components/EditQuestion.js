import React from 'react';
import QuestionForm from './QuestionForm';
import { useParams } from 'react-router-dom';

const EditQuestion = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Edit Question</h2>
      <QuestionForm questionId={id} />
    </div>
  );
};

export default EditQuestion;

