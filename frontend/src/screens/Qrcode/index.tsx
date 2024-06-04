import React, { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, View, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import { styles } from './style'; // Parece que você está importando estilos de outro arquivo. Certifique-se de que os estilos estão corretos.


//hook
import { useNavigation } from '@react-navigation/native';

//tipagem
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';

import { api } from '../../services/api';

export default function App() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);




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

  // Função para lidar com o sucesso na leitura do QR code
  async function handleBarCodeScanned({ data }) {
    setScanned(true);
    setLoading(true);
    const number = data;

    try {
      const response = await api.post('/order', { table: Number(number) });

      navigation.navigate('Order', { number: number, order_id: response.data.id });
      
    } catch (error) {
      console.error('Erro ao abrir a mesa:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setScanned(false), 5000);
    }

  };


  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.centeredView}>
          <ActivityIndicator size={50} color={COLORS.primary} />
        </View>
      ) : (
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} // Se já foi escaneado, não chama a função de novo
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />
      )}

    </View>
  );
}
