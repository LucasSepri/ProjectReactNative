import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerFilter: {
        backgroundColor: COLORS.background,
        margin: 16,
        borderRadius: 10,
        padding: 16,
        borderColor: COLORS.primary,
        borderWidth: 2,
        elevation: 3,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: COLORS.white,
        borderColor: COLORS.primary,
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
        color: COLORS.black,
    },
    categoriasContainer: {
        marginTop: 8,
    },
    categoriesListContainer: {
        paddingHorizontal: 8,
    },
    categoryButton: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 8,
        elevation: 2,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    selectedCategoryButton: {
        backgroundColor: COLORS.primary,
    },
    iconeCategorias: {
        fontSize: 24,
        color: COLORS.black,
    },
    categoryButtonText: {
        marginLeft: 5,
        fontSize: 14,
        color: COLORS.black,
        fontWeight: '600',
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
        color: COLORS.primary,
        textAlign: 'center',
    },
    noProductsTextSub: {
        fontSize: 16,
        color: COLORS.secondary,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    foodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 16,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    imageContainer: {
        marginRight: 16,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        borderColor: COLORS.border,
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
        color: COLORS.primary,
        marginBottom: 4,
    },
    ingredients: {
        opacity: 0.8,
        fontSize: 14,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.primary,
        marginTop: 8,
    },
});

export default styles;
