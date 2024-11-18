import { StyleSheet } from 'react-native';

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white,
    },
    imageContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 400,
        aspectRatio: 1,
        resizeMode: 'cover',
    },
    button: {
        position: 'absolute',
        padding: 8,
        borderRadius: 20,
    },
    favoriteButton: {
        top: 16,
        right: 16,
        backgroundColor: theme.primary,
    },
    backButton: {
        top: 16,
        left: 16,
        backgroundColor: theme.primary,
    },
    detailsContainer: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: theme.white,
        borderRadius: 10,
        shadowColor: theme.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        // marginBottom: 16,
    },
    category: {
        fontSize: 14,
        color: theme.secondary,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.text,
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.primary,
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: theme.text,
        marginBottom: 20,
    },
    sizeSelection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    sizeButton: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.primary,
    },
    sizeButtonSelected: {
        backgroundColor: theme.primary,
    },
    sizeText: {
        fontSize: 16,
        color: theme.text,
    },
    footerContainer: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        elevation: 5,
        borderTopColor: theme.border,
        borderTopWidth: 1,
        backgroundColor: theme.white,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
    },

    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.white,
        borderColor: theme.border,
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 16,
    },
    quantityButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.text,
        marginHorizontal: 8,
        paddingVertical: 20,
    },
    addToCartButton: {
        backgroundColor: theme.primary,
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    addToCartButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.white,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.white,
        marginBottom: 10,
    },
});

export default styles;
