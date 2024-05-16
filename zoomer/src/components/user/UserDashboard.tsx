import React, { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import { Container, Paper, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = AuthService.getCurrentUser();
      setUser(currentUser.User); // Access the nested User object
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={6} style={{ padding: '20px', marginTop: '8vh' }}>
        <Typography component="h1" variant="h5">
          Welcome back, {user.firstName}!
        </Typography>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '10px' }}>
              <Typography variant="h6">Profile</Typography>
              <Typography variant="body2">
                Manage your profile information
              </Typography>
              <Link to="/profile">Go to Profile</Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '10px' }}>
              <Typography variant="h6">Orders</Typography>
              <Typography variant="body2">View your recent orders</Typography>
              <Link to="/orders">View Orders</Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '10px' }}>
              <Typography variant="h6">Settings</Typography>
              <Typography variant="body2">
                Adjust your account settings
              </Typography>
              <Link to="/user/settings">Account Settings</Link>
            </Paper>
          </Grid>
          {/* Add more sections as needed */}
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserDashboard;
