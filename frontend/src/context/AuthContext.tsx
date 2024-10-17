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
    profileImage: string; // Adicionar a propriedade profileImage
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
            const response = await api.post('/login', {
                email,
                password
            });

            // Desestruturando o token e os dados do usuário corretamente
            const { token, user } = response.data;
            const { id, name, isAdmin, profileImage } = user;

            const data = {
                id,
                name,
                email,
                token,
                isAdmin,
                profileImage, // Incluindo a URL da imagem de perfil
            }

            // Salvando o token no AsyncStorage
            await AsyncStorage.setItem('@token', JSON.stringify(data));

            // Configurando o token no cabeçalho das requisições
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Atualizando o estado do usuário
            setUser({
                id,
                name,
                email,
                token,
                isAdmin,
                profileImage, // Incluindo a URL da imagem de perfil
            });

            setLoadingAuth(false);

        } catch (err) {
            console.log('erro ao acessar', err);
            setLoadingAuth(false);
        }
    }


    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    id: '',
                    name: '',
                    email: '',
                    token: '',
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
