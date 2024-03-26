import { StyleSheet, Dimensions } from 'react-native';
import COLORS from '../../styles/COLORS';


const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;


const styles = StyleSheet.create({

    /*************  HEADER SCREEN  ****************/
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
        height: 120,
        width: 120,
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
    addToCartBtn: {
        marginLeft: 10,
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default styles;
