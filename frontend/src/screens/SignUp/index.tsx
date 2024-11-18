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
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { StackParamList as StackParamListAdm } from '../../routes/admin.routes';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';
import { TextInputMask } from 'react-native-masked-text';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import { DefaultProfileAddImage } from '../../components/Profile';
import { ThemeContext } from 'styled-components';


export default function SignUp() {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const navigationAdm = useNavigation<NativeStackNavigationProp<StackParamListAdm>>();
    const { signIn } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

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
        if (!name || !email || !phone || !password || !confirmPassword) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
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
            if (!response.data.user.isAdmin) {
                navigation.navigate('Home');
            } else {
                navigationAdm.navigate('ListUsers');
            }
        } catch (error) {
            // Check if the error message indicates an email duplication
            if (error.response && error.response.data && error.response.data.error === 'E-mail já cadastrado.') {
                Alert.alert("Erro", "O e-mail informado já está cadastrado. Tente outro.");
            } else {
                Alert.alert("Erro", "Erro ao criar conta. Por favor, tente novamente mais tarde.");
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <KeyboardAvoidingView
            style={styles(theme).container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <ScrollView
                contentContainerStyle={styles(theme).scrollContainer}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles(theme).title}>Crie sua Conta</Text>
                <Text style={styles(theme).subTitle}>Preencha os dados abaixo para se registrar</Text>

                {selectedImage ? (
                    <TouchableOpacity onPress={pickImageAsync} style={styles(theme).imagePicker}>
                        <Image source={{ uri: selectedImage }} style={styles(theme).image} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={pickImageAsync} style={[styles(theme).imagePicker, styles(theme).imagePlaceholder]}>
                        <DefaultProfileAddImage style={styles(theme).defaultProfileIcon} theme={theme}/>
                        <Text style={styles(theme).imageText}>Adicionar Foto</Text>
                    </TouchableOpacity>
                )}

                <View style={styles(theme).inputContainer}>
                    <View style={styles(theme).inputWrapper}>
                        <Ionicons name="person-outline" size={24} color={theme.primary} style={styles(theme).icon} />
                        <TextInput
                            placeholder='Nome Completo'
                            style={styles(theme).input}
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor={theme.text}
                        />
                    </View>
                    <View style={styles(theme).inputWrapper}>
                        <Ionicons name="mail-outline" size={24} color={theme.primary} style={styles(theme).icon} />
                        <TextInput
                            placeholder='Email'
                            style={styles(theme).input}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                            placeholderTextColor={theme.text}
                        />
                    </View>
                    <View style={styles(theme).inputWrapper}>
                        <Ionicons name="call-outline" size={24} color={theme.primary} style={styles(theme).icon} />
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '(99) 9999-99999',
                            }}
                            placeholder='Telefone'
                            style={styles(theme).input}
                            value={phone}
                            onChangeText={text => setPhone(text)}
                            placeholderTextColor={theme.text}
                            keyboardType='phone-pad'
                            maxLength={15}
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
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles(theme).eyeIcon}>
                                <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color={theme.text} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles(theme).passwordContainer}>
                        <View style={styles(theme).inputWrapper}>
                            <Ionicons name="lock-closed-outline" size={24} color={theme.primary} style={styles(theme).icon} />
                            <TextInput
                                placeholder='Confirme sua Senha'
                                style={styles(theme).input}
                                placeholderTextColor={theme.text}
                                secureTextEntry={showConfirmPassword}
                                value={confirmPassword}
                                autoCapitalize='none'
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles(theme).eyeIcon}>
                                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color={theme.text} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {loading ? (
                    <TouchableOpacity style={styles(theme).button} onPress={handleSignUp} disabled={loading}>
                        <ActivityIndicator size="small" color={theme.white} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles(theme).button} onPress={handleSignUp} disabled={loading}>
                        <Text style={styles(theme).buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
