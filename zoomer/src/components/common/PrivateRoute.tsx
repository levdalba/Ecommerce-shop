import React from 'react';
import AuthService from '../../services/AuthService';
import {
  
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  roles,
  ...rest
}) => {
  const isAuthenticated = AuthService.isAuthenticated(); // Checks if the user is authenticated
  const userRole = AuthService.getUserRole(); // Retrieves the user's role from the AuthService

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          // Redirect to the login page if not authenticated
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }

        // Check for role authorization if roles are defined
        if (roles && !roles.includes(userRole)) {
          // Redirect to the unauthorized page if not authorized
          return <Redirect to={{ pathname: '/unauthorized' }} />;
        }

        // Render component if authenticated and authorized
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
