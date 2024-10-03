import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import AddQuestion from './components/AddQuestion';
import EditQuestion from './components/EditQuestion';
import QuestionDetails from './components/QuestionDetails';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SelectComplexityPage from './pages/SelectComplexityPage';

function App() {
  return (
    <Router>
      <div className="w-full h-[65px] px-4 bg-[#282828] flex justify-between items-center">
        <div className="text-white text-xl font-bold">App Name</div>
        <div className="w-10 h-10 bg-[#d9d9d9] rounded-full"></div>
      </div>
        
        {/* Main Content */}
        <main className="flex-grow">
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/complexity" element={<SelectComplexityPage />} />
            <Route path="/questions" element={<QuestionList />} />
            <Route path="/add" element={<AddQuestion />} />
            <Route path="/edit/:id" element={<EditQuestion />} />
            <Route path="/questions/:id" element={<QuestionDetails />} />
          </Routes>
        </main>
      {/* </div> */}
    </Router>
  );
}

export default App;
