import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Toolbar,
  AppBar,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export const Profile = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
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

const AdminPanel = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Profile />
        </Toolbar>
      </AppBar>
      <Typography variant="h4" sx={{ marginTop: "2rem" }}>
        Welcome to the Admin Panel
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "1rem" }}>
        Here you can manage the settings, users, and content of your
        application.
      </Typography>
    </div>
  );
};

export default AdminPanel;
