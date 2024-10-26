import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 32,
        borderColor: COLORS.primary,
        borderWidth: 3,
        borderRadius: 20,
    },
    title: {
        fontSize: 28,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    subTitle: {
        fontSize: 14,
        color: COLORS.darkGrey,
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        backgroundColor: COLORS.lightGrey,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
        fontSize: 16,
        color: COLORS.dark,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: COLORS.grey,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        color: COLORS.white,
        fontWeight: '600',
    },
    registerText: {
        marginTop: 24,
        color: COLORS.primary,
        fontSize: 15,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});
