import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import { About } from './pages/About';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home';
import { Store } from './Store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CartPage from './components/Cart/Cartpage';
import ProductPage from './components/ProductCard/Productpage';
import { CartProvider } from './components/Cart/Cartprovider';
const theme = createTheme({
  palette: {
    background: {
      paper: '#ffffff', // Replace with your desired background color
    },
  },
});

export default function App() {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/store" component={Store} />
            <Route path="/about" component={About} />
            <Route path="/cart" component={CartPage} />
            <Route path="/products/:productId" component={ProductPage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </CartProvider>
  );
}
