import React, { useContext } from 'react';
import {
  Typography,
  Grid,
  Button,
  Paper,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartContext, CartContextType, CartItem } from '../Cart/Cartprovider';

const CartPage = () => {
  const { cartItems, setCartItems } = useContext<CartContextType>(CartContext);

  const handleRemoveItem = (itemId: number) => {
    const updatedItems = cartItems.filter((cartItem) => cartItem.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const truncateTitle = (title: string) => {
    if (title.length > 20) {
      return title.substring(0, 20) + '...';
    }
    return title;
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="subtitle1" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {cartItems.map((item: CartItem, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img
                  src={item.images[0]}
                  alt={`Product ${index}`}
                  style={{ width: '100%', height: 'auto', marginBottom: 2 }}
                />
                <Typography variant="subtitle1" gutterBottom>
                  {truncateTitle(item.title)}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {`$${item.price}`}
                </Typography>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveItem(item.id)}
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CartPage;
