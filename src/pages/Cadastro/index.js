import React, { useState } from 'react';
import { View, TextInput, Image, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const RegistrationForm = () => {
  const { control, handleSubmit, setError, formState: { errors } } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = (data) => {
    // Lógica de registro aqui
    console.log(data);
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.error('Erro ao escolher a imagem:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={selectedImage ? { uri: selectedImage } : require('../../../assets/img/escolherImagem.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Icon name="person-outline" size={20} color="gray" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nome"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          </View>
        )}
        name="name"
        rules={{ required: 'Campo obrigatório' }}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Icon name="mail-outline" size={20} color="gray" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          </View>
        )}
        name="email"
        rules={{ required: 'Campo obrigatório', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email inválido' } }}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Icon name="call-outline" size={20} color="gray" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          </View>
        )}
        name="phone"
        rules={{ required: 'Campo obrigatório' }}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Icon name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          </View>
        )}
        name="password"
        rules={{ required: 'Campo obrigatório' }}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Icon name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Senha"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          </View>
        )}
        name="confirmPassword"
        rules={{
          required: 'Campo obrigatório',
          validate: (value) => value === control.fieldsRef.current.password.value || 'As senhas não coincidem',
        }}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

      <Button title="Cadastrar" onPress={handleSubmit(onSubmit)} />

      <TouchableOpacity>
        <Text style={styles.link}>Já tem cadastro? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  link: {
    color: 'blue',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegistrationForm;
