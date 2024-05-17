import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './Logo';
import './Navbar.css';
import { SearchBar } from './Searchbar';
import { Profile } from './Profile';
import { CartButton } from './CartButton';
import AuthService from '../../services/AuthService';

function Navbar() {
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(AuthService.isAuthenticated());

    const handleStorageChange = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleNavigation = (path: string) => {
    history.push(path);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    history.replace('/login'); // To refresh the navbar state
  };

  return (
    <div className="nav-wrapper">
      <Logo />
      <SearchBar />
      <div className="nav-buttons">
        {isAuthenticated ? (
          <Profile handleLogout={handleLogout} />
        ) : (
          <>
            <Button
              className="nav-button"
              onClick={() => handleNavigation('/login')}
            >
              Login
            </Button>
            <Button
              className="nav-button"
              onClick={() => handleNavigation('/register')}
            >
              Register
            </Button>
          </>
        )}
        <CartButton itemCount={0} />
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
          {isAuthenticated ? (
            <>
              <ListItem button onClick={() => handleNavigation('/profile')}>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={() => handleNavigation('/login')}>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={() => handleNavigation('/register')}>
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
}

export default Navbar;
