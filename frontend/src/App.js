import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SignUpPage from './pages/SignUpPage';
import SelectComplexityPage from './pages/SelectComplexityPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

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
            {/* <Route path="/" element={<PrivateRoute><SelectComplexityPage /></PrivateRoute>} /> */}
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/complexity" element={<SelectComplexityPage />} />
            <Route path="/reset" element={<ResetPasswordPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/questions" element={<AdminRoute><QuestionList /></AdminRoute>} />
          </Routes>
        </main>
      {/* </div> */}
    </Router>
  );
}

const Logout = () => {
  localStorage.removeItem('accessToken');
  console.log('logout')
  return <LoginPage />;
}

export default App;
