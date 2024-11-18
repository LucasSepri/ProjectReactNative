import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white,
    },
    headerFilter: {
        backgroundColor: theme.background,
        margin: 16,
        borderRadius: 10,
        padding: 16,
        borderColor: theme.primary,
        borderWidth: 2,
        elevation: 3,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: theme.white,
        borderColor: theme.primary,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 12,
        paddingRight: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: theme.black,
    },
    categoriasContainer: {
        marginVertical: 10,
    },
    categoriesListContainer: {
        marginBottom: 10,
        // flex: 1,
    },
    categoryButton: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: theme.white,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 8,
        elevation: 2,
        shadowColor: theme.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    selectedCategoryButton: {
        backgroundColor: theme.primary,
    },
    iconeCategorias: {
        fontSize: 24,
        color: theme.black,
    },
    categoryButtonText: {
        marginLeft: 5,
        fontSize: 14,
        color: theme.black,
        fontWeight: '600',
    },
    adicionarProdutos: {
        padding: 10,
        backgroundColor: theme.primary,
        borderRadius: 8,
        alignItems: 'center',
    },
    adicionarProdutosText: {
        color: theme.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    noProductsContainer: {
        flex: 1,
        paddingTop: 46,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    noProductsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.primary,
        textAlign: 'center',
    },
    noProductsTextSub: {
        fontSize: 16,
        color: theme.secondary,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    foodItem: {
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: theme.white,
        borderRadius: 8,
        padding: 16,
        shadowColor: theme.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },

    deleteButton: {
        backgroundColor: theme.danger,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },

    imageContainer: {
        marginRight: 16,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        borderColor: theme.border,
        borderWidth: 1,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    category: {
        fontSize: 14,
        color: theme.primary,
        marginBottom: 4,
    },
    ingredients: {
        opacity: 0.8,
        fontSize: 14,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 16,
        color: theme.primary,
        marginTop: 8,
    },
});

export default styles;
