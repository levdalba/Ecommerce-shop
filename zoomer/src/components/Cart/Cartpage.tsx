import React, { useContext } from 'react';
import { Typography, Grid } from '@mui/material';
import { CartContext, CartItem } from '../Cart/Cartprovider';

const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {cartItems.map((item: CartItem) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <div>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="subtitle1">
                  Price: ${item.price}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CartPage;
