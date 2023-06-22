import React, { useEffect, useState } from "react";
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
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import { CustomCarousel } from "../../components/Navbar/Carousel";
const useStyles = makeStyles((theme: any) => ({
    root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
    position: "relative",
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.post("http://localhost:8080/products", {
        page_size: 4,
        page_number: 55,
        keyword: "laptop",
      });
      const data = response.data;

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && typeof data === "object") {
        // Handle response object that contains products array
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

  return (
    <>
      <CustomCarousel />
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Product List
        </Typography>
        <Grid container spacing={3}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card className={classes.card}>
                  <CardActionArea onClick={() => handleProductClick(product)}>
                    <img
                      src={product.images[0]}
                      alt={`Product ${product.id} - Image 0`}
                    />
                    <div className={classes.overlay}>{product.title}</div>
                  </CardActionArea>
                  {selectedProduct === product ? (
                    <CardContent>
                      <Typography variant="h6">{product.title}</Typography>
                      <Typography variant="body2">
                        {product.description}
                      </Typography>
                    </CardContent>
                  ) : null}
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No products available.</Typography>
          )}
        </Grid>

        <Modal
          open={selectedProduct !== null}
          onClose={closeProductModal}
          className={classes.modalContainer}
        >
          <div className={classes.modalContent}>
            {selectedProduct && (
              <React.Fragment>
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
              </React.Fragment>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};
