import React, { useState, useRef, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import Svg, { G, Path, Polygon, Rect } from 'react-native-svg';
import theme from '../../../styles/theme';
import { ThemeContext } from 'styled-components/native';

interface ThemeProps {
    primary: string;
    text: string;
    background: string;
    border: string;
}

interface DefaultSvgIconProps {
    theme: ThemeProps;
}

const DefaultSvgIcon: React.FC<DefaultSvgIconProps> = ({ theme }) => (
    <Svg id="Livello_1" x="0px" y="0px" width="200px" height="200px" viewBox="-260 40 520 520" style={{ width: '100%', height: '100%' }}>
        <G>
            <Polygon id="XMLID_14_" fill={theme.primary} points="100,360 60,360 60,320 20.1,320 20.1,440.1 60,440.1 60,480 100,480 	" />
            <Rect id="XMLID_13_" x="100" y="480" fill={theme.primary} width="40" height="40" />
            <Rect id="XMLID_12_" x="179.9" y="480" fill={theme.primary} width="40" height="40" />
            <Polygon id="XMLID_11_" fill={theme.primary} points="220,320 179.9,320 179.9,360 139.9,360 139.9,480 179.9,480 179.9,440.1 220,440.1" />
            <Rect id="XMLID_10_" x="20.1" y="480" fill={theme.primary} width="40" height="40" />
            <G>
                <Rect id="XMLID_9_" x="-139.9" y="159.9" fill={theme.primary} width="40" height="40" />
                <Path fill={theme.primary} d="M-220,80v200h199.9V80H-220z M-60,239.9h-119.9V120h120v119.9H-60z" />
            </G>
            <G>
                <Rect id="XMLID_6_" x="100" y="159.9" fill={theme.primary} width="40" height="40" />
                <Path fill={theme.primary} d="M20.1,80v200H220V80H20.1z M179.9,239.9H60V120h120v119.9H179.9z" />
            </G>
            <G>
                <Rect id="XMLID_3_" x="-139.9" y="399.9" width="40" height="40" fill={theme.primary} />
                <Path fill={theme.primary} d="M-220,320v200h199.9V320H-220z M-60,480h-119.9V360h120V480H-60z" />
            </G>
        </G>
    </Svg>
);

const QRCodeGenerator: React.FC = () => {
    const theme = useContext(ThemeContext) as ThemeProps;
    const [inputText, setInputText] = useState<string>('');
    const [qrValue, setQrValue] = useState<string>('');
    const qrRef = useRef<View | null>(null);

    const generateQRCode = (text: string): void => {
        setQrValue(text ? `&&${text}` : '');
    };

    const saveQRCodeAsPNG = async (): Promise<void> => {
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

    const handleInputChange = (text: string): void => {
        const numericText = text.replace(/[^0-9]/g, '');
        setInputText(numericText);
        generateQRCode(numericText);
    };

    return (
        <View style={styles(theme).container}>
            <Text style={styles(theme).title}>Gerador de QR Code</Text>
            <View ref={qrRef} style={styles(theme).qrCodeContainer}>
                {qrValue ? (
                    <QRCode
                        value={qrValue}
                        size={180}
                        backgroundColor="white"
                        color="black"
                    />
                ) : (
                    <DefaultSvgIcon theme={theme} />
                )}
            </View>
            <TextInput
                style={styles(theme).input}
                placeholder="Digite o número da Mesa"
                placeholderTextColor={theme.text}
                value={inputText}
                onChangeText={handleInputChange}
                keyboardType="numeric"
            />
            <TouchableOpacity
                style={[styles(theme).button, qrValue ? {} : styles(theme).disabledButton]}
                onPress={qrValue ? saveQRCodeAsPNG : undefined}
                disabled={!qrValue}
            >
                <Text style={styles(theme).buttonText}>Salvar como PNG</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: theme.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.primary,
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: theme.border,
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
        width: 240,
        height: 240,
        elevation: 3,
        marginBottom: 20,
    },
    button: {
        backgroundColor: theme.primary,
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: theme.border,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default QRCodeGenerator;
