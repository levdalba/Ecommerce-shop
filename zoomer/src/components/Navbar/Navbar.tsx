import React, { useState } from 'react';
import Logo from './Logo';
import './Navbar.css';
import { SearchBar } from './Searchbar';
import { Profile } from './Profile';
import { CartButton } from './CartButton';
import { useHistory } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigation = (path: string) => {
    history.push(path);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <div className="nav-wrapper">
      <Logo />
      <SearchBar />
      <div className="nav-buttons">
        <Profile />
        <CartButton itemCount={0} />
        <button
          className="nav-button"
          onClick={() => handleNavigation('/login')}
        >
          Login
        </button>
        <button
          className="nav-button"
          onClick={() => handleNavigation('/register')}
        >
          Register
        </button>
      </div>
      <div className="burger-menu">
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button onClick={() => handleNavigation('/')}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/login')}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/register')}>
            <ListItemText primary="Register" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Navbar;
