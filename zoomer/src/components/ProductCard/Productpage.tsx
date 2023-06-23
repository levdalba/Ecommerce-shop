import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

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

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/products/${productId}`
      );
      const data = response.data;
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {product.description}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Brand: {product.brand}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Category: {product.category}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Price: ${product.price}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Amount: {product.amount}
      </Typography>
    </div>
  );
};

export default ProductPage;
