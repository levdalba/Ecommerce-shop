import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const PrivateRoute = ({ component: Component, adminOnly, ...rest }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userAuthenticated = AuthService.isAuthenticated();
      setIsAuthenticated(userAuthenticated);

      if (userAuthenticated) {
        const adminStatus = await AuthService.isAdmin();
        setIsAdmin(adminStatus);
      }

      setLoading(false);
    };
    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          adminOnly ? (
            isAdmin ? (
              <Component {...props} />
            ) : (
              <Redirect to="/user/dashboard" />
            )
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
