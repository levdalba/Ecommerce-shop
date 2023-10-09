import React, { useContext } from 'react';
import {
  IconButton,
  Badge,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { CartContext, CartItem } from '../Cart/Cartprovider';

export const CartButton = ({ itemCount }: { itemCount: number }) => {
  const history = useHistory();
  const { cartItems } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const handleClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleGoToCart = () => {
    setIsCartOpen(false);
    history.push('/cart');
  };

  return (
    <>
      <div className="cart">
        <IconButton
          edge="end"
          aria-label="shopping cart"
          aria-controls="shopping-cart-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
          <Badge badgeContent={itemCount} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <Typography
          sx={{ marginLeft: '0.5rem', marginTop: '1rem' }}
          variant="subtitle1"
          color="inherit"
          align="right"
        >
          0 ₾
        </Typography>
      </div>
      <Drawer anchor="right" open={isCartOpen} onClose={handleCloseCart}>
        <div role="presentation">
          <List>
            {cartItems.map((item: CartItem) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.title}
                  secondary={`Price: $${item.price}`}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleGoToCart}>
              <ListItemText primary="Go to Cart" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};
