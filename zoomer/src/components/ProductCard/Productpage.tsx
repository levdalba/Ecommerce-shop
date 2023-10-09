import React, { useContext, useState } from 'react';
import { Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { AddShoppingCart } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext, CartItem } from '../Cart/Cartprovider';
import { makeStyles } from '@mui/styles';

interface Product {
  id: number;
  title: string;
  description: string;
  images: string[]; // Make sure 'images' property is defined
  brand: string;
  category: string;
  price: number;
  amount: number;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '16px',
  },
  productInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  image: {
    width: '300px',
    marginRight: '16px',
  },
  title: {
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    marginBottom: '16px',
  },
});

const Container = styled('div')({
  // Your additional styles here
});

const ProductPage = ({ product }: { product: Product }) => {
  const { addToCart } = useContext(CartContext);
  const [showDescription, setShowDescription] = useState(false);
  const classes = useStyles();

  const handleToggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleAddToCart = () => {
    if (product && product.images && product.images.length > 0) {
      const cartItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      };
      addToCart(cartItem);
      toast.success('Product added to cart!');
    } else {
      toast.error('Product information is incomplete.');
    }
  };

  return (
    <Container className={classes.container}>
      <div className={classes.productInfo}>
        {product && product.images && product.images.length > 0 && (
          <img
            src={product.images[0]}
            alt={product.title}
            className={`${classes.image} ${classes.image}`}
          />
        )}
        <div>
          <Typography variant="h5" gutterBottom className={classes.title}>
            {product && product.title}
          </Typography>
          <Typography variant="h6" gutterBottom className={classes.price}>
            ${product && product.price}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddShoppingCart />}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
        <IconButton aria-label="Add to Cart"></IconButton>
      </div>
      <div className={classes.buttonContainer}>
        <Button variant="contained" onClick={handleToggleDescription}>
          {showDescription ? 'Hide Description' : 'Show Description'}
        </Button>
      </div>
      {showDescription && (
        <Typography
          variant="body1"
          gutterBottom
          className={classes.description}
        >
          {product && product.description}
        </Typography>
      )}
      <ToastContainer />
    </Container>
  );
};

export default ProductPage;
