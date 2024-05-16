import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import { CartProvider } from './components/Cart/Cartprovider';
import Store from './pages/Store';
import About from './pages/About';
import CartPage from './components/Cart/Cartpage';
import ProductPage from './pages/Productpage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import PrivateRoute from './components/common/PrivateRoute';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import UserProfile from './components/user/UserProfile';
import UserSettings from './components/user/UserSettings';
import AuthService from './services/AuthService';

const theme = createTheme({
  palette: {
    background: {
      paper: '#ffffff',
    },
  },
});

const App: React.FC = () => {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Container>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/store" component={Store} />
              <Route path="/about" component={About} />
              <Route path="/cart" component={CartPage} />
              <Route path="/products/:productId" component={ProductPage} />
              <PrivateRoute path="/user/dashboard" component={UserDashboard} />
              <PrivateRoute path="/user/profile" component={UserProfile} />
              <PrivateRoute path="/user/settings" component={UserSettings} />
              <PrivateRoute
                path="/admin/dashboard"
                component={AdminDashboard}
                adminOnly
              />
              <Route path="*">
                {AuthService.isAuthenticated() ? (
                  <Redirect to="/" />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
            </Switch>
          </Container>
        </Router>
      </ThemeProvider>
    </CartProvider>
  );
};

export default App;
