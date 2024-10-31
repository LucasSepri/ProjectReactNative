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
    whatsAppButton: {
        flexDirection: 'row',
        alignContent: 'center',
        backgroundColor: COLORS.green,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        flex: 1, 
        marginHorizontal: 5, 
        width: '100%',
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
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    categoriesSection: {
        borderBottomWidth: 1,
        borderColor: COLORS.lightGrey,
    },
    
    productsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 20,
        justifyContent: 'space-between', 
        backgroundColor: COLORS.white,
        elevation: 2,
    },
    searchButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center', 
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.black,
        flex: 1, 
        textTransform: 'uppercase',
    },
    categoryButton: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    selectedCategoryButton: {
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 2,
        borderRadius: 0,
    },
    categoryIcon: {
        fontSize: 30,
        color: COLORS.primary,
    },
    categoryText: {
        color: COLORS.black,
    },
    productsSection: {
        paddingTop: 20,
        paddingBottom: 80,
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
    categoriasProdutos:{
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
        borderBottomColor: COLORS.lightGrey,
        borderRadius: 5,
        paddingBottom: 20,
        borderBottomWidth: 2,
        marginHorizontal: 10,
        alignItems: 'center',
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
        color: COLORS.grey,
    },
    productPrice: {
        fontSize: 16,
        color: COLORS.darkGrey,
    },
    loader:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default styles;
