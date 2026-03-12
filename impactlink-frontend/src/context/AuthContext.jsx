import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") || !!localStorage.getItem("adminToken")
  );
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) return JSON.parse(stored);
      if (localStorage.getItem("adminToken")) return { _id: "admin", name: "Admin (Platform)", email: "admin@impactlink.com", role: "admin" };
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");
    
    if (token) {
      setIsAuthenticated(true);
    } else if (adminToken) {
      setIsAuthenticated(true);
      if (!user) {
        setUser({ _id: "admin", name: "Admin (Platform)", email: "admin@impactlink.com", role: "admin" });
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (user?.settings?.darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [user]);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
