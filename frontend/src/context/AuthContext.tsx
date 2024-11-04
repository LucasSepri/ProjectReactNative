import React, { useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from "../services/api";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
    setUser: (user: UserProps) => void;
    verificarUser: () => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    phone: string;
    token: string;
    isAdmin: boolean;
    profileImage: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string;
}

export const AuthContext = React.createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        phone: '',
        token: '',
        isAdmin: false,
        profileImage: '',
    });

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!user.token; // Verifique se o token está presente

    useEffect(() => {
        async function loadUserData() {
            const userInfo = await AsyncStorage.getItem('@token');
            const hasUser: UserProps = JSON.parse(userInfo || '{}');

            if (hasUser.token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;
                setUser(hasUser);
            }

            setLoading(false);
        }

        loadUserData();
    }, []);

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true);
        try {
            const response = await api.post('/login', { email, password });
            const { token, user } = response.data;
            const { id, name, phone, isAdmin, profileImage } = user;

            const data = {
                id,
                name,
                email,
                token,
                phone,
                isAdmin,
                profileImage,
            };

            await AsyncStorage.setItem('@token', JSON.stringify(data));
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(data);
        } catch (error) {
            console.error('Error during sign in:', error);
        } finally {
            setLoadingAuth(false);
        }
    }

    async function verificarUser() {
        const userInfo = await AsyncStorage.getItem('@token');
        const hasUser: UserProps = JSON.parse(userInfo || '{}');

        if (hasUser.token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;

            try {
                const response = await api.get('/user');
                const userData = { ...response.data, token: hasUser.token }; // Mantenha o token
                setUser(userData);
                await AsyncStorage.setItem('@token', JSON.stringify(userData));
            } catch (error) {
                console.error('Error getting user data:', error);
                // Aqui você pode querer tratar a expiração do token, se necessário
            }
        }
    }

    async function signOut() {
        await AsyncStorage.clear();
        setUser({
            id: '',
            name: '',
            email: '',
            phone: '',
            token: '',
            isAdmin: false,
            profileImage: '',
        });
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                signIn,
                loading,
                loadingAuth,
                signOut,
                setUser,
                verificarUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
