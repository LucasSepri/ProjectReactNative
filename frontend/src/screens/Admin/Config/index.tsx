import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../styles/COLORS'; // Ajuste o caminho conforme necessário
import WheelColorPicker from 'react-native-wheel-color-picker'; // Importa o novo seletor de cores
import { TouchableOpacity } from 'react-native-gesture-handler';

const AdminColorScreen = () => {
    const [colors, setColors] = useState(COLORS);

    const handleColorChange = (colorKey: keyof typeof COLORS, colorValue: string) => {
        setColors({
            ...colors,
            [colorKey]: colorValue,
        });
    };

    const handleSave = () => {
        // Aqui você pode salvar as cores em AsyncStorage ou em outro lugar
        console.log('Cores salvas:', colors);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {Object.keys(colors).map((key) => (
                <View key={key} style={styles.colorInputContainer}>
                    <Text style={styles.label}>{key}</Text>
                    <View
                        style={[styles.colorDisplay, { backgroundColor: colors[key as keyof typeof COLORS] }]}
                    />
                    <WheelColorPicker
                        color={colors[key as keyof typeof COLORS]}
                        onColorChange={(color: string) => handleColorChange(key as keyof typeof COLORS, color)}
                        thumbSize={30} // Ajusta o tamanho do thumb
                        sliderSize={30} // Ajusta o tamanho do slider
                        noSnap={true}
                        row={true} // Exibe a roda de forma linear (em linha)
                        wheelLoadingIndicator={<ActivityIndicator size={40} />}
                        sliderLoadingIndicator={<ActivityIndicator size={20} />}
                        useNativeDriver={false}
                        useNativeLayout={false}
                    />
                </View>
            ))}
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSave} >
                <Text style={styles.textButton} >Salvar Cores</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    colorInputContainer: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    colorDisplay: {
        height: 40,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
        backgroundColor: COLORS.primary, // Substitua com sua cor principal
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default AdminColorScreen;
