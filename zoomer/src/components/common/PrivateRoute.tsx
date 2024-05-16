import React, { useEffect, useState, ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import AuthService from '../../services/AuthService';

interface PrivateRouteProps extends RouteProps {
  component: ComponentType<any>;
  adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  adminOnly = false,
  ...rest
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = () => {
      const userAuthenticated = AuthService.isAuthenticated();
      setIsAuthenticated(userAuthenticated);

      if (userAuthenticated) {
        const adminStatus = AuthService.isAdmin();
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
