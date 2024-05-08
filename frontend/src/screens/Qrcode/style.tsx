import { StyleSheet } from "react-native";
import { COLORS } from "../../styles/COLORS";

export const styles = StyleSheet.create({
    // Adicione no seu arquivo de estilos
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    modalQrcode: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.dark,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 24,
    },
    input: {
        width: '90%',
        height: 60,
        backgroundColor: COLORS.white,
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: COLORS.dark,
    },
    button: {
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextAbrir: {
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold',
    },

});