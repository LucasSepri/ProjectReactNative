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
import { Ionicons } from '@expo/vector-icons';
import DefaultLogoImage from '../../components/Logo';

export default function SignIn() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { signIn, loadingAuth, user, isAuthenticated } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

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
                        onChangeText={setEmail}
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
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color={COLORS.text} />
                        </TouchableOpacity>
                    </View>
                </View>

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
