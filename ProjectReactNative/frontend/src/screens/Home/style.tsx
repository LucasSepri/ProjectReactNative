import { StyleSheet, Dimensions } from 'react-native';
import COLORS from '../../styles/COLORS';

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const styles = StyleSheet.create({

    /*************  HEADER SCREEN  ***************a*/
    // Header
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    logoContainer: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    logo: {
        height: 200,
        width: 200,
        borderRadius: 100,
    },
    addressContainer: {
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

    buttonContainer: {
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
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: COLORS.dark,
        borderRadius: 5,
    },
    buttonText: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 16,
    },

    // Estilos para o modal Horarios
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    /*************  MAIN SCREEN  ****************/

    // Categorias
    categoriesListContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20,
    },

    categoryContainer: {
        alignItems: 'center',
        paddingVertical: 10,
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
        color: '#FFF',
        marginLeft: 10,
    },


    //CARDS
    containerProdutos: {
        width: '95%',
        marginHorizontal: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 100,
        // borderColor: COLORS.primary,
        // borderWidth: 1,
    },
    TextContainerProdutos: {
        width: '100%',
        textAlign: 'center',
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        backgroundColor: COLORS.white,
        elevation: 13,
        width: cardWidth,
        marginHorizontal: 5,
        marginBottom: 10,
        borderRadius: 15,
        paddingBottom: 30,
    },
    cardImageContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    cardImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    cardContent: {
        marginHorizontal: 20,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardIngredients: {
        fontSize: 14,
        color: COLORS.grey,
        marginTop: 2,
    },
    cardFooter: {
        marginTop: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    favoritoButtonContainer: {
        backgroundColor: COLORS.primary,
        borderRadius: 24,
        padding: 8,
    },
    favoritoButton: {
        position: 'absolute',
        top: 5,
        left: 5,
        zIndex: 1,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    adicionarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        elevation: 3,
    },
    adicionarIcon: {
        marginRight: 8,
    },
    adicionarButtonText: {
        color: 'blue',
        fontSize: 18,
        fontWeight: 'bold',
    },






});

export default styles;
