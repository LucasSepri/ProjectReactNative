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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    perfilFoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        overflow: 'hidden', // Adiciona recorte para a imagem
    },
    textoNomePerfil: {
        color: COLORS.white,
        fontSize: 18,
        marginLeft: 10,
        fontWeight: '500',
    },
    botaoIcone: {
        padding: 10,
        borderRadius: 10,
    },
    botaoMesaSair: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: 16,
        marginHorizontal: 20,
        borderRadius: 8,
        marginTop: 16,
    },
    textoMesaSair: {
        color: COLORS.white,
        fontWeight: 'bold',
        marginRight: 8,
    },
    iconeMesaSair: {
        color: COLORS.white,
        fontSize: 20,
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
    buttonText: {
        color: '#fff',
        marginLeft: 5,
        fontWeight: '500',
    },
    addressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
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
        fontWeight: '400',
    },
    /*************  MAIN SCREEN  ****************/
    // Container produtos
    tituloContainerProdutos: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        color: COLORS.primary,
    },
    // Categorias
    categoriasContainer: {
        paddingVertical: 5,
    },
    categoriesListContainer: {
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    selectedCategoryButton: {
        backgroundColor: COLORS.primary,
    },
    categoryButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    iconeCategorias: {
        color: COLORS.white,
        fontSize: 20,
    },
    // Produtos
    foodListContainer: {
        padding: 10,
        marginBottom: 80,
    },
    foodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    },
    imageContainer: {
        marginRight: 16,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 12,
        backgroundColor: COLORS.dark,
        resizeMode: 'cover',
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: COLORS.dark, // Adiciona uma cor mais escura para o nome
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
        opacity: 0.8,
    },
    ingredients: {
        fontSize: 14,
        marginBottom: 8,
        opacity: 0.6,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        color: COLORS.primary, // Usa a cor primária para o preço
    },
    loadingContainer: {
        height: 150,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    },
});

export default styles;
