import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../styles/COLORS';

export default function BotaoAdicionar() {
    return (

        <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.adicionarButton}>
                <Icon name="add-circle-outline" size={32} style={styles.adicionarIcon} />
                <Text style={styles.adicionarButtonText}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomContainer: {
        width: '100%',
        padding: 10,
    },
    adicionarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 10,
    },
    adicionarIcon: {
        color: '#f0f0f0',
        marginRight: 10,
    },
    adicionarButtonText: {
        color: 'white',
        fontSize: 18,
    },
});