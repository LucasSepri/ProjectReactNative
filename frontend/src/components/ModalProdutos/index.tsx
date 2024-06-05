import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from './style';
import { COLORS } from '../../styles/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from '../../services/api';
import { useFoods } from '../../context/FoodsContext';

export default function ModalProduto({ productSelected, setModalVisible }) {
    const { addToCart } = useFoods();
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);

    const handleAddToCart = () => {
        const item = {
            ...productSelected,
            ingredients: productSelected.ingredients || [], // Garante que ingredients seja sempre uma matriz
            quantity: quantity
        };
        addToCart(item);
        alert(`Adicionado ${quantity} de ${productSelected.name} ao carrinho`);
        setModalVisible(false);
    };

    const increment = () => {
        setQuantity(prev => prev + 1);
    };

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (productSelected && typeof productSelected.price === 'string') {
            const priceAsNumber = parseFloat(productSelected.price.replace(',', '.'));
            if (!isNaN(priceAsNumber)) {
                setTotal(priceAsNumber * quantity);
            }
        }
    }, [quantity, productSelected]);

    return (
        <View style={styles.modalContainer}>
            {productSelected && (
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={styles.modalCloseButton}
                    >
                        <Icon name="close" size={44} color={COLORS.black} />
                    </TouchableOpacity>

                    <View style={styles.imageContainerModal}>
                        <Image
                            source={{ uri: `${api.defaults.baseURL}/files/${productSelected.banner}` }}
                            style={styles.imageModal}
                        />
                    </View>
                    <Text style={styles.modalTitle}>{productSelected.name}</Text>
                    <Text style={styles.modalDescription}>{productSelected.description}</Text>
                    <Text style={styles.modalIngredients}>{productSelected.ingredients ? productSelected.ingredients.join(', ') : ''}</Text>
                    <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>

                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={decrement} style={styles.quantityButton}>
                            <Icon name="remove" size={24} color={COLORS.black} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity onPress={increment} style={styles.quantityButton}>
                            <Icon name="add" size={24} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                        <Text style={styles.addToCartButtonText}>Adicionar ao Carrinho</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
