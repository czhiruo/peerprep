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
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    // Redirect to the login page
    window.location.href = '/login';
  };

  return (
    <Router>
      {/* Header */}
      <div className="w-full h-[65px] px-4 bg-[#282828] flex justify-between items-center">
        <div className="text-white text-xl font-bold">App Name</div>
        {/* Avatar with Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {/* Replace the src with the path to your avatar image */}
              <img src="https://avatar.iran.liara.run/public" alt="avatar" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-gray-600 rounded-box w-52"
          >
            <li>
              <a onClick={handleLogout} className='text-white no-underline'>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<PrivateRoute><SelectComplexityPage /></PrivateRoute>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/questions"
            element={
              <AdminRoute>
                <QuestionList />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

const Logout = () => {
  localStorage.removeItem('accessToken');
  console.log('logout');
  return <LoginPage />;
};

export default App;
