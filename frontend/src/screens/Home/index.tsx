import React, { useState, useContext, useEffect, useRef } from 'react';
import {
    Text,
    TouchableOpacity,
    ImageBackground,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/AuthContext';
import { useTable } from '../../context/TableContext';
import { api } from '../../services/api';
import { COLORS } from '../../styles/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { StackParamList } from '../../routes/app.routes';

export type CategoryProps = {
    id: string;
    name: string;
};

type ProductProps = {
    price: string;
    ingredients: string;
    description: string;
    banner: string;
    id: string;
    name: string;
};

type NavigationProp = NativeStackNavigationProp<StackParamList>;

export default function Home() {
    const navigation = useNavigation<NavigationProp>();
    const { isAuthenticated, user } = useContext(AuthContext);
    const { tableNumber, clearTable } = useTable();

    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | null>(null);
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const scrollViewRef = useRef<ScrollView>(null);
    const pizzariaPhoneNumber = '+5511999999999';
    const pizzariaAddress = 'Rua Dona Veridiana, 661, Higienópolis, São Paulo - SP';

    // Load categories on mount
    // Modifique a função loadCategories para fora do useEffect
    const loadCategories = async () => {
        try {
            const response = await api.get('/categories');
            const categoriesWithProducts = await Promise.all(response.data.map(async (category: CategoryProps) => {
                const productResponse = await api.get(`/products/${category.id}`);
                return { ...category, hasProducts: productResponse.data.length > 0, products: productResponse.data };
            }));

            // Filtra categorias sem produtos
            const filteredCategories = categoriesWithProducts.filter(category => category.hasProducts);
            setCategories([{ id: 'all', name: 'Todos' }, ...filteredCategories]);
            setCategorySelected({ id: 'all', name: 'Todos' });
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingCategories(false);
        }
    };

    // Chama loadCategories no primeiro carregamento
    useEffect(() => {
        loadCategories();
    }, []);


    // Load products when category changes
    useEffect(() => {
        const loadProducts = async () => {
            setLoadingProducts(true);
            try {
                const response = await api.get(
                    categorySelected && categorySelected.id !== 'all'
                        ? `/products/${categorySelected.id}`
                        : '/products'
                );
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingProducts(false);
            }
        };
        loadProducts();
    }, [categorySelected]);

    // Navigate to product details
    const handleProductPress = (product: ProductProps) => {
        navigation.navigate('ProductDetails', { product, category: categorySelected });
    };

    // Helper functions
    // Função para abrir o WhatsApp com o número da pizzaria
    const openWhatsApp = () => {
        const url = `whatsapp://send?phone=${pizzariaPhoneNumber}`;
        Linking.openURL(url).catch(() => {
            alert('Certifique-se de que o WhatsApp está instalado');
        });
    };

    // Função para abrir a localização no Google Maps
    const openLocation = () => {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pizzariaAddress)}`).catch(() => {
            alert('Não foi possível abrir o Google Maps');
        });
    };


    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <ImageBackground source={require('../../assets/background.jpg')} style={styles.headerImage}>
                <View style={styles.headerIconsContainer}>
                    {isAuthenticated ? (
                        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Perfil')}>
                            <Image source={{ uri: `${api.defaults.baseURL}${user.profileImage}` }} style={styles.profileImage} />
                            <Text style={styles.profileName}>
                                {user.name.split(' ').slice(0, 1).join(' ').toUpperCase()}
                            </Text>

                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.EntrarButton} onPress={() => navigation.navigate('SignIn')}>
                            <Icon name="log-in-outline" size={20} color={COLORS.white} />
                            <Text style={styles.loginText}>ENTRAR</Text>
                        </TouchableOpacity>
                    )}

                    {tableNumber && (
                        <TouchableOpacity style={styles.tableExitButton} onPress={clearTable}>
                            <Text style={styles.tableExitText}>MESA {tableNumber}</Text>
                            <Icon name="exit-outline" style={styles.exitIcon} />
                        </TouchableOpacity>
                    )}
                </View>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Pizzaria Don Juan</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.whatsAppButton} onPress={openWhatsApp}>
                        <Icon name="logo-whatsapp" size={22} color={COLORS.white} />
                        <Text style={styles.buttonText}>{pizzariaPhoneNumber}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.locationButton} onPress={openLocation}>
                        <Icon name="location-outline" size={22} color={COLORS.white} />
                        <Text style={styles.buttonText}>{pizzariaAddress}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            {/* Categories */}
            <View style={styles.categoriesSection}>
                <Text style={styles.sectionTitle}>Categorias</Text>
                <ScrollView horizontal contentContainerStyle={styles.categoriesContainer} ref={scrollViewRef}>
                    {loadingCategories ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : (
                        categories.map((category, index) => (
                            <TouchableOpacity
                                key={category.id}
                                style={[
                                    styles.categoryButton,
                                    category.id === categorySelected?.id && styles.selectedCategoryButton,
                                ]}
                                onPress={() => {
                                    if (category.id === 'all') {
                                        loadCategories(); // Carrega todas as categorias ao clicar em "Todos"
                                    }
                                    setCategorySelected(category);
                                    scrollViewRef.current?.scrollTo({ x: index * 150, animated: true });
                                }}
                            >
                                <Icon name={category.name === 'Todos' ? 'fast-food-outline' : 'fast-food-outline'} style={styles.categoryIcon} />
                                <Text style={styles.categoryText}>{category.name}</Text>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
            </View>


            {/* Products */}
            <View style={styles.productsSection}>
                <View style={styles.productsHeader}>
                    <Text style={styles.sectionTitle}>Produtos</Text>
                    <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Pesquisa')}>
                        <Icon name="search-outline" size={20} color={COLORS.white} />
                        <Text style={styles.buttonText}>Pesquisar</Text>
                    </TouchableOpacity>
                </View>
                {loadingProducts ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                    products.map((product) => (
                        <TouchableOpacity
                            key={product.id}
                            style={styles.productItem}
                            onPress={() => handleProductPress(product)}
                        >
                            <Image source={{ uri: `${api.defaults.baseURL}${product.banner}` }} style={styles.productImage} />
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{product.name}</Text>
                                <Text style={styles.productDescription}>{product.description}</Text>
                                <Text style={styles.productPrice}>R$ {product.price}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </View>

        </ScrollView>
    );
}
