import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Modal,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { CustomCarousel } from "../components/Navbar/Carousel";
import { ProductPage } from "../components/ProductCard/Productpage";
import { makeStyles } from "@mui/styles";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    maxWidth: 345,
    justifyContent: "center",
    position: "relative",
    minHeight: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.6)",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    maxWidth: 600,
    width: "100%",
    outline: "none",
    borderRadius: theme.shape.borderRadius,
  },
  closeButton: {
    marginLeft: "auto",
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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

  const fetchProducts = async () => {
    try {
      const response = await axios.post("http://localhost:8080/products", {
        keyword: "laptop",
        page_size: 6,
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

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const truncateTitle = (title: string) => {
    const words = title.split(" ");
    if (words.length > 4) {
      return words.slice(0, 4).join(" ") + "...";
    }
    return title;
  };

  const calculateCardHeight = () => {
    const cardElements = cardRef.current?.querySelectorAll(`.${classes.card}`);
    if (cardElements) {
      let minHeight = Infinity;
      cardElements.forEach((cardElement) => {
        const height = cardElement.clientHeight;
        if (height < minHeight) {
          minHeight = height;
        }
      });
      cardElements.forEach((cardElement) => {
        const element = cardElement as HTMLElement;
        element.style.minHeight = `${minHeight}px`;
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CustomCarousel />
        <Switch>
          <Route exact path="/">
            <div>
              <Typography variant="h4" align="center" gutterBottom>
                Product List
              </Typography>

              <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                {products.length > 0 ? (
                  products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <Card className={classes.card} ref={cardRef}>
                        <CardActionArea
                          component={Link}
                          to={`/products/${product.id}`}
                        >
                          <div>
                            <img
                              src={product.images[0]}
                              alt={`Product ${product.id} - Image 0`}
                            />
                            <CardContent>
                              <Typography variant="h6" align="center">
                                {product.title}
                              </Typography>
                            </CardContent>
                          </div>
                        </CardActionArea>
                        {selectedProduct === product && (
                          <CardContent>
                            <Typography variant="body2">
                              {product.description}
                            </Typography>
                          </CardContent>
                        )}
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Typography variant="body1" align="center">
                    No products available.
                  </Typography>
                )}
              </Grid>

              <Modal
                open={selectedProduct !== null}
                onClose={closeProductModal}
                className={classes.modalContainer}
              >
                <div className={classes.modalContent}>
                  {selectedProduct && (
                    <>
                      <Typography variant="h5" gutterBottom>
                        {selectedProduct.title}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {selectedProduct.description}
                      </Typography>
                      {selectedProduct.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Product ${selectedProduct.id} - Image ${index}`}
                          style={{ maxWidth: "100%", marginBottom: 10 }}
                        />
                      ))}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={closeProductModal}
                        className={classes.closeButton}
                      >
                        Close
                      </Button>
                    </>
                  )}
                </div>
              </Modal>
            </div>
          </Route>
          <Route path="/products/:productId" component={ProductPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
