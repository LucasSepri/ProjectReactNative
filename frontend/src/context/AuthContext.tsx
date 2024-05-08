import React, { useState, createContext, ReactNode, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from "../services/api";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
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
        token: ''
    });

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name;

    useEffect(() => {
        async function getUser() {
            //Pegar os dados do usuário no storage
            const userInfo = await AsyncStorage.getItem('@token');
            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            //Verificar se recebemos as informações
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

            //console.log(response.data);

            const { id, name, token } = response.data;

            const data = {
                ...response.data,
            }

            await AsyncStorage.setItem('@token', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser({
                id,
                name,
                email,
                token
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
                    token: ''
                });
            })
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                signIn,
                loading,
                loadingAuth,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}