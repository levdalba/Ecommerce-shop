import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

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

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  image: {
    width: "300px",
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
  },
  description: {
    marginBottom: theme.spacing(1),
  },
  brand: {
    marginBottom: theme.spacing(1),
  },
  category: {
    marginBottom: theme.spacing(1),
  },
  price: {
    marginBottom: theme.spacing(1),
  },
  amount: {
    marginBottom: theme.spacing(1),
  },
}));

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const classes = useStyles();

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
      console.error("Error fetching product details:", error);
    }
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className={classes.container}>
      <img src={product.images[0]} alt="" className={classes.image} />
      <Typography variant="h5" className={classes.title} gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="body1" className={classes.description} gutterBottom>
        {product.description}
      </Typography>
      <Typography variant="subtitle1" className={classes.brand} gutterBottom>
        Brand: {product.brand}
      </Typography>
      <Typography variant="subtitle1" className={classes.category} gutterBottom>
        Category: {product.category}
      </Typography>
      <Typography variant="h6" className={classes.price} gutterBottom>
        Price: ${product.price}
      </Typography>
      <Typography variant="h6" className={classes.amount} gutterBottom>
        Amount: {product.amount}
      </Typography>
    </div>
  );
};

export default ProductPage;
