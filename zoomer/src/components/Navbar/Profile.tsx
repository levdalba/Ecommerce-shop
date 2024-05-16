import React from 'react';
import { IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

interface ProfileProps {
  handleLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ handleLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    history.push('/profile');
  };

  return (
    <div className="profile">
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="profile-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
      >
        <AccountCircle />
        <Typography
          variant="subtitle1"
          color="inherit"
          sx={{ marginLeft: '10px', display: { xs: 'none', sm: 'flex' } }}
        >
          Profile Info
        </Typography>
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
