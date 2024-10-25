import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/COLORS";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.white,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', // Distribui o espaço de maneira equilibrada
        alignItems: 'center',
        marginBottom: 15,
    },
    button: {
        flex: 1, // Torna ambos os botões de tamanho igual
        marginHorizontal: 5, // Dá espaço horizontal entre os botões
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3, // Para sombra no Android
    },
    submitButton: {
        backgroundColor: COLORS.primary, // Verde para criar/editar
    },
    cancelButton: {
        backgroundColor: COLORS.red, // Vermelho para cancelar
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
    categoryItem: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        elevation: 2,
        marginBottom: 10,
        borderColor: COLORS.lightGrey,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textoCategorias: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    actions: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    editButton: {
        color: COLORS.blue,
        marginRight: 10,
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: COLORS.red,
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
});