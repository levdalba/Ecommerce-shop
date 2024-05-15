import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  CssBaseline,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const data = await AuthService.login(email, password);
      if (data.AccessToken) {
        const isAdmin = await AuthService.isAdmin();
        if (isAdmin) {
          history.push('/admin/dashboard');
        } else {
          history.push('/user/dashboard');
        }
      } else {
        setError('Invalid login credentials.');
      }
    } catch (err) {
      setError('Login failed. Please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={6} style={{ padding: '20px', marginTop: '8vh' }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleLogin} style={{ marginTop: '1em' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" style={{ marginTop: '10px' }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Sign In
          </Button>
          <Grid container style={{ marginTop: '10px' }}>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
