import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';
import toast from 'react-hot-toast';

interface User {
    id: number;
    username: string;
    email: string;
    is_active: boolean;
    created_at: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await authAPI.getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await authAPI.login(email, password);
            localStorage.setItem('token', data.access_token);
            const userData = await authAPI.getCurrentUser();
            setUser(userData);
            toast.success('Login successful!');
        } catch (error: any) {
            let message = 'Login failed';
            if (error.code === 'ERR_NETWORK') {
                message = 'Cannot connect to server. Is the backend running?';
            } else if (error.response?.data?.detail) {
                message = error.response.data.detail;
            }
            toast.error(message);
            throw error;
        }
    };

    const signup = async (username: string, email: string, password: string) => {
        try {
            await authAPI.signup(username, email, password);
            toast.success('Account created! Please login.');
        } catch (error: any) {
            let message = 'Signup failed';
            if (error.code === 'ERR_NETWORK') {
                message = 'Cannot connect to server. Is the backend running?';
            } else if (error.response?.data?.detail) {
                message = error.response.data.detail;
            }
            toast.error(message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.success('Logged out successfully');
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
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
