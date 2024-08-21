import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'cover',
    },
    button: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    favoriteButton: {
        top: 20,
        right: 20,
    },
    backButton: {
        top: 20,
        left: 20,
    },
    detailsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: COLORS.white,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        marginTop: -60,
    },
    category: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
    },
    price: {
        fontSize: 24,
        color: COLORS.green,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    description: {
        fontSize: 20,
        color: COLORS.grey,
        marginBottom: 16,
    },
    sizeSelection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    sizeButton: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: COLORS.secondary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    sizeButtonSelected: {
        backgroundColor: COLORS.primary,
    },
    sizeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    totalText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.primary,
        textAlign: 'center',
        marginVertical: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 40,
        borderColor: COLORS.lightGrey,
        borderWidth: 1,
        elevation: 3,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    quantityButton: {
        padding: 8,
        borderRadius: 100,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    quantityText: {
        fontSize: 20,
        color: COLORS.black,
        marginHorizontal: 16,
    },
    addToCartButton: {
        paddingVertical: 12,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    addToCartButtonText: {
        fontSize: 18,
        color: COLORS.white,
        fontWeight: 'bold',
    },
});

export default styles;
