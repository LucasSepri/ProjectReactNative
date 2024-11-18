import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white,
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
        color: theme.white,
        marginLeft: 10,
    },
    EntrarButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.white,
    },
    tableExitButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableExitText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.white,
    },
    exitIcon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.white,
        marginLeft: 10,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 10,
        borderRadius: 10,
        // borderColor: theme.white,
        // borderWidth: 2,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.white,
        marginBottom: 10,
        // elevation: 2,
        textAlign: 'center',
    },
    buttonContainer: {
        // backgroundColor: theme.primary,
        width: '100%',
        paddingHorizontal: 20,

        flexDirection: 'column',
        marginVertical: 10,
        // marginHorizontal: 20,
        gap: 10,
    },
    buttonSeparator: {
        flexDirection: 'row',
        gap: 10,
    },
    whatsAppButton: {
        flexDirection: 'row',
        backgroundColor: theme.success,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
    },
    hoursButton: {
        flexDirection: 'row',
        backgroundColor: theme.secondary,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.primary,
        padding: 10,
        borderRadius: 5,
        // flex: 1,
        // marginHorizontal: 5,
        marginBottom: 10,
        alignSelf: 'center',
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
        // marginHorizontal: 45,
        // marginVertical: 20,
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
        // backgroundColor: theme.danger,
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
        // flex: 1,
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
        borderTopWidth: 4,
        borderTopColor: theme.primary,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: theme.white,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 30,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: theme.primary, // Use a cor personalizada, se desejar
    },
    hoursContainer: {
        marginBottom: 30,
    },
    hourText: {
        fontSize: 18,
        color: theme.secondary, // Cor para os horários
    },
    closeButton: {
        backgroundColor: theme.primary, // Cor personalizada para o botão
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default styles;