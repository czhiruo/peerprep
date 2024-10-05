import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, verifyToken } from '../services/userService';

// This component will check if the user is logged in 
// Either renders the protected component or redirects them to the login page.
const PrivateRoute = ( {children} ) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // `null` means still loading

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = getToken();

      // If no token, set to not authenticated
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // Verify the token asynchronously
        const isValid = await verifyToken(token);

        // Set authentication state based on the token's validity
        setIsAuthenticated(isValid);
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []); // Empty dependency array ensures this runs once on mount

  // Render a loading state while the authentication check is happening
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (protected component)
  return children;

}

export default PrivateRoute;
