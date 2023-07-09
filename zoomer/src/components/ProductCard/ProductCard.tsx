import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  images: string[];
  brand: string;
  category: string;
  price: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  images,
  brand,
  category,
  price,
}) => {
  const truncateTitle = (title: string) => {
    const words = title.split(" ");
    if (words.length > 4) {
      return words.slice(0, 4).join(" ") + "...";
    }
    return title;
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
      <Card>
        <CardActionArea component={Link} to={`/products/${id}`}>
          {images.length > 0 && (
            <img
              src={images[0]}
              alt={`Product ${id}`}
              style={{ objectFit: "cover", width: "100%" }}
            />
          )}
          <CardContent>
            <Typography variant="h6">{truncateTitle(title)}</Typography>
            <Typography variant="body2" color="textSecondary">
              {brand}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              ${price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCart />}
            component={Link}
            to={`/`}
            fullWidth
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
