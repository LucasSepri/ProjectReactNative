import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    Image,
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

export default function SignIn() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { signIn, loadingAuth, user, isAuthenticated } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        if (email === '' || password === '') {
            return;
        }
        await signIn({ email, password });
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
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subTitle}>Faça login para continuar</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    placeholderTextColor={COLORS.darkGrey}
                    value={email}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Senha"
                    style={styles.input}
                    placeholderTextColor={COLORS.darkGrey}
                    secureTextEntry
                    value={password}
                    autoCapitalize="none"
                    onChangeText={setPassword}
                />

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
