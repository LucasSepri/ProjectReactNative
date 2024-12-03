import { StyleSheet } from 'react-native';


const styles = (theme: any) => {
    return StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonText: {
        color: theme.white,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1,
    },

    categoriesSection: {
        backgroundColor: theme.white,
        flexDirection: 'column',
        flex: 1,
    },

    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 20,
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: theme.primary,
        textTransform: 'uppercase',
        marginRight: 20,
    },
    searchButton: {
        flexDirection: 'row',
        backgroundColor: theme.primary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },


    categories: {
        backgroundColor: theme.primary,
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
        borderBottomColor: theme.white,
        borderBottomWidth: 2,
        borderRadius: 0,
    },
    categoryHorizontalIcon: {
        fontSize: 30,
        color: theme.white,
    },
    categoryIcon: {
        fontSize: 30,
        color: theme.primary,
    },
    categoryText: {
        color: theme.white,
    },
    productsSection: {
        paddingBottom: 80,
        paddingTop: 20,
    },
    emptyMessageContainer: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: theme.primary,
        elevation: 5,
        margin: 30,
        borderRadius: 10,
    },
    emptyMessageText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: theme.white,
        textAlign: 'center',
    },

    categoryContainer: {
        marginBottom: 15,
        borderTopColor: theme.primary,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: theme.white,
        elevation: 2,
        borderRadius: 10,
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
        color: theme.primary,
        padding: 10,
        borderRadius: 5,
    },
    productContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        backgroundColor: theme.white,
        borderBottomColor: theme.border,
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
        fontWeight: 'bold',
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
        color: theme.secondary,
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
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: theme.background,
        borderRadius: 12,
        width: '80%',
        padding: 20,
        alignItems: 'center',
        elevation: 5, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    header: {
        width: '100%',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.primary, // Cor da borda decorativa
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.text,
    },
    hoursContainer: {
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    hourText: {
        fontSize: 16,
        color: theme.text,
        marginVertical: 5,
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: theme.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    });
};

export default styles;