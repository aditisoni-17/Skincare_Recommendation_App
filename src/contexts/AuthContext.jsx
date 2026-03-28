import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { setAuthToken, getAuthToken } from '../utils/authToken.js';

const AuthContext = createContext(null);
const USERS_KEY = 'mock_users';

function readUserFromStorage() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeUserToStorage(user) {
  try {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  } catch {
    // ignore storage write errors
  }
}

function syncUserInMockUsers(user) {
  if (!user?.email) return;

  try {
    const raw = localStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(users)) return;

    const nextUsers = users.map((storedUser) =>
      storedUser.email === user.email ? { ...storedUser, ...user } : storedUser
    );

    localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
  } catch {
    // ignore storage write errors
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readUserFromStorage());
  const [token, setToken] = useState(() => getAuthToken());

  useEffect(() => {
    writeUserToStorage(user);
    syncUserInMockUsers(user);
  }, [user]);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const toggleFavorite = (product) => {
    if (!product?.id) return false;

    let isFavorite = false;

    setUser((currentUser) => {
      if (!currentUser) return currentUser;

      const favorites = Array.isArray(currentUser.favorites) ? currentUser.favorites : [];
      const exists = favorites.some((item) => item.id === product.id);

      isFavorite = !exists;

      return {
        ...currentUser,
        favorites: exists
          ? favorites.filter((item) => item.id !== product.id)
          : [...favorites, product],
      };
    });

    return isFavorite;
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
      logout,
      toggleFavorite,
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
