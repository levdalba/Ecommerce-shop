import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import { Container, Paper, Typography, Avatar } from '@mui/material';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await AuthService.getCurrentUser();
      setUser(currentUser.User); // Access the nested User object
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} style={{ padding: '20px', marginTop: '8vh' }}>
        <Avatar
          style={{ width: '100px', height: '100px', margin: '0 auto 20px' }}
        />
        <Typography component="h1" variant="h5" align="center">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          {user.email}
        </Typography>
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: '20px' }}
        >
          Phone Number: {user.phoneNumber}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
