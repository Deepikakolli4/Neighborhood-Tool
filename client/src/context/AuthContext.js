import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Use named export

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Decode token to check expiration
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            // Token expired
            logout();
            setLoading(false);
            return;
          }

          // Fetch user data from backend to validate token
          const res = await fetch('http://localhost:5000/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const userData = await res.json();
            setUser({
              id: userData._id,
              name: userData.name,
              email: userData.email,
              role: userData.role, // Member or Admin
            });
          } else {
            logout(); // Invalid token
          }
        } catch (err) {
          console.error('Auth initialization error:', err);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const { token, user } = await res.json();
        localStorage.setItem('token', token);
        setUser({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
        return true;
      } else {
        const { message } = await res.json();
        throw new Error(message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
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