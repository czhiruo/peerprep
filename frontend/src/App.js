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
          <Route
            path="/"
            element={
              <PrivateRoute>
                <SelectComplexityPage />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset" element={<RequestResetPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route
            path="/questions"
            element={
              <AdminRoute>
                <QuestionList />
              </AdminRoute>
            }
          />
          <Route
            path="/questions/add"
            element={
              <AdminRoute>
                <AddQuestion />
              </AdminRoute>
            }
          />
          <Route
            path="/questions/edit/:id"
            element={
              <AdminRoute>
                <EditQuestion />
              </AdminRoute>
            }
          />
          <Route
            path="/questions/:id"
            element={
              <AdminRoute>
                <QuestionDetails />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
