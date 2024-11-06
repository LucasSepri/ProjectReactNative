import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerImage: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    profileButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
        marginLeft: 10,
    },
    EntrarButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    tableExitButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableExitText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    exitIcon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.white,
        marginLeft: 10,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: COLORS.white,
        borderWidth: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 10,
        textShadowColor: COLORS.black,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'column',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
    },
    buttonSeparator: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    whatsAppButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.success,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
    },
    hoursButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',

    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 10,
        alignSelf: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1,
    },

    categoriesSection: {
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        flex: 1,
    },

    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 45,
        marginVertical: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    searchButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.primary,
        textTransform: 'uppercase',
        marginRight: 20,
    },
    categories: {
        backgroundColor: COLORS.primary,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    categoryButton: {
        padding: 5,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    selectedCategoryButton: {
        borderBottomColor: COLORS.white,
        borderBottomWidth: 2,
        borderRadius: 0,
    },
    categoryHorizontalIcon: {
        fontSize: 30,
        color: COLORS.white,
    },
    categoryIcon: {
        fontSize: 30,
        color: COLORS.primary,
    },
    categoryText: {
        color: COLORS.white,
    },
    productsSection: {
    
        paddingBottom: 80,
        paddingTop: 20,
        // flex: 1,
    },
    emptyMessageContainer: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: COLORS.primary,
        elevation: 5,
        margin: 30,
        borderRadius: 10,
    },
    emptyMessageText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: COLORS.white,
        textAlign: 'center',
    },

    categoryContainer: {
        marginBottom: 15,
        borderTopWidth: 4,
        borderTopColor: COLORS.primary,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: COLORS.white,
        elevation: 2,
        borderRadius: 5,
    },
    categoriasProdutos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.primary,
        padding: 10,
        borderRadius: 5,
    },
    productContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        backgroundColor: COLORS.white,
        borderBottomColor: COLORS.border,
        borderBottomWidth: 1,
        borderRadius: 5,
        paddingBottom: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        elevation: 2,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    productDetails: {
        marginLeft: 10,
        flex: 1,
    },
    productName: {
        fontSize: 18,
    },
    productDescription: {
        fontSize: 14,
        color: 'gray',
        maxHeight: 40, // ajuste conforme necessário
        overflow: 'hidden',
    },
    productPrice: {
        fontSize: 16,
        color: COLORS.secondary,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sticky: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: 'white', // Ou outra cor, se necessário
    },

});

export default styles;
