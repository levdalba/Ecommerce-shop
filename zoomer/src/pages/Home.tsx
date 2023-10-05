import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@mui/styles";
import { AddShoppingCart } from "@mui/icons-material";
import { CustomCarousel } from "../components/Navbar/Carousel";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100%",
  },
  productsContainer: {
    margin: "0 auto",
    maxWidth: 960,
    padding: "0 16px",
  },
}));

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

export const Home = () => {
  const classes = useStyles();
  const [products, setProducts] = useState<Product[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    calculateCardHeight();
    window.addEventListener("resize", calculateCardHeight);
    return () => {
      window.removeEventListener("resize", calculateCardHeight);
    };
  }, [products]);

  const handleAddToCart = () => {
    toast.success("Added to cart");
  }
  

  const fetchProducts = async () => {
    try {
      const response = await axios.post("http://localhost:8080/products", {
        keyword: "laptop",
        page_size: 12,
        page_number: 55,
      });
      const data = response.data;

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && typeof data === "object") {
        const productsArray = data.products;
        if (Array.isArray(productsArray)) {
          setProducts(productsArray);
        } else {
          console.error("Invalid response format: Products array not found");
        }
      } else {
        console.error("Invalid response format: Expected an array or object");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const truncateTitle = (title: string) => {
    const words = title.split(" ");
    if (words.length > 4) {
      return words.slice(0, 4).join(" ") + "...";
    }
    return title;
  };

  const calculateCardHeight = () => {
    if (cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      const cardHeight = Math.floor(cardWidth * 1.4);
      cardRef.current.style.height = `${cardHeight}px`;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CustomCarousel />
        <div className={classes.productsContainer}>
          <Grid container spacing={2} justifyContent="center">
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card className={classes.card} ref={cardRef}>
                  <CardActionArea
                    component={Link}
                    to={`/products/${product.id}`}
                  >
                    <Carousel>
                      {product.images.map((image, index) => (
                        <img
                          src={image}
                          alt={`Product ${index}`}
                          key={index}
                          style={{ objectFit: "cover", width: "100%" }}
                        />
                      ))}
                    </Carousel>
                    <CardContent>
                      <Typography variant="h6">
                        {truncateTitle(product.title)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product.brand}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        ${product.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddShoppingCart />}
                      component={Link}
                      onClick={() => handleAddToCart()} 
                      to={`/`}
                      fullWidth
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;

