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
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
    isAdmin: boolean;
    profileImage: string;
    phone: string; // Nova propriedade phone
    address: string; // Nova propriedade address
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
        token: '',
        isAdmin: null,
        profileImage: '',
        phone: '', // Inicializar a propriedade phone
        address: '', // Inicializar a propriedade address
    });

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name;

    useEffect(() => {
        async function getUser() {
            const userInfo = await AsyncStorage.getItem('@token');
            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            if (Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;
                setUser(hasUser);
            }
            setLoading(false);
        }

        getUser();
    }, []);

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/session', {
                email,
                password
            });

            const { id, name, token, isAdmin, profileImage, phone, address } = response.data;

            const data = {
                id,
                name,
                email,
                token,
                isAdmin,
                profileImage,
                phone, // Incluir a nova propriedade phone
                address, // Incluir a nova propriedade address
            }

            await AsyncStorage.setItem('@token', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser({
                id,
                name,
                email,
                token,
                isAdmin,
                profileImage,
                phone,
                address,
            });

            setLoadingAuth(false);

        } catch (err) {
            console.log('Erro ao acessar:', err);
            setLoadingAuth(false);
        }
    }

    async function signOut() {
        await AsyncStorage.clear();
        setUser({
            id: '',
            name: '',
            email: '',
            token: '',
            isAdmin: null,
            profileImage: '',
            phone: '', // Limpar a propriedade phone
            address: '', // Limpar a propriedade address
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
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
