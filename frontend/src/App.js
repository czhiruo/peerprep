import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import AddQuestion from './components/AddQuestion';
import EditQuestion from './components/EditQuestion';
import QuestionDetails from './components/QuestionDetails';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import RequestResetPasswordPage from './pages/RequestResetPasswordPage';
import SignUpPage from './pages/SignUpPage';
import SelectComplexityPage from './pages/SelectComplexityPage';
import SelectLanguagePage from './pages/SelectLanguagePage';
import SelectTopicPage from './pages/SelectTopicPage';
import MatchingPage from './pages/MatchingPage';
import MatchedPage from './pages/MatchedPage';
import MatchingFailedPage from './pages/MatchingFailedPage';
import HistoryPage from './pages/HistoryPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/topic" element={<PrivateRoute><SelectTopicPage /></PrivateRoute>} />
          <Route path="/complexity" element={<PrivateRoute><SelectComplexityPage /></PrivateRoute>} />
          <Route path="/language" element={<PrivateRoute><SelectLanguagePage /></PrivateRoute>} />
          <Route path="/matching" element={<PrivateRoute><MatchingPage /></PrivateRoute>} />
          <Route path="/matched" element={<PrivateRoute><MatchedPage /></PrivateRoute>} />
          <Route path="/failed" element={<PrivateRoute><MatchingFailedPage /></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} />
          <Route path="/questions" element={<AdminRoute><QuestionList /></AdminRoute>} />
          <Route path="/questions/add" element={<AdminRoute><AddQuestion /></AdminRoute>} />
          <Route path="/questions/edit/:id" element={<AdminRoute><EditQuestion /></AdminRoute>} />
          <Route path="/questions/:id" element={<AdminRoute><QuestionDetails /></AdminRoute>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
