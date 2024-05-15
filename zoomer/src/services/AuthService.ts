import axios from 'axios';

const API_URL = 'http://localhost:8080';

const AuthService = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.AccessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user') || '{}');
  },

  isAuthenticated: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return !!user.token;
  },

  isAdmin: async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.token) {
      const response = await axios.get(`${API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data.role === 'admin';
    }
    return false;
  },
};

export default AuthService;
