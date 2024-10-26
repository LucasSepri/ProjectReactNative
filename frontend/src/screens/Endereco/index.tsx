// AddressForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';

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

  const handleZipChange = async () => {
    if (zip.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setCity(data.localidade);
          setState(data.uf);
          setNeighborhood(data.bairro);
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
    setNoComplement(false);
  };
  const handleConfirmAddress = async () => {
    // Substitua este endereço pelo endereço que você deseja buscar
    const address = `${street}, ${number}, ${neighborhood}, ${city} - ${state}`;

    try {
      const response = await fetch(`https://geocode.xyz/${encodeURIComponent(address)}?json=1`);
      const data = await response.json();

      if (data.latt && data.longt) {
        const latitude = parseFloat(data.latt);  // Converte para número
        const longitude = parseFloat(data.longt); // Converte para número

        navigation.navigate('MapScreen', { address, latitude, longitude });
      } else {
        Alert.alert('Erro', 'Endereço não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
      Alert.alert('Erro', 'Erro ao buscar coordenadas.');
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Entregar em</Text>

      <View style={styles.zipContainer}>
        <TextInput
          style={styles.zipInput}
          value={zip}
          onChangeText={setZip}
          keyboardType="numeric"
          placeholder="Informe o CEP"
        />
        <Button title="Buscar" onPress={handleZipChange} />
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>Estado:</Text>
          <TextInput
            style={styles.input}
            value={state}
            editable={false}
          />
        </View>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>Cidade:</Text>
          <TextInput
            style={styles.input}
            value={city}
            editable={false}
          />
        </View>
      </View>

      <Text style={styles.label}>Endereço:</Text>
      <TextInput
        style={styles.input}
        value={street}
        onChangeText={setStreet}
      />

      <View style={styles.rowContainer}>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>Número:</Text>
          <TextInput
            style={styles.input}
            value={number}
            onChangeText={setNumber}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>Bairro:</Text>
          <TextInput
            style={styles.input}
            value={neighborhood}
            onChangeText={setNeighborhood}
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
          />
        </View>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>Não tenho:</Text>
          <Switch
            value={noComplement}
            onValueChange={setNoComplement}
            style={styles.switch}
          />
        </View>
      </View>

      <Text style={styles.label}>Ponto de Referência:</Text>
      <TextInput
        style={styles.input}
        value={referencePoint}
        onChangeText={setReferencePoint}
      />

      <Button title="Confirmar Endereço" onPress={handleConfirmAddress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  zipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  zipInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfContainer: {
    flex: 1,
    marginRight: 10,
  },
  switch: {
    alignSelf: 'center',
  },
});

export default AddressForm;
