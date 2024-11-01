import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Pressable, Alert } from 'react-native';
import styles from './style';
import { COLORS } from '../../styles/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../routes/app.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

    const isPizza = category.name?.toLowerCase() === 'pizza';

    // Verifica se o produto é favorito ao montar o componente
    const checkIfFavorite = async () => {
        if (!isAuthenticated) return;

        try {
            const response = await api.get(`/favorites/${product.id}`); // Rota para verificar se o produto é favorito
            setIsFavorite(response.data.isFavorite); // Atualiza o estado de acordo com a resposta
        } catch (error) {
            console.error('Erro ao verificar se o produto é favorito:', error);
        }
    };
    useEffect(() => {
        checkIfFavorite();
    }, [product.id, isAuthenticated]);

    const handleAddToCart = async () => {
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
                alert(`Adicionado ${quantity} de ${product.name} ao carrinho`);
                navigation.navigate('Home'); // Mude para Carrinho aqui
            }
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
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    // source={{ uri: `${api.defaults.baseURL}${product.banner}` }} 
                    source={imageError[product.id]
                        ? require('../../assets/logo.png') // Exibe a imagem padrão se houver erro
                        : { uri: `${api.defaults.baseURL}${product.banner}` }}
                    onError={() => setImageError(prev => ({ ...prev, [product.id]: true }))} // Marca o erro para este produto

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
