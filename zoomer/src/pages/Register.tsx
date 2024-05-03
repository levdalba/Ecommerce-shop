import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';

const Register = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const history = useHistory();

  const handleRegister = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Implement your registration logic here
    console.log('Registering user:', userData);
    // Assume registration is successful
    history.push('/login');
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ padding: '20px', marginTop: '8vh' }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleRegister} style={{ marginTop: '1em' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={userData.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
