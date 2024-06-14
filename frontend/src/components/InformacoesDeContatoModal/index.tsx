import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const UserDetailsModal = ({ isVisible, onClose, onSubmit, navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isEnteringAddress, setIsEnteringAddress] = useState(false); // Estado para controlar se está digitando o endereço
  const [isChoosingQRCode, setIsChoosingQRCode] = useState(false); // Estado para controlar se está escolhendo QR Code

  const handleConfirm = () => {
    if (name && phone && (address || isChoosingQRCode)) {
      const finalAddress = isEnteringAddress ? address : 'QR Code'; // Ajuste aqui conforme necessário
      onSubmit({ name, phone, address: finalAddress });
      onClose();
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleToggleAddressInput = () => {
    setIsEnteringAddress(!isEnteringAddress);
    setIsChoosingQRCode(false); // Garantir que QR Code esteja desativado se mudar para digitar endereço
    setAddress(''); // Limpar o endereço ao mudar de ideia
  };

  const handleOpenQRCode = () => {
    setIsChoosingQRCode(true);
    setIsEnteringAddress(false); // Garantir que digitar endereço esteja desativado se escolher QR Code
    onClose(); // Fechar o modal ao escolher QR Code
    navigation.navigate('Qrcode'); // Navegar para a tela de QR Code
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Preencha seus dados</Text>
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Telefone de contato"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />
        {isEnteringAddress && (
          <TextInput
            placeholder="Digite seu endereço"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleToggleAddressInput}
            style={[styles.button, isEnteringAddress ? styles.activeButton : null]}
          >
            <Text style={styles.buttonText}>Endereço</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleOpenQRCode}
            style={[styles.button, isChoosingQRCode ? styles.activeButton : null]}
          >
            <Text style={styles.buttonText}>QR Code</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    margin: 20,
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 300
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 300,
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  activeButton: {
    backgroundColor: COLORS.secondary, // Cor diferente para o botão ativo
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: 300
  },
  confirmButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 300
  },
  cancelButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default UserDetailsModal;
