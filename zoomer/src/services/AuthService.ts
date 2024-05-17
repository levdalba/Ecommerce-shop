import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8080';

interface DecodedToken {
  userId: string;
  isAdmin: boolean;
  exp: number;
}

const AuthService = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data.AccessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
      window.dispatchEvent(new Event('storage')); // Trigger state change to update UI
    }
    return response.data;
  },

  register: async (userData: any) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage')); // Trigger state change to update UI
  },

  getCurrentUser: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  },

  isAuthenticated: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return !!user.AccessToken;
  },

  getDecodedToken: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.AccessToken) {
      return jwtDecode<DecodedToken>(user.AccessToken);
    }
    return null;
  },

  isAdmin: () => {
    const decodedToken = AuthService.getDecodedToken();
    return decodedToken ? decodedToken.isAdmin : false;
  },
};

export default AuthService;
