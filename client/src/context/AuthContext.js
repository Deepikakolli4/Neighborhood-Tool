import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Make sure this is a named import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            // Token has expired
            logout();
            setLoading(false);
            return;
          }

          // Token is valid, fetch user profile
          const res = await fetch('http://localhost:8000/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const userData = await res.json();
            setUser({
              id: userData.id,
              username: userData.username,
              email: userData.email,
              role: userData.role,
            });
          } else {
            logout(); // Invalid token
          }
        } catch (err) {
          console.error('Error during auth initialization:', err);
          logout(); // Malformed token or fetch error
        }
      }

      setLoading(false); // Always stop loading at the end
    };

    initializeAuth();
  }, []);

  const login = async (email, password, navigate) => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);

      setUser({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        role: data.user.role,
      });

      navigate('/'); // Navigate after successful login
    } catch (err) {
      console.error('Login error:', err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
