import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface MapScreenProps {
  route: {
    params: {
      address: string;
      latitude: number;
      longitude: number;
    };
  };
}

const MapScreen: React.FC<MapScreenProps> = ({ route }) => {
  const { address, latitude: initialLatitude, longitude: initialLongitude } = route.params;

  const [coordinate, setCoordinate] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
  });

  // Variável para armazenar novas coordenadas
  const [newCoordinates, setNewCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    setNewCoordinates(coordinate); // Atualiza as novas coordenadas ao pressionar o mapa
  };

  const handleRedirect = () => {
    if (newCoordinates) {
      Alert.alert('Nova Posição', `Nova Latitude: ${newCoordinates.latitude}, Nova Longitude: ${newCoordinates.longitude}`);
      setCoordinate(newCoordinates); // Atualiza a posição do marcador
    } else {
      Alert.alert('Atenção', 'Por favor, selecione uma nova posição no mapa.');
    }
  };

  const handleConfirm = () => {
    Alert.alert('Endereço Confirmado', `${address}\nLatitude: ${coordinate.latitude}, Longitude: ${coordinate.longitude}`);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: initialLatitude,
          longitude: initialLongitude,
          latitudeDelta: 0.005, // Ajuste o zoom para mostrar mais detalhes da rua
          longitudeDelta: 0.005, // Ajuste o zoom para mostrar mais detalhes da rua
        }}
        onPress={handleMapPress} // Adiciona evento de toque ao mapa
      >
        <Marker coordinate={coordinate} title={address} />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Redirecionar Posição" onPress={handleRedirect} />
        <Button title="Confirmar Endereço" onPress={handleConfirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    padding: 10,
  },
});

export default MapScreen;
