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
        borderRadius: 5,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: COLORS.white, // Adicionando um fundo branco para o seletor de imagem
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 5,
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
