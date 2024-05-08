import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { api } from '../../services/api';
import { styles } from './style';
import { COLORS } from '../../styles/COLORS';

export default function Qrcode() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getPermissions();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
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

    if (hasPermission === null) {
        return <View style={styles.centeredView}>
            <Text>Solicitando permissão da câmera</Text>
        </View>;
    }
    if (hasPermission === false) {
        return <View style={styles.centeredView}>
            <Text>Sem acesso à câmera</Text>
        </View>;
    }

    return (
        <View style={styles.modalQrcode}>
            {loading ? (
                <View style={styles.centeredView}>
                    <ActivityIndicator size={50} color={COLORS.primary} />
                </View>
            ) : (
                <Camera
                    style={StyleSheet.absoluteFill}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                />
            )}
        </View>
    );
}
