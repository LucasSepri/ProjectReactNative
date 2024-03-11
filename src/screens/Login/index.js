import React from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginForm = ({ navigation }) => {
  const { control, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    navigation.navigate('Home');
    // Lógica de autenticação aqui
    console.log(data);
  };

  const goToCadastro = () => {
    // Navigate to the Cadastro screen when "Não tem conta? Registre-se" is pressed
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logar em sua conta</Text>

      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="gray" style={styles.icon} />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: 'Campo obrigatório', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email inválido' } }}
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
          name="password"
          rules={{ required: 'Campo obrigatório' }}
        />
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <Button title="Entrar" onPress={handleSubmit(onSubmit)} />

      <TouchableOpacity onPress={goToCadastro}>
        <Text style={styles.link}>Não tem conta? Registre-se</Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
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

export default LoginForm;
