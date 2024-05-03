import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetRequest = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Implement your reset password logic here
    console.log('Password reset requested for:', email);
    // Show confirmation message or handle next steps
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ padding: '20px', marginTop: '8vh' }}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form onSubmit={handleResetRequest} style={{ marginTop: '1em' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Send Reset Link
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
