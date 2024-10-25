import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.white,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        paddingLeft: 8,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    categoriasContainer: {
        marginBottom: 16,
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
    },
    selectedCategoryButton: {
        backgroundColor: COLORS.white,
    },
    iconeCategorias: {
        fontSize: 24,
        color: COLORS.grey,
    },
    categoryButtonText: {
        marginTop: 5,
        fontSize: 14,
        color: COLORS.grey,
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
        elevation: 5,
    },
    imageContainer: {
        marginRight: 16,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    ingredients: {
        opacity: 0.6,
    },
    price: {
        fontWeight: 'bold',
        textAlign: 'right',
    },
});

export default styles;