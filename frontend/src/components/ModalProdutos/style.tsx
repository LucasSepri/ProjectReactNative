// components/modalStyle.ts

import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const styles = StyleSheet.create({
    //Modal Produto
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',

    },
    modalCloseButton: {
        position: 'absolute',
        backgroundColor: COLORS.white,
        elevation: 5,
        borderRadius: 50,
        top: 10,
        left: 10,
        zIndex: 1,
    },
    imageContainerModal: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
        backgroundColor: COLORS.dark,
        marginBottom: 20,
        borderRadius: 12,
    },
    imageModal: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        resizeMode: 'contain',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: COLORS.white,
        borderRadius: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalIngredients: {
        fontSize: 18,
    },
    modalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalDescription: {
        fontSize: 20,
        // marginBottom: 2,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 10,
    },
    quantityButton: {
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    addToCartButton: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartButtonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },

});

export default styles;
