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
import styles from './style'; // Usar o mesmo estilo do SignUp
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarPerfil() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setphone] = useState(user.phone);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(`${api.defaults.baseURL}${user.profileImage}`);

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

  async function handleUpdateProfile(attempt = 0) {
    setLoading(true);
    let formData = new FormData();
    formData.append('userId', user.id);

    // Reseta o contador de tentativas se o perfil foi editado
    if (name !== user.name || email !== user.email || phone !== user.phone || password || selectedImage) {
      attempt = 0;
    }

    if (name !== user.name) formData.append('name', name);
    if (email !== user.email) formData.append('email', email);
    if (phone !== user.phone) formData.append('phone', phone);
    if (password) {
      formData.append('password', password);
    }

    if (selectedImage && selectedImage !== `${api.defaults.baseURL}${user.profileImage}`) {
      try {
        const fileInfo = await FileSystem.getInfoAsync(selectedImage);

        if (!fileInfo.exists) {
          throw new Error('File does not exist');
        }

        const fileUri = fileInfo.uri;
        const fileType = fileUri.split('.').pop() === 'jpg' ? 'image/jpeg' : 'image/png';
        const fileName = fileUri.split('/').pop();

        formData.append('profileImage', {
          uri: fileUri,
          name: fileName,
          type: fileType,
        } as any);
      } catch (error) {
        console.error('Error getting file info:', error);
        Alert.alert('Erro', 'Erro ao obter informações do arquivo');
        setLoading(false);
        return;
      }
    }

    try {
      const response = await api.put(`/users/${user.id}`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      // Verifique se a resposta contém a nova imagem
      const updatedUser = {
        ...response.data,
        token: user.token, // Mantenha o token existente
        profileImage: response.data.profileImage || user.profileImage, // Atualize a imagem se houver
      };

      setUser(updatedUser);
      await AsyncStorage.setItem('@token', JSON.stringify(updatedUser)); // Atualize o AsyncStorage

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      if (error.isAxiosError) {
        if (error.message === 'Network Error' && attempt < 2) {
          handleUpdateProfile(attempt + 1);
        } else {
          console.error('Error updating profile:', error);
          Alert.alert("Erro", "Erro ao atualizar perfil. Por favor, tente novamente mais tarde.");
        }
      } else {
        Alert.alert("Erro", "Ocorreu um erro inesperado. Por favor, tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }





  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

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
          placeholderTextColor={COLORS.text}
        />
        <TextInput
          placeholder='Email'
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          placeholderTextColor={COLORS.text}
        />
        <TextInputMask
          type={'custom'}
          options={{
            mask: '(99) 9999-99999', // Máscara do telefone
          }}
          placeholder='Telefone'
          style={styles.input}
          value={phone}
          onChangeText={text => setphone(text)}
          placeholderTextColor={COLORS.text}
          keyboardType='phone-pad' // Define o teclado para números
          maxLength={15} // Limita o tamanho do campo
        />
        <TextInput
          placeholder='Nova Senha'
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={COLORS.text}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleUpdateProfile(0)} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          <Text style={styles.buttonText}>Salvar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
