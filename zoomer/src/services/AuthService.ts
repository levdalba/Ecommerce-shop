class AuthService {
  login(email: string, password: string) {
    return fetch('https://yourapi.com/login', {
      // Use HTTPS for secure communication
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token); // Consider more secure storage options
        }
        return data;
      })
      .catch((error) => {
        console.error('Login Failed:', error);
        return { error: error.message };
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    // Optionally check if the token is expired
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = Date.now() >= payload.exp * 1000;
    if (isExpired) {
      this.logout();
      return false;
    }

    return true;
  }

  getUserRole() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const { role } = JSON.parse(atob(token.split('.')[1])); // Assuming JWT structure
    return role;
  }
}

export default new AuthService();
