import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import AddQuestion from './components/AddQuestion';
import EditQuestion from './components/EditQuestion';
import QuestionChart from './components/QuestionChart';
import QuestionForm from './components/QuestionForm';
import QuestionDetails from './components/QuestionDetails';

function App() {
  return (
    <Router>
      <div>
        <h1>CS3219 Group Project - Milestone 2</h1> {/* Add this line */}
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="/add" element={<AddQuestion />} />
          <Route path="/edit/:id" element={<EditQuestion />} />
		  <Route path="/questions/:id" element={<QuestionDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
