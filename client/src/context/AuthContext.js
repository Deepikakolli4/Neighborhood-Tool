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
          const res = await fetch('http://localhost:8000/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const userData = await res.json();
            setUser({
              id: userData.id,
              username: userData.username, // Ensure username is set
              email: userData.email,
              role: userData.role, // Ensure role is set
            });
          } else {
            logout(); // Invalid token
          }
        } catch (err) {
          console.error('Auth initialization error:', err);
          logout();
        }
      }
      setLoading(false); // Ensure loading is set to false
    };

    initializeAuth();
  }, []);

  const login = async (email, password, navigate) => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/login', { // Backend login endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password to backend
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || 'Login failed');
      }

      const data = await res.json();
      // Store the token in localStorage
      localStorage.setItem('token', data.token);

      // Update the user state
      setUser({
        id: data.user.id,
        username: data.user.username, 
        email: data.user.email,
        role: data.user.role,
      });

      // Redirect to the Introduction page
      navigate('/');
    } catch (err) {
      console.error('Login error:', err); // Log the error for debugging
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