import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.background,
    },
    scrollContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    subTitle: {
        fontSize: 14,
        color: COLORS.text,
        marginBottom: 30,
    },
    imagePicker: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
        borderRadius: 8,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: COLORS.white,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8,
    },
    imagePlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column', // Coloca o ícone e o texto em coluna
    },
    imageText: {
        color: COLORS.white,
        fontSize: 12,
        backgroundColor: COLORS.primary,
        paddingVertical: 4,
        borderRadius: 4,
        textAlign: 'center',
        width: '100%',
        flex: 1,
    },
    defaultProfileIcon: {
        width: 120, // Defina um tamanho explícito para o ícone
        height: 120,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        flex: 1,
        height: 50,
        color: COLORS.text,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        elevation: 3, // Sombra para o botão
        marginTop: 20,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        backgroundColor: COLORS.background,
        marginBottom: 14,
        elevation: 1, // Sombra leve para os campos de entrada
    },
    icon: {
        paddingHorizontal: 10,
    },
    eyeIcon: {
        paddingHorizontal: 10,
    },
});

export default styles;
