import React from "react";
import { IconButton, Badge, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

export const CartButton = ({ itemCount }) => {
  return (
    <div className="cart">
      <IconButton
        edge="end"
        aria-label="shopping cart"
        aria-controls="shopping-cart-menu"
        aria-haspopup="true"
        color="inherit"
      >
        <Badge badgeContent={itemCount} color="error">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <Typography
        sx={{ marginLeft: "0.5rem", marginTop: "1rem" }}
        variant="subtitle1"
        color="inherit"
        align="right"
      >
        0 ₾
      </Typography>
    </div>
  );
};
