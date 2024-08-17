import React, { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, View, Text, ActivityIndicator, Alert } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { useTable } from '../../context/TableContext';
import { set } from 'react-hook-form';

type NavigationProp = NativeStackNavigationProp<StackParamList, 'Qrcode'>;

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
    // Verifica se o QR code contém '&&' seguido de números
    if (data.startsWith("&&") && !isNaN(Number(data.slice(2)))) {
      const number = data.slice(2); // Remove os caracteres '&&'
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
            text: "OK", onPress: () => tryAgain(),
            style: "cancel"
          },
        ]
      );

    }
  }

  function tryAgain() {
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
        <CameraView
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
      )}
    </View>
  );
}
