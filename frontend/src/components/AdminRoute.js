import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, isUserAdmin, verifyToken } from '../services/userService';

// This component will check if the user logged in is an admin
// Either renders the protected component or redirects them to the login page.
const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Admin status state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function checkAdminStatus() {
      const token = getToken();
      
      // No token, redirect to login
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      try {
        // Verify token and check admin status
        const isTokenValid = await verifyToken(token);
        const adminStatus = await isUserAdmin(token);

        if (isTokenValid && adminStatus) {
          setIsAuthenticated(true);
          setIsAdmin(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
        setIsAuthenticated(false);
      } finally {
        // Stop the loading indicator regardless of success/failure
        setLoading(false);
      }
    }

    checkAdminStatus();
  }, []); // Empty dependency array to run only once on component mount

  if (loading) {
    return <div>Loading...</div>; // Replace with a loading spinner if desired
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }

  // If authenticated and an admin, render the protected children
  return children;
}

export default AdminRoute
