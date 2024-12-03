import React, { useState, useEffect, useContext } from 'react';
import { Camera, CameraView } from 'expo-camera';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { useTable } from '../../context/TableContext';
import { ThemeContext } from 'styled-components';

type NavigationProp = NativeStackNavigationProp<StackParamList>;

export default function Qrcode() {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp>();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setTableNumber } = useTable();

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Não foi possível acessar a câmera, permita nas configurações do seu dispositivo', [
          {
            text: "OK",
            onPress: () => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            },
            style: "cancel",
          },
        ]);
      }
    };

    requestCameraPermission();
  }, []);

  async function handleBarCodeScanned({ data }: { data: string }) {
    setScanned(true);
    setLoading(true);
    if (data.startsWith("&&") && !isNaN(Number(data.slice(2)))) {
      const number = data.slice(2);
      setTableNumber(number);
      try {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      } catch (error) {
        tryAgain();
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert(
        "Código inválido",
        "O código lido não é válido. Tente novamente.",
        [
          {
            text: "OK",
            onPress: () => tryAgain(),
            style: "cancel",
          },
        ]
      );
    }
  }


  function tryAgain() {
    setScanned(false);
    setLoading(false);
  }

  function reloadQrcode() {
    setScanned(false);
    setLoading(false);
  }

  return (
    <View style={styles(theme).container}>
      {loading ? (
        <View style={styles(theme).centeredView}>
          <ActivityIndicator size={50} color={theme && theme.primary} />
        </View>
      ) : (
        <View style={styles(theme).cameraContainer}>
          <View style={styles(theme).cameraHeader}>
            <Text style={styles(theme).cameraHeaderText}>
              Aproxime a câmera do QRCode para escanear
            </Text>
          </View>
          <CameraView
            style={styles(theme).camera}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
          />
          <TouchableOpacity
            style={styles(theme).squareButton}
            onPress={reloadQrcode}
          >
            <View style={styles(theme).containerQr}>
              {/* Top Left */}
              <View style={[styles(theme).corner, styles(theme).topLeft]} />
              {/* Top Right */}
              <View style={[styles(theme).corner, styles(theme).topRight]} />
              {/* Bottom Left */}
              <View style={[styles(theme).corner, styles(theme).bottomLeft]} />
              {/* Bottom Right */}
              <View style={[styles(theme).corner, styles(theme).bottomRight]} />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
