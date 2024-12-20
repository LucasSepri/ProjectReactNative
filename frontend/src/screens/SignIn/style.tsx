import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logo: {
        width: 160,
        height: 160,
        marginBottom: 22,
        borderColor: theme.white,
        borderWidth: 3,
        borderRadius: 20,
    },
    title: {
        fontSize: 28,
        color: theme.primary,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    subTitle: {
        fontSize: 14,
        color: theme.black,
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 8,
        backgroundColor: theme.background,
        marginBottom: 14,
        elevation: 1, // Sombra leve para os campos de entrada
    },
    icon: {
        paddingHorizontal: 10,
    },
    eyeIcon: {
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: theme.text,
    },
    errorText:{
        color: theme.danger,
        fontSize: 14,
        textAlign: 'center',
    },
    button: {
        backgroundColor: theme.primary,
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: theme.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        color: theme.white,
        fontWeight: '600',
    },
    registerText: {
        marginTop: 24,
        color: theme.primary,
        fontSize: 15,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default styles;
