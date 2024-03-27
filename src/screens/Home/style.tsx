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
    addressText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
        backgroundColor: COLORS.dark,
        padding: 10,
        borderRadius: 5,
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
        backgroundColor: COLORS.green, // Cor do botão do WhatsApp
        borderRadius: 5,
        marginRight: 10, // Espaçamento entre os botões (opcional)
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: COLORS.dark, // Cor do botão Horário
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

    //CARROSSEL
    ContainerCarousel: {
        paddingVertical: 20,
    },
    textoTituloPromocoes: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    },
    carouselItem: {
        marginTop: 20,
        borderRadius: 8,
        overflow: 'hidden',
    },
    carouselImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    carouselTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        backgroundColor: COLORS.primary,
        color: 'white',
    },




    // PESQUISA

    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    sortBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },


    //CATEGORIAS
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    categoryBtn: {
        height: 45,
        width: 120,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    categoryBtnImgCon: {
        height: 35,
        width: 35,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },


    //CARDS
    card: {
        width: cardWidth,
        marginHorizontal: 5,
        marginBottom: 10,
        // marginTop: 50,
        borderRadius: 15,
        elevation: 13,
        backgroundColor: COLORS.white,
        paddingBottom: 30,
        alignItems: 'center',  // Centraliza horizontalmente
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
        alignItems: 'center',  // Centraliza horizontalmente
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
        alignItems: 'center',  // Centraliza horizontalmente
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    favoritoButtonContainer: {
        backgroundColor: COLORS.primary,
        borderRadius: 24, // ou o valor que preferir
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
        justifyContent: 'center',  // Centraliza verticalmente
        alignItems: 'center',      // Centraliza horizontalmente
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




    // Estilos para o Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: 'white',
    },
});



export default styles;
