import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import Svg, { G, Path, Polygon, Rect } from 'react-native-svg';
import { COLORS } from '../../../styles/COLORS';

const DefaultSvgIcon = () => (
    <Svg id="Livello_1" x="0px" y="0px" width="200px" height="200px" viewBox="-260 40 520 520" style={{ width: '100%', height: '100%' }}>
        <G>
            <Polygon id="XMLID_14_" fill={COLORS.border} points="100,360 60,360 60,320 20.1,320 20.1,440.1 60,440.1 60,480 100,480 	" />
            <Rect id="XMLID_13_" x="100" y="480" fill={COLORS.border} width="40" height="40" />
            <Rect id="XMLID_12_" x="179.9" y="480" fill={COLORS.border} width="40" height="40" />
            <Polygon id="XMLID_11_" fill={COLORS.border} points="220,320 179.9,320 179.9,360 139.9,360 139.9,480 179.9,480 179.9,440.1 220,440.1" />
            <Rect id="XMLID_10_" x="20.1" y="480" fill={COLORS.border} width="40" height="40" />
            <G>
                <Rect id="XMLID_9_" x="-139.9" y="159.9" fill={COLORS.border} width="40" height="40" />
                <Path fill={COLORS.border} d="M-220,80v200h199.9V80H-220z M-60,239.9h-119.9V120h120v119.9H-60z" />
            </G>
            <G>
                <Rect id="XMLID_6_" x="100" y="159.9" fill={COLORS.border} width="40" height="40" />
                <Path fill={COLORS.border} d="M20.1,80v200H220V80H20.1z M179.9,239.9H60V120h120v119.9H179.9z" />
            </G>
            <G>
                <Rect id="XMLID_3_" x="-139.9" y="399.9" width="40" height="40" fill={COLORS.border} />
                <Path fill={COLORS.border} d="M-220,320v200h199.9V320H-220z M-60,480h-119.9V360h120V480H-60z" />
            </G>
        </G>
    </Svg>
);

const QRCodeGenerator = () => {
    const [inputText, setInputText] = useState('');
    const [qrValue, setQrValue] = useState('');
    const qrRef = useRef();

    const generateQRCode = (text) => {
        if (text) {
            const newQrValue = "&&" + text;
            setQrValue(newQrValue);
        } else {
            setQrValue('');
        }
    };

    const saveQRCodeAsPNG = async () => {
        if (qrRef.current) {
            try {
                const uri = await captureRef(qrRef, {
                    format: 'png',
                    quality: 0.8,
                });
                const tempPath = `${FileSystem.documentDirectory}/QRCode.png`;
                await FileSystem.moveAsync({ from: uri, to: tempPath });
                await Sharing.shareAsync(tempPath, {
                    mimeType: 'image/png',
                    dialogTitle: 'Salvar QR Code como PNG',
                });
                console.log(`QR Code gerado e disponível para salvar em: ${tempPath}`);
            } catch (error) {
                console.error("Erro ao salvar o QR Code:", error);
            }
        }
    };

    const handleInputChange = (text) => {
        const numericText = text.replace(/[^0-9]/g, '');
        setInputText(numericText);
        generateQRCode(numericText);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerador de QR Code</Text>
            <View ref={qrRef} style={styles.qrCodeContainer}>
                {qrValue ? (
                    <QRCode
                        value={qrValue}
                        size={180} // Tamanho do QR Code ajustado
                        backgroundColor="white"
                        color="black"
                    />
                ) : (
                    <DefaultSvgIcon />
                )}
            </View>
            <TextInput
                style={styles.input}
                placeholder="Digite o numero da Mesa"
                placeholderTextColor={COLORS.text}
                value={inputText}
                onChangeText={handleInputChange}
                keyboardType="numeric"
            />
            <TouchableOpacity 
                style={[styles.button, qrValue ? {} : styles.disabledButton]} 
                onPress={qrValue ? saveQRCodeAsPNG : null} 
                disabled={!qrValue}
            >
                <Text style={styles.buttonText}>Salvar como PNG</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.background, // Fundo claro
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.secondary, // Azul escuro
        marginBottom: 30, // Aumentado para dar mais espaço
    },
    input: {
        height: 50,
        borderColor: COLORS.border, // Cinza para bordas
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: 'white',
    },
    qrCodeContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        width: 240, // Largura ligeiramente aumentada
        height: 240, // Altura ligeiramente aumentada
        elevation: 3, // Sombra para um efeito de profundidade
        marginBottom: 20, // Adicionado espaço abaixo do QR Code
    },
    button: {
        backgroundColor: COLORS.primary, // Cor do botão
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: COLORS.border, // Cor de fundo quando desativado
    },
    buttonText: {
        color: 'white', 
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default QRCodeGenerator;
