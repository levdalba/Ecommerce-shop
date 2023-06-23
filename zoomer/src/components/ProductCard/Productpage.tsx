import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Modal,
  Button,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import { makeStyles } from "@mui/styles";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(2),
  },
  card: {
    display: "flex",
    maxWidth: 345,
    position: "relative",
    minHeight: "100%",
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
}

export const ProductPage = () => {
  const classes = useStyles();
  const { productId } = useParams<{ productId: string }>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/products/${productId}`
      );
      const data = await response.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleProductClick = (product: Product | null) => {
    if (product) {
      setSelectedProduct(product);
    }
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            {selectedProduct && (
              <Card className={classes.card}>
                <CardActionArea
                  onClick={() => handleProductClick(selectedProduct)}
                >
                  <div>
                    <img
                      src={selectedProduct?.images[0]}
                      alt={`Product ${selectedProduct?.id} - Image 0`}
                    />
                    <CardContent>
                      <Typography variant="h6" align="center">
                        {selectedProduct?.title}
                      </Typography>
                    </CardContent>
                  </div>
                </CardActionArea>
                <CardContent>
                  <Typography variant="body2">
                    {selectedProduct.description}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </div>

      <Modal
        open={selectedProduct !== null}
        onClose={closeProductModal}
        className={classes.modalContainer}
      >
        <div className={classes.modalContent}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.closeButton}
            onClick={closeProductModal}
          >
            Close
          </Button>
          <Typography variant="h6">{selectedProduct?.title}</Typography>
          <Typography variant="body1">
            {selectedProduct?.description}
          </Typography>
        </div>
      </Modal>
    </ThemeProvider>
  );
};
