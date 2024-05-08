import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';
import { COLORS } from '../../styles/COLORS';

export default function SignUp() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { signIn } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp() {
        if (name === '' || email === '' || password === '') {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }
        setLoading(true);

        try {
            const response = await api.post('/users', { name, email, password });
            await signIn({ email, password });
            Alert.alert("Sucesso", "Conta criada e você está logado!");
            navigation.navigate('Dashboard');
        } catch (error) {
            Alert.alert("Erro", "Erro ao criar conta. Por favor, tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <TextInput
                placeholder='Nome Completo'
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholderTextColor={'#F0F0F0'}
            />
            <TextInput
                placeholder='Email'
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'#F0F0F0'}
            />
            <TextInput
                placeholder='Senha'
                style={styles.input}
                placeholderTextColor={'#F0F0F0'}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                ) : (
                    <Text style={styles.buttonText}>Cadastrar</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1d1d2e',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 10,
        color: '#FFF',
        marginBottom: 12,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.primary, 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
