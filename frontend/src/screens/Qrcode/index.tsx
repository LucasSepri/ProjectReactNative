import React, { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, View, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { useTable } from '../../context/TableContext';
import Icon from 'react-native-vector-icons/Ionicons';

type NavigationProp = NativeStackNavigationProp<StackParamList>;

export default function Qrcode() {
  const navigation = useNavigation<NavigationProp>();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setTableNumber } = useTable();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisamos da sua permissão para mostrar a câmera</Text>
        <Button onPress={requestPermission} title="Conceder permissão" />
      </View>
    );
  }

  async function handleBarCodeScanned({ data }: { data: string }) {
    setScanned(true);
    setLoading(true);
    if (data.startsWith("&&") && !isNaN(Number(data.slice(2)))) {
      const number = data.slice(2);
      setTableNumber(number);
      try {
        navigation.goBack();
        setLoading(false);
      } catch (error) {
        tryAgain();
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
    <View style={styles.container}>
      {loading ? (
        <View style={styles.centeredView}>
          <ActivityIndicator size={50} color={COLORS.primary} />
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
          />
          <TouchableOpacity
            style={styles.squareButton}
            onPress={reloadQrcode}
          >
            <View style={styles.containerQr}>
              {/* Top Left */}
              <View style={[styles.corner, styles.topLeft]} />
              {/* Top Right */}
              <View style={[styles.corner, styles.topRight]} />
              {/* Bottom Left */}
              <View style={[styles.corner, styles.bottomLeft]} />
              {/* Bottom Right */}
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
