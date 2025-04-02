import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to sync auth state with localStorage
  const syncAuthState = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    
    if (token && role) {
      setUser({
        token,
        role,
        name: name || 'No name',
        // Add other user properties as needed
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Initial sync when component mounts
    syncAuthState();

    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = () => syncAuthState();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('role', userData.role);
    localStorage.setItem('name', userData.name);
    syncAuthState(); // Immediately update state
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);