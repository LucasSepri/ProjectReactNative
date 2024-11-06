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
import { COLORS } from '../../styles/COLORS';
import { Ionicons } from '@expo/vector-icons';
import DefaultLogoImage from '../../components/Logo';

export default function SignIn() {
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
        <View style={styles.container}>
            <DefaultLogoImage style={styles.logo} />
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subTitle}>Faça login para continuar</Text>

            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={24} color={COLORS.primary} style={styles.icon} />
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        placeholderTextColor={COLORS.text}
                        value={email}
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            setEmail(text);
                            setErrorMessage('');
                        }}
                    />
                </View>
                <View style={styles.passwordContainer}>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={24} color={COLORS.primary} style={styles.icon} />
                        <TextInput
                            placeholder='Senha'
                            style={styles.input}
                            placeholderTextColor={COLORS.text}
                            secureTextEntry={showPassword}
                            value={password}
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                setPassword(text);
                                setErrorMessage('');
                            }}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color={COLORS.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}

                <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
                    {loadingAuth ? (
                        <ActivityIndicator size={24} color={COLORS.white} />
                    ) : (
                        <Text style={styles.buttonText}>Entrar</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToSignUp}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
