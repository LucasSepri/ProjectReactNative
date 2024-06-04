import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';

import { AuthContext } from '../../context/AuthContext';
import { COLORS } from '../../styles/COLORS';

export default function SignIn() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { signIn, loadingAuth, user,isAuthenticated } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        if (email === '' || password === '') {
            return;
        } else {
            await signIn({ email, password });
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            if (user.isAdmin == false) {
                navigation.navigate('Home');
            } 
        }
    }, [isAuthenticated, user, navigation]);

    
    function navigateToSignUp() {
        navigation.navigate('SignUp'); // Navega para a tela de SignUp
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Digite seu Email'
                    style={styles.input}
                    placeholderTextColor={'#F0F0F0'}
                    value={email}
                    autoCapitalize='none'
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder='Digite sua Senha'
                    style={styles.input}
                    placeholderTextColor={'#F0F0F0'}
                    secureTextEntry={true}
                    value={password}
                    autoCapitalize='none'
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {loadingAuth ? (
                        <ActivityIndicator size={20} color="#101026" />
                    ) : (
                        <Text style={styles.buttonText}>Entrar</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToSignUp}>
                    <Text style={styles.registerText}>
                        Não tem uma conta? Cadastre-se
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d1d2e'
    },
    logo: {
        marginBottom: 10,
        width: 220,
        height: 220,
        borderRadius: 100,
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 16,
    },
    input: {
        width: '95%',
        height: 50,
        backgroundColor: '#101026',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: '#FFF'
    },
    button: {
        width: '95%',
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white
    },
    registerText: {
        marginTop: 20,
        color: '#FFF'
    }
});
