import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
    },
    favoriteCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.lightGrey,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    productDetails: {
        flex: 1,
        marginLeft: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    productPrice: {
        fontSize: 14,
        color: COLORS.secondary,
        marginTop: 4,
    },
    viewDetailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    viewDetailsButtonText: {
        fontSize: 14,
        color: COLORS.primary,
        marginRight: 5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.grey,
    },
    flatList: {
        paddingBottom: 20,
    },
});
