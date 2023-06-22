import React from "react";
import { IconButton, Menu, MenuItem, Avatar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export const Profile = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="profile">
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Typography
        sx={{ padding: "0.2rem" }}
        variant="subtitle1"
        color="inherit"
      >
        Profile Info
      </Typography>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
