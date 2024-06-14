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

export default function EditarPerfil() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phone, setPhone] = useState(user.phone); // Novo estado para o telefone
  const [address, setAddress] = useState(user.address); // Novo estado para o endereço
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(`${api.defaults.baseURL}/files/${user.profileImage}`);

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

  async function handleUpdateProfile() {
    setLoading(true);

    if (newPassword && !currentPassword) {
      Alert.alert("Erro", "Por favor, preencha a senha atual para alterar a senha.");
      setLoading(false);
      return;
    }

    let formData = new FormData();
    formData.append('userId', user.id);

    // Adicione apenas os campos que foram alterados
    if (name !== user.name) formData.append('name', name);
    if (email !== user.email) formData.append('email', email);
    if (phone !== user.phone) formData.append('phone', phone); // Adicionando o campo de telefone
    if (address !== user.address) formData.append('address', address); // Adicionando o campo de endereço
    if (newPassword && currentPassword) {
      formData.append('currentPassword', currentPassword);
      formData.append('newPassword', newPassword);
    } else if (newPassword && !currentPassword) {
      Alert.alert("Erro", "Por favor, preencha a senha atual para alterar a senha.");
      setLoading(false);
      return;
    }

    if (selectedImage && selectedImage !== `${api.defaults.baseURL}/files/${user.profileImage}`) {
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
        setLoading(false);
        return;
      }
    }

    try {
      const response = await api.put('/me/update', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      });
      setUser(response.data);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert("Erro", "Erro ao atualizar perfil. Por favor, tente novamente mais tarde.");
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
        placeholderTextColor={'#F0F0F0'}
      />
      <TextInput
        placeholder='Endereço'
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholderTextColor={'#F0F0F0'}
      />
      <TextInput
        placeholder='Senha Atual'
        style={styles.input}
        placeholderTextColor={'#F0F0F0'}
        secureTextEntry={true}
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        placeholder='Nova Senha'
        style={styles.input}
        placeholderTextColor={'#F0F0F0'}
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Salvar</Text>
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
    color: '#FFF',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  imagePicker: {
    backgroundColor: '#101026',
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
