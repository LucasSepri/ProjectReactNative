import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';
import { COLORS } from '../../styles/COLORS';
import styles from './style';

export default function SignUp() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { signIn, user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImageAsync = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('É necessário conceder permissão para acessar a galeria de imagens.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('Você não selecionou nenhuma imagem.');
        }
    };

    async function handleSignUp() {
        if (name === '' || email === '' || phone === '' || password === '') {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }
        setLoading(true);

        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);

        if (selectedImage) {
            try {
                const fileInfo = await FileSystem.getInfoAsync(selectedImage);

                if (!fileInfo.exists) {
                    throw new Error('File does not exist');
                }

                const fileUri = fileInfo.uri;
                const fileType = 'image/jpeg';
                const fileName = fileUri.split('/').pop();

                formData.append('profileImage', {
                    uri: fileUri,
                    name: fileName,
                    type: fileType,
                } as any);
            } catch (error) {
                console.error('Error getting file info:', error);
                Alert.alert('Erro', 'Erro ao obter informações do arquivo');
                return;
            }
        }

        try {
            const response = await api.post('/users', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });
            await signIn({ email, password });
            Alert.alert("Sucesso", "Conta criada e você está logado!");
            if (user.isAdmin === false) {
                navigation.navigate('Home');
            }
        } catch (error) {
            Alert.alert("Erro", "Erro ao criar conta. Por favor, tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crie sua Conta</Text>
            <Text style={styles.subTitle}>Preencha os dados abaixo para se registrar</Text>

            <TouchableOpacity onPress={pickImageAsync} style={styles.imagePicker}>
                {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                ) : (
                    <Text style={styles.uploadText}>Upload sua foto</Text>
                )}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Nome Completo'
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={COLORS.darkGrey}
                />
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    placeholderTextColor={COLORS.darkGrey}
                />
                <TextInput
                    placeholder='Telefone'
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholderTextColor={COLORS.darkGrey}
                />
                <TextInput
                    placeholder='Senha'
                    style={styles.input}
                    placeholderTextColor={COLORS.darkGrey}
                    secureTextEntry={true}
                    value={password}
                    autoCapitalize='none'
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                    <Text style={styles.buttonText}>Cadastrar</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}