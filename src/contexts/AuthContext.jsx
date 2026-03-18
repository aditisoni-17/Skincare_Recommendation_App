import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { setAuthToken, getAuthToken } from '../utils/authToken.js';

const AuthContext = createContext(null);

function readUserFromStorage() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readUserFromStorage());
  const [token, setToken] = useState(() => getAuthToken());

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

