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
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';
import { COLORS } from '../../styles/COLORS';
import { TextInputMask } from 'react-native-masked-text';
import { Ionicons } from '@expo/vector-icons';
import  styles  from './style';

export default function SignUp() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { signIn, user } = useContext(AuthContext);
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
        if (name === '' || email === '' || phone === '' || password === '' || confirmPassword === '') {
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
            // navigation.navigate('Endereco');
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
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContainer} 
                keyboardShouldPersistTaps='handled' 
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Crie sua Conta</Text>
                <Text style={styles.subTitle}>Preencha os dados abaixo para se registrar</Text>

                <TouchableOpacity onPress={pickImageAsync} style={styles.imagePicker}>
                    {selectedImage ? (
                        <Image source={{ uri: selectedImage }} style={styles.image} />
                    ) : (
                        <Image
                            source={require('../../assets/img/escolherImagem.png')}
                            style={styles.image}
                        />
                    )}
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="person-outline" size={24} color={COLORS.primary} style={styles.icon} />
                        <TextInput
                            placeholder='Nome Completo'
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor={COLORS.text}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="mail-outline" size={24} color={COLORS.primary} style={styles.icon} />
                        <TextInput
                            placeholder='Email'
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                            placeholderTextColor={COLORS.text}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="call-outline" size={24} color={COLORS.primary} style={styles.icon} />
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '(99) 9999-99999',
                            }}
                            placeholder='Telefone'
                            style={styles.input}
                            value={phone}
                            onChangeText={text => setPhone(text)}
                            placeholderTextColor={COLORS.text}
                            keyboardType='phone-pad'
                            maxLength={15}
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
                    <View style={styles.passwordContainer}>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="lock-closed-outline" size={24} color={COLORS.primary} style={styles.icon} />
                            <TextInput
                                placeholder='Confirme sua Senha'
                                style={styles.input}
                                placeholderTextColor={COLORS.text}
                                secureTextEntry={showConfirmPassword}
                                value={confirmPassword}
                                autoCapitalize='none'
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color={COLORS.white} />
                    ) : (
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
