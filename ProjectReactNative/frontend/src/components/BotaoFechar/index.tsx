import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BotaoFechar({setModalVisible, modalVisible}) {
    return (
        <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => setModalVisible(!modalVisible)}
        >
            <Text style={styles.textStyle}>Fechar</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});