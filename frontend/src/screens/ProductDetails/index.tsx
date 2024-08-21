import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import styles from './style';
import { COLORS } from '../../styles/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from '../../services/api';
import { useFoods } from '../../context/FoodsContext';

const ProductDetails = ({ route, navigation }) => {
    const { product, category } = route.params;
    const { addToCart } = useFoods();
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [size, setSize] = useState('broto');
    
    // Verifica se o produto é uma pizza
    const isPizza = category.name?.toLowerCase() === 'pizza'; // Ajuste a condição conforme sua lógica de identificação

    const handleAddToCart = () => {
        const item = {
            ...product,
            ingredients: product.ingredients || [],
            quantity,
            size: isPizza ? size : undefined // Só define o tamanho se for uma pizza
        };
        addToCart(item);
        alert(`Adicionado ${quantity} de ${product.name} ao carrinho`);
    };

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => quantity > 1 && setQuantity(prev => prev - 1);

    useEffect(() => {
        if (product && typeof product.price === 'string') {
            const priceAsNumber = parseFloat(product.price.replace(',', '.'));
            if (!isNaN(priceAsNumber)) {
                setTotal(priceAsNumber * quantity);
            }
        }
    }, [quantity, product]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: `${api.defaults.baseURL}/files/${product.banner}` }} style={styles.image} />
                <TouchableOpacity
                    style={[styles.button, styles.favoriteButton]}
                    onPress={() => alert('Favoritar')}
                >
                    <Icon name="heart" size={24} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.backButton]}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={24} color={COLORS.white} />
                </TouchableOpacity>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.category}>{category ? category.name : 'Categoria não disponível'}</Text>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>R$ {product.price}</Text>
                <Text style={styles.description}>{product.description}</Text>

                {isPizza && (
                    <View style={styles.sizeSelection}>
                        <TouchableOpacity
                            style={[styles.sizeButton, size === 'broto' && styles.sizeButtonSelected]}
                            onPress={() => setSize('broto')}
                        >
                            <Text style={styles.sizeText}>Broto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.sizeButton, size === 'grande' && styles.sizeButtonSelected]}
                            onPress={() => setSize('grande')}
                        >
                            <Text style={styles.sizeText}>Grande</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={decrement} style={styles.quantityButton}>
                        <Icon name="remove" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={increment} style={styles.quantityButton}>
                        <Icon name="add" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
                    <Text style={styles.addToCartButtonText}>Adicionar ao Carrinho</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default ProductDetails;
