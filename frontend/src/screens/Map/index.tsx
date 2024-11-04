import React, { useState } from 'react';
import { View, Alert,  Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import styles from './style';

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
  const [tempCoordinate, setTempCoordinate] = useState(coordinate);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigation = useNavigation<NavigationProp>();

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

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <style>
          body, html, #map {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
          }
          #map {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <script>
          let map, marker;
          function initializeMap() {
            map = L.map('map').setView([${coordinate.latitude}, ${coordinate.longitude}], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: 'Map data © OpenStreetMap contributors'
            }).addTo(map);

            marker = L.marker([${coordinate.latitude}, ${coordinate.longitude}], { draggable: ${isRedirecting} }).addTo(map);
            marker.on('dragend', function(e) {
              const { lat, lng } = e.target.getLatLng();
              window.ReactNativeWebView.postMessage(JSON.stringify({ latitude: lat, longitude: lng }));
            });
          }
          document.addEventListener('DOMContentLoaded', initializeMap);
        </script>
      </body>
    </html>
  `;

  const handleWebViewMessage = (event) => {
    const newCoordinate = JSON.parse(event.nativeEvent.data);
    setTempCoordinate(newCoordinate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {!route.params.isVisualize ? (
            isRedirecting ? 'Arraste o marcador até o local correto' : 'Confirme o local do seu endereço'
          ) : 'Local do Endereço'}
        </Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>

      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webView}
        onMessage={handleWebViewMessage}
      />

      {!route.params.isVisualize && (
        <View style={styles.buttonContainer}>
          {isRedirecting ? (
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirmar Nova Posição</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={() => setIsRedirecting(true)}>
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

export default MapScreen;
