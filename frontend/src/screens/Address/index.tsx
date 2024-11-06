import React, { useEffect, useState } from 'react';
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
import { COLORS } from '../../styles/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInputMask } from 'react-native-masked-text';
import styles from './style';

type NavigationProp = NativeStackNavigationProp<StackParamList>;

const AddressForm = ({ route }) => {
  const navigation = useNavigation<NavigationProp>();
  const [zip, setZip] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [complement, setComplement] = useState('');
  const [referencePoint, setReferencePoint] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [noComplement, setNoComplement] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [isCepSearched, setIsCepSearched] = useState(false);

  const handleZipChange = async () => {
    if (zip.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setCity(data.localidade);
          setState(data.uf);
          setNeighborhood(data.bairro || '');
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
    setCity('');
    setState('');
    setNeighborhood('');
    setStreet('');
    setNumber('');
    setIsCepSearched(false);
    setNoComplement(false);
  };

  const handleConfirmAddress = async () => {
    const address = `${street} ${number}, ${city}`;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`, {
        headers: {
          'User-Agent': 'CLICS/1.0 (https://projectreactnative-yxas.onrender.com)',
        },
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const data = await response.json();

      if (data.length > 0 && data[0].lat && data[0].lon) {
        const latitude = parseFloat(data[0].lat);
        const longitude = parseFloat(data[0].lon);
        navigation.navigate('MapScreen', { address, latitude, longitude, complement, referencePoint, zip, street, number, neighborhood, city, state, isVisualize: false });
      } else {
        Alert.alert('Aviso', 'Endereço não encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o endereço, tente novamente.');
    }
  };

  const isFormValid = () => {
    return (
      zip.length === 8 &&
      street.length > 0 &&
      number.length > 0 &&
      city.length > 0 &&
      state.length > 0 &&
      neighborhood.length > 0 &&
      (noComplement || complement.length > 0)
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Entregar em</Text>

      <View style={styles.zipContainer}>
        <TextInputMask
          type={'custom'}
          options={{
            mask: '99999999',
          }}
          placeholder='Informe o CEP'
          style={styles.zipInput}
          value={zip}
          onChangeText={setZip}
          placeholderTextColor={COLORS.border}
          keyboardType='phone-pad'
          maxLength={8}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleZipChange}>
          <Icon name="search" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {isCepSearched && (
        <View style={styles.rowContainer}>
          <View style={styles.halfContainer}>
            <Text style={styles.label}>Estado:</Text>
            <TextInput style={styles.input} value={state} editable={false} />
          </View>
          <View style={styles.halfContainer}>
            <Text style={styles.label}>Cidade:</Text>
            <TextInput style={styles.input} value={city} editable={false} />
          </View>
        </View>
      )}

      <Text style={styles.label}>Endereço:</Text>
      <TextInput
        style={styles.input}
        value={street}
        onChangeText={setStreet}
        placeholder="Informe o nome da rua"
      />

      <View style={styles.rowContainer}>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>Número:</Text>
          <TextInput
            style={styles.input}
            value={number}
            onChangeText={setNumber}
            keyboardType="numeric"
            placeholder="Informe o número"
          />
        </View>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>Bairro:</Text>
          <TextInput
            style={styles.input}
            value={neighborhood}
            onChangeText={setNeighborhood}
            placeholder="Informe o bairro"
          />
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>Complemento:</Text>
          <TextInput
            style={styles.input}
            value={noComplement ? 'N/A' : complement}
            onChangeText={setComplement}
            editable={!noComplement}
            placeholder="Informe o complemento (opcional)"
          />
        </View>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>Não tenho:</Text>
          <Switch
            value={noComplement}
            onValueChange={() => {
              setNoComplement(!noComplement);
              startAnimation();
            }}
            style={styles.switch}
          />
        </View>
      </View>

      <Text style={styles.label}>Ponto de Referência:</Text>
      <TextInput
        style={styles.input}
        value={referencePoint}
        onChangeText={setReferencePoint}
        placeholder="Informe um ponto de referência"
      />

      <TouchableOpacity
        style={[styles.confirmButton, !isFormValid() && styles.disabledButton]}
        onPress={handleConfirmAddress}
        disabled={!isFormValid()}
      >
        <Animated.Text style={[styles.confirmButtonText, animatedStyle]}>Confirmar Endereço</Animated.Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



export default AddressForm;
