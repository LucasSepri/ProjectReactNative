import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },

    headerImagemDeFundo: {
        flex: 1,
    },
    // Login/Informações do usuário
    perfil: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    botaoPerfil: {
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    perfilFoto: {
        width: 40,
        height: 40,
        borderRadius: 25,
    },
    textoNomePerfil: {
        color: COLORS.white,
        fontSize: 18,
        marginLeft: 10,
    },

    botaoIcone: {
        padding: 10,
        borderRadius: 10,
    },
    icone: {
        color: COLORS.white,
        fontSize: 32,
    },
    // Header app
    logoContainer: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    logo: {
        height: 200,
        width: 200,
        borderRadius: 100,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    buttonWhatsApp: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: COLORS.green,
        borderRadius: 5,
        marginRight: 10,
    },
    buttonHorario: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        marginLeft: 5
    },
    addressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    buttonAddressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: COLORS.dark,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addressText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },










    


    
});

export default styles;