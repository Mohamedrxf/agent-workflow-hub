import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  loginWithGoogle: () => Promise<{ error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => ({}),
  loginWithGoogle: async () => ({}),
  signup: async () => ({}),
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800));
    if (password.length < 6) return { error: 'Invalid credentials.' };
    setUser({ id: '1', name: email.split('@')[0], email });
    return {};
  }, []);

  const loginWithGoogle = useCallback(async () => {
    await new Promise(r => setTimeout(r, 800));
    setUser({ id: '2', name: 'Google User', email: 'user@gmail.com' });
    return {};
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    await new Promise(r => setTimeout(r, 800));
    if (password.length < 6) return { error: 'Password must be at least 6 characters.' };
    return {};
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginWithGoogle, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
