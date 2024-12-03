import { StyleSheet } from "react-native";

const  styles = (theme: { [key: string]: string }) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: theme.text,
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
        shadowColor: theme.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    submitButton: {
        backgroundColor: theme.primary,
    },
    cancelButton: {
        backgroundColor: theme.secondary,
    },
    buttonText: {
        color: theme.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: theme.border,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: theme.white,
        color: theme.text,
    },
    error: {
        color: theme.danger,
        marginBottom: 20,
    },
    categoryItem: {
        marginHorizontal: 10,
        marginBottom: 10,
        alignItems: 'center',
        padding: 10,
        backgroundColor: theme.white,
        borderRadius: 8,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textoCategorias: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text,
    },
    actions: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    editButton: {
        color: theme.primary,
        marginRight: 10,
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: theme.danger,
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
});

export default styles;