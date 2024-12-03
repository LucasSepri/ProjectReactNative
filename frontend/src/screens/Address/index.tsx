import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
  Animated,
  Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInputMask } from 'react-native-masked-text';
import { ThemeContext } from 'styled-components';
import { useAddress } from '../../context/AddressContext';  // Importe o hook useAddress
import styles from './style';

type NavigationProp = NativeStackNavigationProp<StackParamList>;

const AddressForm = ({ route }) => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp>();
  const { address, setAddress } = useAddress();  // Obtenha address e setAddress do contexto

  const [noComplement, setNoComplement] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [isCepSearched, setIsCepSearched] = useState(false);

  const handleZipChange = async () => {
    if (address.zip.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${address.zip}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddress((prevAddress) => ({
            ...prevAddress,
            city: data.localidade,
            state: data.uf,
            neighborhood: data.bairro || '',
          }));
          setIsCepSearched(true);
        } else {
          Alert.alert('Erro', 'CEP não encontrado.');
          clearFields();
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        Alert.alert('Erro', 'Erro ao buscar o CEP.');
      }
    } else {
      Alert.alert('Atenção', 'CEP deve ter 8 dígitos.');
    }
  };

  const clearFields = () => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      city: '',
      state: '',
      neighborhood: '',
      street: '',
      number: '',
    }));
    setIsCepSearched(false);
    setNoComplement(false);
  };

  const handleConfirmAddress = async () => {
    const addressStr = `${address.street} ${address.number}, ${address.city}`;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressStr)}&format=json&addressdetails=1&limit=1`, {
        headers: {
          'User-Agent': 'CLICS/1.0 (https://projectreactnative-yxas.onrender.com)',
        },
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const data = await response.json();
      // alert(JSON.stringify(data));

      if (data.length > 0 && data[0].lat && data[0].lon) {
        // Alert.alert('Endereço encontrado', 'Endereço encontrado com sucesso.');
        const latitude = parseFloat(data[0].lat);
        const longitude = parseFloat(data[0].lon);
        // alert(`Latitude: ${latitude}, Longitude: ${longitude}`);
        navigation.navigate('MapScreen', {
          address: addressStr,
          latitude,
          longitude,
          complement: address.complement,
          referencePoint: address.referencePoint,
          zip: address.zip,
          street: address.street,
          number: address.number,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          isVisualize: false,
          addForUser: route.params.addForUser,
          returnScreen: route.params.returnScreen,
        });

      } else {
        Alert.alert('Aviso', 'Endereço não encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o endereço, tente novamente.');
      console.error('Erro ao buscar o endereço:', error);
    }
  };

  const isFormValid = () => {
    return (
      address.zip.length === 8 &&
      address.street.length > 0 &&
      address.number.length > 0 &&
      address.city.length > 0 &&
      address.state.length > 0 &&
      address.neighborhood.length > 0 &&
      (noComplement || address.complement.length > 0)
    );
  };

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
  };

  return (
    <ScrollView contentContainerStyle={styles(theme).container}>
      <Text style={styles(theme).header}>Entregar em</Text>

      <View style={styles(theme).zipContainer}>
        <TextInputMask
          type={'custom'}
          options={{
            mask: '99999999',
          }}
          placeholder='Informe o CEP'
          style={styles(theme).zipInput}
          value={address.zip}
          onChangeText={(text) => setAddress((prevAddress) => ({ ...prevAddress, zip: text }))}
          placeholderTextColor={theme.border}
          keyboardType='phone-pad'
          maxLength={8}
        />
        <TouchableOpacity style={styles(theme).searchButton} onPress={handleZipChange}>
          <Icon name="search" size={20} color={theme.white} />
        </TouchableOpacity>
      </View>

      {isCepSearched && (
        <View style={styles(theme).rowContainer}>
          <View style={styles(theme).halfContainer}>
            <Text style={styles(theme).label}>Estado:</Text>
            <TextInput style={styles(theme).input} value={address.state} editable={false} />
          </View>
          <View style={styles(theme).halfContainer}>
            <Text style={styles(theme).label}>Cidade:</Text>
            <TextInput style={styles(theme).input} value={address.city} editable={false} />
          </View>
        </View>
      )}

      <Text style={styles(theme).label}>Endereço:</Text>
      <TextInput
        style={styles(theme).input}
        value={address.street}
        onChangeText={(text) => setAddress((prevAddress) => ({ ...prevAddress, street: text }))}
        placeholder="Informe o nome da rua"
      />

      <View style={styles(theme).rowContainer}>
        <View style={[styles(theme).halfContainer, { marginRight: 10 }]}>
          <Text style={styles(theme).label}>Número:</Text>
          <TextInput
            style={styles(theme).input}
            value={address.number}
            onChangeText={(text) => setAddress((prevAddress) => ({ ...prevAddress, number: text }))}
            keyboardType="numeric"
            placeholder="Informe o número"
          />
        </View>
        <View style={styles(theme).halfContainer}>
          <Text style={styles(theme).label}>Bairro:</Text>
          <TextInput
            style={styles(theme).input}
            value={address.neighborhood}
            onChangeText={(text) => setAddress((prevAddress) => ({ ...prevAddress, neighborhood: text }))}
            placeholder="Informe o bairro"
          />
        </View>
      </View>

      <View style={styles(theme).rowContainer}>
        <View style={styles(theme).halfContainer}>
          <Text style={styles(theme).label}>Complemento:</Text>
          <TextInput
            style={styles(theme).input}
            value={noComplement ? 'N/A' : address.complement}
            onChangeText={(text) => setAddress((prevAddress) => ({ ...prevAddress, complement: text }))}
            editable={!noComplement}
            placeholder="Informe o complemento (opcional)"
          />
        </View>
        <View style={styles(theme).halfContainerNo}>
          <Text style={styles(theme).label}>Não tenho:</Text>
          <Switch
            value={noComplement}
            onValueChange={() => {
              setNoComplement(!noComplement);
              startAnimation();
            }}
            style={styles(theme).switch}
          />
        </View>
      </View>

      <Text style={styles(theme).label}>Ponto de Referência:</Text>
      <TextInput
        style={styles(theme).input}
        value={address.referencePoint}
        onChangeText={(text) => setAddress((prevAddress) => ({ ...prevAddress, referencePoint: text }))}
        placeholder="Informe um ponto de referência"
      />

      <TouchableOpacity
        style={[styles(theme).confirmButton, !isFormValid() && styles(theme).disabledButton]}
        onPress={handleConfirmAddress}
        disabled={!isFormValid()}
      >
        <Animated.Text style={[styles(theme).confirmButtonText, animatedStyle]}>Confirmar Endereço</Animated.Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddressForm;
