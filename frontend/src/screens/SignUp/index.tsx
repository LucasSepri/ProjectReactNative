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

export default function SignUp() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { signIn } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
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
        if (name === '' || email === '' || password === '') {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }
        setLoading(true);

        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone); // Adiciona o campo phone ao FormData
        formData.append('address', address); // Adiciona o campo address ao FormData

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
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert("Erro", "Erro ao criar conta. Por favor, tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <TouchableOpacity onPress={pickImageAsync} style={styles.imagePicker}>
                {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                ) : (
                    <Text style={styles.uploadText}>Upload sua foto</Text>
                )}
            </TouchableOpacity>

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
                autoCapitalize='none'
                placeholderTextColor={'#F0F0F0'}
            />
            <TextInput
                placeholder='Telefone'
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                autoCapitalize='none'
                placeholderTextColor={'#F0F0F0'}
            />
            <TextInput
                placeholder='Endereço'
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                autoCapitalize='none'
                placeholderTextColor={'#F0F0F0'}
            />
            <TextInput
                placeholder='Senha'
                style={styles.input}
                placeholderTextColor={'#F0F0F0'}
                secureTextEntry={true}
                value={password}
                autoCapitalize='none'
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
    imagePicker: {
        borderWidth: 1,
        borderColor: 'gray',
        borderStyle: 'dashed',
        borderRadius: 5,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    uploadText: {
        color: 'gray',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 5,
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
