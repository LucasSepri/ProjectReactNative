import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/COLORS";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: COLORS.text,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 15,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    submitButton: {
        backgroundColor: COLORS.primary,
    },
    cancelButton: {
        backgroundColor: COLORS.secondary,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: COLORS.white,
        color: COLORS.text,
    },
    error: {
        color: COLORS.danger,
        marginBottom: 20,
    },
    paymentMethodItem: {
        marginHorizontal: 10,
        marginBottom: 10,
        alignItems: 'center',
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textoPaymentMethods: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    actions: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    editButton: {
        color: COLORS.primary,
        marginRight: 10,
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: COLORS.danger,
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
});

export default styles;