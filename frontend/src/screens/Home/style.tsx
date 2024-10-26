import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    headerImage: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.grey,
    },
    headerIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        // height: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        // marginTop: 20,
        backgroundColor: COLORS.primary,
    },
    profileButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },

    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 10,
    },
    profileName: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 18,
    },
    EntrarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,

    },
    loginText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 18,
    },
    tableExitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        padding: 5,
        borderRadius: 5,
    },
    tableExitText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 5,
    },
    exitIcon: {
        color: COLORS.white,
        fontSize: 20,
        fontFamily: 'bold',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginVertical: 20,
        borderRadius: 20,
        borderColor: COLORS.primary,
        borderWidth: 5,
        backgroundColor: COLORS.lightGrey,

    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 20,
        textShadowColor: COLORS.black, 
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 5,

    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '80%',
    },
    whatsAppButton: {
        backgroundColor: COLORS.green,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,

    },
    locationButton: {
        backgroundColor: COLORS.dark,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        marginLeft: 5,
        fontSize: 16,
        padding: 2,
    },
    categoriesSection: {
        // paddingHorizontal: 20,
        // paddingVertical: 10,
        padding: 20,
        // backgroundColor: COLORS.black,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
        // marginBottom: 10,
    },
    categoriesContainer: {
        paddingVertical: 10,

    },
    categoryButton: {
        backgroundColor: COLORS.secondary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    selectedCategoryButton: {
        backgroundColor: COLORS.primary,
    },
    categoryIcon: {
        marginRight: 5,
        color: COLORS.white,
        fontSize: 20,
        marginBottom: 5,
    },
    categoryText: {
        color: COLORS.white,
        fontSize: 14,
    },
    productsSection: {
        padding: 20,
        paddingBottom: '20%',
        backgroundColor: COLORS.lightGrey,
    },
    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.grey,
        paddingBottom: 10,
    },
    searchButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    productItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 4, // Aumentando a sombra para destaque
        overflow: 'hidden',
        padding: 10, // Adicionando padding para um visual mais clean
    },
    productImage: {
        width: 120, // Aumentando a imagem
        height: 120,
        borderRadius: 10,
        marginRight: 10, // Adicionando espaço entre a imagem e os detalhes
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 20, // Aumentando o tamanho da fonte
        fontWeight: 'bold',
        color: COLORS.black,
    },
    productDescription: {
        fontSize: 16, // Aumentando o tamanho da fonte
        color: COLORS.grey,
        marginVertical: 4, // Adicionando espaço vertical
    },
    productPrice: {
        fontSize: 22, // Aumentando o tamanho da fonte
        fontWeight: 'bold',
        color: COLORS.primary,
        alignSelf: 'flex-end',
        marginTop: 8, // Espaço acima do preço
    },
    promotionsSection: {
        marginBottom: 20,
    },

    promotionsCarousel: {
        marginBottom: 20,
    },

    promotionItem: {
        width: 250, // ajuste conforme necessário
        marginRight: 15,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: COLORS.white,
        elevation: 2, // sombra para Android
    },

    promotionImage: {
        width: '100%',
        height: 150, // ajuste conforme necessário
    },

    promotionDetails: {
        padding: 10,
    },

    promotionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },

    promotionDescription: {
        fontSize: 14,
        color: COLORS.grey,
    },

});

export default styles;
