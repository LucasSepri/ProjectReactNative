import React, { useState, useRef } from 'react';
import { View, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker, Region } from 'react-native-maps';
import { COLORS } from '../../styles/COLORS';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';

type NavigationProp = NativeStackNavigationProp<StackParamList>;

interface MapScreenProps {
  route: {
    params: {
      address: string;
      latitude: number;
      longitude: number;
      zip: string;
      street: string;
      number: string;
      neighborhood: string;
      city: string;
      state: string;
      referencePoint: string;
      complement: string;
      isVisualize: boolean;
    };
  };
}

const MapScreen: React.FC<MapScreenProps> = ({ route }) => {
  const { address, latitude: initialLatitude, longitude: initialLongitude, zip, street, number, neighborhood, city, state, referencePoint, complement } = route.params;

  const [coordinate, setCoordinate] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
  });
  const [tempCoordinate, setTempCoordinate] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
  });

  const [isRedirecting, setIsRedirecting] = useState(false);
  const mapRef = useRef<MapView | null>(null);
  const navigation = useNavigation<NavigationProp>();

  const handleRegionChangeComplete = (region: Region) => {
    setTempCoordinate({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  const handleRedirect = () => {
    setIsRedirecting(true);
  };

  const handleConfirm = () => {
    setIsRedirecting(false);
    setCoordinate(tempCoordinate);
    Alert.alert('Localização confirmada', 'Agora você pode salvar o endereço.');
  };

  const handleSaveAddress = async () => {
    Alert.alert(
      'Confirmação',
      `Deseja salvar o endereço?\n\n` +
      `📍 CEP: ${zip}\n` +
      `🏠 Rua: ${street}\n` +
      `#️⃣ Número: ${number}\n` +
      `🌆 Bairro: ${neighborhood}\n` +
      `🌍 Cidade: ${city}\n` +
      `🌐 Estado: ${state}\n` +
      `📌 Latitude: ${coordinate.latitude}\n` +
      `📌 Longitude: ${coordinate.longitude}`,
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Salvar',
          onPress: async () => {
            try {
              await api.post('/addresses', {
                zip,
                street,
                number,
                neighborhood,
                city,
                state,
                complement,
                referencePoint,
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
              });
              Alert.alert('Sucesso', 'Endereço salvo com sucesso!', [{ text: 'OK', onPress: () => navigation.navigate('Perfil') }]);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível salvar o endereço.');
              console.error(error);
            }
          },
        },
      ],
      { cancelable: false }
    );

  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {!route.params.isVisualize ? (
            isRedirecting ? 'Arraste o mapa até o local correto' : 'Confirme o local do seu endereço'
          ) : 'Local do Endereço'}
        </Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: initialLatitude,
          longitude: initialLongitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        <Marker coordinate={coordinate}>
          <View style={styles.markerContainer}>
            <Icon name="place" style={styles.fixedMarkerIcon} />
            <View style={styles.markerShadow} />
          </View>
        </Marker>
      </MapView>

      {isRedirecting && (
        <View style={styles.centerMarkerContainer}>
          <Icon name="place" style={styles.movableMarkerIcon} />
        </View>
      )}

      {!route.params.isVisualize && (
        <View style={styles.buttonContainer}>
          {isRedirecting ? (
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirmar Nova Posição</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={handleRedirect}>
                <Text style={styles.buttonText}>Ajustar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
                <Text style={styles.buttonText}>Salvar Endereço</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  header: {
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    alignItems: 'center',
    shadowColor: COLORS.grey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  addressText: {
    fontSize: 16,
    color: COLORS.darkGrey,
    textAlign: 'center',
    marginTop: 4,
  },
  map: {
    flex: 1,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  centerMarkerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -4,
    marginTop: -20,
    alignItems: 'center',
  },
  markerContainer: {
    alignItems: 'center',
  },
  fixedMarkerIcon: {
    color: COLORS.primary,
    fontSize: 40,
    marginBottom: -8,
    zIndex: 1,
  },
  markerShadow: {
    height: 8,
    width: 8,
    backgroundColor: COLORS.black,
    borderRadius: 100,
    opacity: 0.4,
  },
  movableMarkerIcon: {
    color: COLORS.blue,
    fontSize: 40,
    marginBottom: -8,
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: COLORS.grey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MapScreen;
