import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthUser, RawAuthUser, RawShortStudent } from '../types/auth';
import { API_ENDPOINTS } from '../api/config';

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string, rawUser: RawAuthUser, rawStudent: RawShortStudent | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function buildAuthUser(rawUser: RawAuthUser, rawStudent: RawShortStudent | null): AuthUser {
  return {
    id: rawStudent?.login ?? rawUser.username,
    name: rawStudent?.full_name ?? rawUser.full_name,
    group: rawStudent?.student_group ?? null,
    role: rawUser.role,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    fetch(API_ENDPOINTS.me, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid token');
        return res.json();
      })
      .then((data: { user: RawAuthUser; student: RawShortStudent | null }) => {
        setUser(buildAuthUser(data.user, data.student));
      })
      .catch(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAccessToken(null);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = (
    newAccessToken: string,
    newRefreshToken: string,
    rawUser: RawAuthUser,
    rawStudent: RawShortStudent | null
  ) => {
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    setAccessToken(newAccessToken);
    setUser(buildAuthUser(rawUser, rawStudent));
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}