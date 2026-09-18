import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AuthUser } from '../types/auth';
import { API_ENDPOINTS } from '../api/config';

interface AuthContextValue {
    user: AuthUser | null;
    token: string | null;
    isLoading: boolean;
    login: (token: string, user: AuthUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect (() => {
        if (!token) {
            setIsLoading(false);
            return;
        }

        fetch(API_ENDPOINTS.me, {
            headers: {Authorization: `Bearer ${token}`},
        })
            .then((res) => {
                if (!res.ok) throw new Error('Invalid token');
                return res.json();
            })
            .then((data:AuthUser) => {
                setUser(data);
            })
            .catch(() => {
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            })
            .finally(() =>{
                setIsLoading(false);
            });
    }, []);

    const login = (newToken: string, newUser: AuthUser) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout}}>
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