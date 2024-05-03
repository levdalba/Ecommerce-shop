import React from 'react';
import { Typography, Box, Grid, Paper, Button } from '@mui/material';

const UserDashboard = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Welcome, [User Name]
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Profile Information</Typography>
            <Typography>Name: [User Name]</Typography>
            <Typography>Email: [User Email]</Typography>
            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: '10px' }}
            >
              Edit Profile
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Order History</Typography>
            {/* List orders here */}
            <Typography>No orders to show</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Account Settings</Typography>
            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: '10px' }}
            >
              Change Password
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
