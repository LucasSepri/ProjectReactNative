import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,

} from "react-native";
import COLORS from "../../styles/COLORS";

export default function Signin() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu Email"
          placeholderTextColor={COLORS.lightGrey}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua Senha"
          placeholderTextColor={COLORS.lightGrey}
        />


        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Acessar</Text>
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
    backgroundColor: COLORS.dark,
  },
  logo: {
    borderRadius: 100,
    width: 150,
    height: 150,
    marginBottom: 18,
  },
  

  inputContainer:{
    width: '95%',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input: {
    width: '95%',
    height: 40,
    backgroundColor: COLORS.dark2,
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: COLORS.white,
  },
  button:{

  },
  buttonText: {

  }
}); 