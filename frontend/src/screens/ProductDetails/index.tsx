import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import styles from './style';
import { COLORS } from '../../styles/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../routes/app.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { set } from 'react-hook-form';

type NavigationProp = NativeStackNavigationProp<StackParamList>;

const ProductDetails = ({ route }) => {
    const navigation = useNavigation<NavigationProp>();
    const { isAuthenticated } = useContext(AuthContext);

    const { product, category } = route.params;
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [size, setSize] = useState('broto');
    const [isFavorite, setIsFavorite] = useState(false);
    const [imageError, setImageError] = useState({ [product.id]: false });
    const [loading, setLoading] = useState(false);

    const isPizza = category.name?.toLowerCase() === 'pizza';

    const checkIfFavorite = async () => {
        if (!isAuthenticated) return;

        try {
            const response = await api.get(`/favorites/${product.id}`);
            setIsFavorite(response.data.isFavorite);
        } catch (error) {
            console.error('Erro ao verificar se o produto é favorito:', error);
        }
    };

    useEffect(() => {
        checkIfFavorite();
    }, [product.id, isAuthenticated]);

    const handleAddToCart = async () => {
        setLoading(true);
        if (!isAuthenticated) {
            Alert.alert(
                "Atenção",
                "Para adicionar ao carrinho, você precisa estar logado.",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Login", onPress: () => navigation.navigate('SignIn') }
                ]
            );
            return;
        }

        const payload = {
            product_id: product.id,
            amount: quantity,
        };

        try {
            const response = await api.post('/cart', payload);
            if (response.status === 201) {
               Alert.alert("Adicionado com Sucesso", `Adicionado ${quantity} de ${product.name} ao carrinho`);
                navigation.navigate('Carrinho');
            }
            setLoading(false);
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
            alert('Erro ao adicionar o produto ao carrinho. Tente novamente.');
        }
    };

    const handleFavoriteToggle = async () => {
        if (!isAuthenticated) {
            Alert.alert(
                "Atenção",
                "Para favoritar, você precisa estar logado.",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Login", onPress: () => navigation.navigate('SignIn') }
                ]
            );
            return;
        }

        try {
            const response = isFavorite ? await api.delete(`/favorites/${product.id}`)
                : await api.post('/favorites', { productId: product.id });
            checkIfFavorite();
        } catch (error) {
            console.error('Erro ao atualizar favoritos:', error);
            alert('Erro ao atualizar os favoritos. Tente novamente.');
        }
    };

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => quantity > 1 && setQuantity(prev => prev - 1);

    useEffect(() => {
        if (product && product.price) {
            const priceAsNumber = parseFloat(product.price.toString().replace(',', '.'));
            if (!isNaN(priceAsNumber)) {
                setTotal(priceAsNumber * quantity);
            }
        }
    }, [quantity, product]);

    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.imageContainer}>
                    <Image
                        source={imageError[product.id]
                            ? require('../../assets/logo.png')
                            : { uri: `${api.defaults.baseURL}${product.banner}` }}
                        onError={() => setImageError(prev => ({ ...prev, [product.id]: true }))}
                        style={styles.image} />
                    <TouchableOpacity
                        style={[styles.button, styles.favoriteButton]}
                        onPress={handleFavoriteToggle}
                    >
                        <Icon name={isFavorite ? "heart" : "heart-outline"} size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.backButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-back" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.category}>{category ? category.name : 'Categoria não disponível'}</Text>
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
                </View>
            </ScrollView>

            <View style={styles.footerContainer}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={decrement} style={styles.quantityButton}>
                        <Icon name="remove" size={30} color={COLORS.black} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={increment} style={styles.quantityButton}>
                        <Icon name="add" size={30} color={COLORS.black} />
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <Pressable style={styles.addToCartButton}>
                        <ActivityIndicator size="large" color={COLORS.white} />
                    </Pressable>
                ) : (
                    <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
                        <Text style={styles.addToCartButtonText}>Adicionar ao Carrinho</Text>
                        <Text style={styles.totalText}>R$ {total.toFixed(2)}</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
};

export default ProductDetails;
