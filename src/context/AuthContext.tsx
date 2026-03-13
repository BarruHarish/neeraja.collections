import React, { createContext, useState, useContext, useEffect } from 'react';

export type UserRole = 'user' | 'admin' | null;

interface AuthContextType {
  currentUser: string | null;
  userRole: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'user' | 'admin') => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);

  // Initialize from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const { user, role } = JSON.parse(storedAuth);
        setCurrentUser(user);
        setUserRole(role);
      } catch (error) {
        console.error('Failed to load auth from localStorage', error);
      }
    }
  }, []);

  const login = (email: string, password: string, role: 'user' | 'admin'): boolean => {
    // Simple validation - in production, use real authentication
    if (!email || !password) {
      return false;
    }

    // Admin credentials (in production, use secure backend authentication)
    if (role === 'admin') {
      if (email === 'admin@neeraja.com' && password === 'admin123') {
        setCurrentUser(email);
        setUserRole('admin');
        localStorage.setItem('auth', JSON.stringify({ user: email, role: 'admin' }));
        return true;
      }
      return false;
    }

    // User login - simple validation
    if (role === 'user' && email.includes('@')) {
      setCurrentUser(email);
      setUserRole('user');
      localStorage.setItem('auth', JSON.stringify({ user: email, role: 'user' }));
      return true;
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
    localStorage.removeItem('auth');
  };

  const value: AuthContextType = {
    currentUser,
    userRole,
    isAuthenticated: currentUser !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
