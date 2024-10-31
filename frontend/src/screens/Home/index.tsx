import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    Text,
    TouchableOpacity,
    ImageBackground,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    Linking,
    StyleSheet,
    Dimensions,
    findNodeHandle,
    RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/AuthContext';
import { useTable } from '../../context/TableContext';
import { api } from '../../services/api';
import { COLORS } from '../../styles/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackParamList } from '../../routes/app.routes';
import styles from './style';

type CategoryProps = {
    id: string;
    name: string;
    products?: ProductProps[];
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
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const scrollViewRef = useRef<ScrollView>(null);
    const categoryRefs = useRef<{ [key: string]: View }>({});
    const [imageError, setImageError] = useState({});

    const pizzariaPhoneNumber = '(13) 9790-98969';
    const pizzariaAddress = 'Rua Dona Veridiana, 661, Higienópolis, São Paulo - SP';

    const loadCategories = async () => {
        try {
            const response = await api.get('/categories');
            const categoriesWithProducts = await Promise.all(response.data.map(async (category: CategoryProps) => {
                const productResponse = await api.get(`/products/${category.id}`);
                return { ...category, hasProducts: productResponse.data.length > 0, products: productResponse.data };
            }));
    
            setCategories(categoriesWithProducts);
    
            // Define a primeira categoria como aberta automaticamente
            setCategorySelected(categoriesWithProducts[0]);
            setExpandedCategory(categoriesWithProducts[0]?.id); // Define a primeira categoria como expandida
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingCategories(false);
            setRefreshing(false); // Finaliza o pull-to-refresh
        }
    };
    
    useEffect(() => {
        loadCategories();
    }, []);

    // Função para o pull-to-refresh
    const onRefresh = () => {
        setRefreshing(true);
        loadCategories();
    };

    const handleProductPress = (product: ProductProps) => {
        navigation.navigate('ProductDetails', { product, category: categorySelected });
    };

    const toggleCategory = (categoryId: string) => {
        if (expandedCategory === categoryId) {
            // Se a categoria já está expandida, fecha-a e desmarca a seleção
            setExpandedCategory(null);
            setCategorySelected(null);
        } else {
            // Caso contrário, expande a nova categoria e a marca como selecionada
            setExpandedCategory(categoryId);
            const selectedCategory = categories.find(category => category.id === categoryId);
            setCategorySelected(selectedCategory || null);
        }
    };

    const scrollToCategory = (categoryId: string) => {
        const categoryView = categoryRefs.current[categoryId];

        if (categoryView && scrollViewRef.current) {
            const handle = findNodeHandle(categoryView);
            if (handle) {
                categoryView.measureLayout(
                    findNodeHandle(scrollViewRef.current),
                    (x, y) => {
                        scrollViewRef.current?.scrollTo({ y, animated: true });
                    },
                    () => console.error('Erro ao medir a posição da categoria')
                );
            }
        }
        toggleCategory(categoryId);
    };


    return (
        <ScrollView ref={scrollViewRef} style={styles.container} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
        }>
            <ImageBackground source={require('../../assets/background.jpg')} style={styles.headerImage}>
                <View style={styles.headerIconsContainer}>
                    {isAuthenticated ? (
                        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Perfil')}>
                            <Image source={{ uri: `${api.defaults.baseURL}${user.profileImage}` }} style={styles.profileImage} />
                            <Text style={styles.profileName}>
                                {user.name.split(' ')[0].toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.EntrarButton} onPress={() => navigation.navigate('SignIn')}>
                            <Icon name="log-in-outline" size={20} color={COLORS.white} />
                            <Text style={styles.loginText}>ENTRAR</Text>
                        </TouchableOpacity>
                    )}

                    {tableNumber ? (
                        <TouchableOpacity style={styles.tableExitButton} onPress={clearTable}>
                            <Text style={styles.tableExitText}>MESA {tableNumber}</Text>
                            <Icon name="exit-outline" style={styles.exitIcon} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.EntrarButton} onPress={() => navigation.navigate('Qrcode')}>
                            <Icon name="qr-code" size={30} color={COLORS.white} />
                        </TouchableOpacity>
                    )}
                </View>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Pizzaria Super Pizza</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.whatsAppButton} onPress={() => Linking.openURL(`whatsapp://send?phone=${pizzariaPhoneNumber}`)}>
                        <Icon name="logo-whatsapp" size={22} color={COLORS.white} />
                        <Text style={styles.buttonText}>{pizzariaPhoneNumber}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.locationButton} onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pizzariaAddress)}`)}>
                        <Icon name="location-outline" size={22} color={COLORS.white} />
                        <Text style={styles.buttonText}>{pizzariaAddress}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={styles.categoriesSection}>
                <View style={styles.productsHeader}>
                    <Text style={styles.sectionTitle}>Cardapio</Text>
                    <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Pesquisa')}>
                        <Icon name="search-outline" size={20} color={COLORS.white} />
                        <Text style={styles.buttonText}>Pesquisar</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {loadingCategories ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : (categories.filter(category => category.products && category.products.length > 0).map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryButton,
                                category.id === categorySelected?.id && styles.selectedCategoryButton,
                            ]}
                            onPress={() => { scrollToCategory(category.id); }} // Remove a seleção da categoria aqui
                        >
                            <Icon name="fast-food-outline" style={styles.categoryIcon} />
                            <Text style={styles.categoryText}>{category.name}</Text>
                        </TouchableOpacity>
                    )))}
                </ScrollView>
            </View>

            <View style={styles.productsSection}>
                {categories.filter(category => category.products && category.products.length > 0).map((category) => (
                    <View
                        key={category.id}
                        style={styles.categoryContainer}
                        ref={(ref) => (categoryRefs.current[category.id] = ref)} // Salva a referência de cada categoria
                    >
                        <TouchableOpacity onPress={() => scrollToCategory(category.id)} style={styles.categoriasProdutos}>
                            <Text style={styles.categoryTitle}>{category.name}</Text>
                            <Icon name={expandedCategory === category.id ? 'chevron-up-outline' : 'chevron-down-outline'} style={styles.categoryIcon} />
                        </TouchableOpacity>
                        {expandedCategory === category.id && category.products?.map(product => (
                            <TouchableOpacity
                                key={product.id}
                                style={styles.productContainer}
                                onPress={() => handleProductPress(product)}
                            >
                                <Image
                                    source={imageError[product.id]
                                        ? require('../../assets/logo.png') // Exibe a imagem padrão se houver erro
                                        : { uri: `${api.defaults.baseURL}${product.banner}` }}
                                    onError={() => setImageError(prev => ({ ...prev, [product.id]: true }))} // Marca o erro para este produto
                                    style={styles.productImage}
                                />
                                <View style={styles.productDetails}>
                                    <Text style={styles.productName}>{product.name}</Text>
                                    <Text style={styles.productDescription}>{product.description}</Text>
                                    <Text style={styles.productPrice}>R$ {product.price}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
