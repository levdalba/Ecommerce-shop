import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { AddShoppingCart } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: number;
  title: string;
  description: string;
  images: string[];
  brand: string;
  category: string;
  price: number;
  amount: number;
}

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: '16px',
});

const ProductInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
});

const Image = styled('img')({
  width: '300px',
  marginRight: '16px',
});

const Title = styled(Typography)({
  marginBottom: '8px',
  fontWeight: 'bold',
});

const Price = styled(Typography)({
  fontWeight: 'bold',
});

const ButtonContainer = styled('div')({
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
});

const Description = styled(Typography)({
  marginBottom: '16px',
});

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/product/${productId}`
      );
      const data = response.data;
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const handleToggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleAddToCart = () => {
    toast.success('Product added to cart!'); // Display success toast
  };

  return (
    <Container>
      <ProductInfo>
        <Image src={product.images[0]} alt="" />
        <div>
          <Title variant="h5" gutterBottom>
            {product.title}
          </Title>
          <Price variant="h6" gutterBottom>
            ${product.price}
          </Price>
          <Button
            variant="contained"
            startIcon={<AddShoppingCart />}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
        <IconButton aria-label="Add to Cart"></IconButton>
      </ProductInfo>
      <ButtonContainer>
        <Button variant="contained" onClick={handleToggleDescription}>
          {showDescription ? 'Hide Description' : 'Show Description'}
        </Button>
      </ButtonContainer>
      {showDescription && (
        <Description variant="body1" gutterBottom>
          {product.description}
        </Description>
      )}
      <ToastContainer />
    </Container>
  );
};

export default ProductPage;
