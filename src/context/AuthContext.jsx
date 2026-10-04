import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { showToast } = useToast();
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('shopnest_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('shopnest_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('shopnest_user');
      }
    } catch (e) {
      console.error('Failed to save auth state to localStorage', e);
    }
  }, [user]);

  const login = (email, password) => {
    // Simulated client-side authentication (ready for MERN API replacement)
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    
    const loggedInUser = {
      id: "usr-" + Date.now(),
      name: formattedName || "Alex Morgan",
      email: email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      joinedDate: "October 2024",
      ordersCount: 4
    };

    setUser(loggedInUser);
    showToast(`Welcome back, ${loggedInUser.name}!`, 'success');
    return { success: true, user: loggedInUser };
  };

  const register = (name, email, password) => {
    const newUser = {
      id: "usr-" + Date.now(),
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      joinedDate: "Just now",
      ordersCount: 0
    };

    setUser(newUser);
    showToast(`Welcome to ShopNest, ${name}! Your account has been created.`, 'success');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
