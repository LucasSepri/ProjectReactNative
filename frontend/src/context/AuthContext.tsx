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
        isAdmin: null,
        profileImage: '', // Inicializar a propriedade profileImage
    });

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name;

    useEffect(() => {
        async function getUser() {
            // Pegar os dados do usuário no storage
            const userInfo = await AsyncStorage.getItem('@token');
            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            // Verificar se recebemos as informações
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
            const response = await api.post('/login', { email, password });
            console.log('Login response:', response.data);

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
            console.log('Stored user data:', data);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(data);

            setLoadingAuth(false);
        } catch (err) {
            console.log('Error during sign in:', err);
            setLoadingAuth(false);
        }
    }

    async function getUser() {
        const userInfo = await AsyncStorage.getItem('@token');
        const hasUser: UserProps = JSON.parse(userInfo || '{}');

        console.log('Retrieved user info from storage:', hasUser);

        if (hasUser.token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;
            setUser(hasUser);
        } else {
            console.log('No token found, user is not authenticated');
        }

        setLoading(false);
    }



    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    id: '',
                    name: '',
                    email: '',
                    token: '',
                    phone: '',
                    isAdmin: null,
                    profileImage: '', // Limpar a URL da imagem de perfil
                });
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
