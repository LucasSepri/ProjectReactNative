import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../routes/app.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { set } from 'react-hook-form';
import { DefaultLogoImage } from '../../components/Logo';
import { ThemeContext } from 'styled-components';

type NavigationProp = NativeStackNavigationProp<StackParamList>;

type RouteParams = {
    product: {
        id: number;
        name: string;
        description: string;
        price: string;
        banner: string;
    };
    category: {
        name: string;
    };
};

const ProductDetails = ({ route }: { route: { params: RouteParams } }) => {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation<NavigationProp>();
    const { isAuthenticated } = useContext(AuthContext);

    const { product, category } = route.params;
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [imageError, setImageError] = useState({ [product.id]: false });
    const [loading, setLoading] = useState(false);

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
                    { text: "Cancelar", onPress: () => setLoading(false) },
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
                navigation.navigate("Inicio", { screen: "Carrinho" });
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
        <View style={styles(theme).container}>
            <ScrollView >
                <View style={styles(theme).imageContainer}>
                    {imageError[product.id] || !product.banner ? (
                        <DefaultLogoImage style={styles(theme).image} theme={theme} />
                    ) : (
                        <Image
                            source={{ uri: `${api.defaults.baseURL}${product.banner}?t=${new Date().getTime()}` }}
                            onError={() => setImageError(prev => ({ ...prev, [product.id]: true }))}
                            style={styles(theme).image}
                        />
                    )}
                    <TouchableOpacity
                        style={[styles(theme).button, styles(theme).favoriteButton]}
                        onPress={handleFavoriteToggle}
                    >
                        {theme && (<Icon name={isFavorite ? "heart" : "heart-outline"} size={24} color={theme.white} />)}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles(theme).button, styles(theme).backButton]}
                        onPress={() => navigation.goBack()}
                    >
                        {theme && (<Icon name="arrow-back" size={24} color={theme.white} />)}
                    </TouchableOpacity>
                </View>

                <View style={styles(theme).detailsContainer}>
                    <Text style={styles(theme).title}>{product.name}</Text>
                    <Text style={styles(theme).category}>{category ? category.name : 'Categoria não disponível'}</Text>
                    <Text style={styles(theme).description}>{product.description}</Text>
                </View>
            </ScrollView>

            <View style={styles(theme).footerContainer}>
                <View style={styles(theme).quantityContainer}>
                    <TouchableOpacity onPress={decrement} style={styles(theme).quantityButton}>
                    {theme && (<Icon name="remove" size={30} color={theme.black} />)}
                    </TouchableOpacity>
                    <Text style={styles(theme).quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={increment} style={styles(theme).quantityButton}>
                    {theme && (<Icon name="add" size={30} color={theme.black} />)}
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <Pressable style={styles(theme).addToCartButton}>
                        {theme && (<ActivityIndicator size={33} color={theme.white} />)}
                    </Pressable>
                ) : (
                    <Pressable style={styles(theme).addToCartButton} onPress={handleAddToCart}>
                        <Text style={styles(theme).addToCartButtonText}>Adicionar ao Carrinho</Text>
                        <Text style={styles(theme).totalText}>{Number(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
};

export default ProductDetails;
