import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { AuthContext } from '../../context/AuthContext';
import styles from './style';
import { Ionicons } from '@expo/vector-icons';
import {DefaultLogoImage} from '../../components/Logo';
import { ThemeContext } from 'styled-components';

export default function SignIn() {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { signIn, loadingAuth, user, isAuthenticated } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleLogin() {
        if (email === '' || password === '') {
            setErrorMessage('Por favor, preencha ambos os campos.');
            return;
        }

        try {
            await signIn({ email, password });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('Erro ao tentar login. Por favor, tente novamente mais tarde.');
                console.error('Error during sign in:', error);  // Log detalhado no console
            }
        }
    }

    useEffect(() => {
        if (isAuthenticated && user.isAdmin === false) {
            navigation.navigate('Home');
        }
    }, [isAuthenticated, user, navigation]);

    function navigateToSignUp() {
        navigation.navigate('SignUp');
    }

    return (
        <View style={styles(theme).container}>
            <DefaultLogoImage style={styles(theme).logo} theme={theme}/>
            <Text style={styles(theme).title}>Bem-vindo de volta!</Text>
            <Text style={styles(theme).subTitle}>Faça login para continuar</Text>

            <View style={styles(theme).inputContainer}>
                <View style={styles(theme).inputWrapper}>
                    <Ionicons name="mail-outline" size={24} color={theme.primary} style={styles(theme).icon} />
                    <TextInput
                        placeholder="Email"
                        style={styles(theme).input}
                        placeholderTextColor={theme.text}
                        value={email}
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            setEmail(text);
                            setErrorMessage('');
                        }}
                    />
                </View>
                <View style={styles(theme).passwordContainer}>
                    <View style={styles(theme).inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={24} color={theme.primary} style={styles(theme).icon} />
                        <TextInput
                            placeholder='Senha'
                            style={styles(theme).input}
                            placeholderTextColor={theme.text}
                            secureTextEntry={showPassword}
                            value={password}
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                setPassword(text);
                                setErrorMessage('');
                            }}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles(theme).eyeIcon}>
                            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color={theme.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                {errorMessage ? (
                    <Text style={styles(theme).errorText}>{errorMessage}</Text>
                ) : null}

                <TouchableOpacity style={styles(theme).button} onPress={handleLogin} activeOpacity={0.8}>
                    {loadingAuth ? (
                        <ActivityIndicator size={24} color={theme.white} />
                    ) : (
                        <Text style={styles(theme).buttonText}>Entrar</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToSignUp}>
                    <Text style={styles(theme).registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
