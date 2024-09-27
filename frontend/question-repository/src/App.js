import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import AddQuestion from './components/AddQuestion';
import EditQuestion from './components/EditQuestion';

function App() {
  return (
    <Router>
      <div>
        <h1>App Component</h1> {/* Add this line */}
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="/add" element={<AddQuestion />} />
          <Route path="/edit/:id" element={<EditQuestion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
