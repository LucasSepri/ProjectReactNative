import React, { useContext, useState } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../routes/app.routes';
import styles from './style';
import { ThemeContext } from 'styled-components';
import { useAddress } from '../../context/AddressContext';  // Importa o hook useAddress


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
      addForUser?: boolean;
      returnScreen?: string;
    };
  };
}

const MapScreen: React.FC = ({ route, navigation }: any) => {
  const theme = useContext(ThemeContext);
  const { address, setAddress } = useAddress(); // Obtém o endereço do contexto
  const [coordinate, setCoordinate] = useState({
    latitude: route.params.latitude,
    longitude: route.params.longitude,
  });
  const [tempCoordinate, setTempCoordinate] = useState(coordinate);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleConfirm = () => {
    setIsRedirecting(false);
    setCoordinate(tempCoordinate);
    Alert.alert('Localização confirmada', 'Agora você pode salvar o endereço.');
  };
  const handleReturn = () => {
    if (route.params.returnScreen === 'Carrinho') {
      navigation.navigate('Inicio', { screen: 'Carrinho' });
    } else if (route.params.returnScreen) {
      navigation.navigate(route.params.returnScreen);
      console.log(route.params.returnScreen);
    } else {
      navigation.popToTop();
    }
  };



  const handleSaveAddress = async () => {
    const { zip, street, number, neighborhood, city, state, complement, referencePoint } = route.params;

    // Verifica se todos os campos estão preenchidos antes de salvar
    if (!zip || !street || !number || !neighborhood || !city || !state || !coordinate.latitude || !coordinate.longitude) {
      Alert.alert('Erro', 'Por favor, complete todos os campos antes de salvar.');
      return;
    }

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
            if (route.params.addForUser == true) {
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
                Alert.alert('Sucesso', 'Endereço salvo com sucesso!', [{
                  text: 'OK',
                  onPress: handleReturn,
                }]);
              } catch (error) {
                Alert.alert('Erro', 'Não foi possível salvar o endereço.');
                console.error(error);
              }
            } else {
              setAddress({
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
                address: address.street + ', ' + address.number + ', ' + address.city,
              })
              handleReturn();
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

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    const newCoordinate = JSON.parse(event.nativeEvent.data);
    setTempCoordinate(newCoordinate);
  };

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).header}>
        <Text style={styles(theme).headerText}>
          {!route.params.isVisualize ? (
            isRedirecting ? 'Arraste o marcador até o local correto' : 'Confirme o local do seu endereço'
          ) : 'Local do Endereço'}
        </Text>
        <Text style={styles(theme).addressText}>{route.params.address}</Text>
      </View>

      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles(theme).webView}
        onMessage={handleWebViewMessage}
      />

      {!route.params.isVisualize && (
        <View style={styles(theme).buttonContainer}>
          {isRedirecting ? (
            <TouchableOpacity style={styles(theme).button} onPress={handleConfirm}>
              <Text style={styles(theme).buttonText}>Confirmar Nova Posição</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles(theme).button} onPress={() => setIsRedirecting(true)}>
                <Text style={styles(theme).buttonText}>Ajustar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles(theme).button} onPress={handleSaveAddress}>
                <Text style={styles(theme).buttonText}>Salvar Endereço</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default MapScreen;
