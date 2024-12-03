import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackParamList } from '../../routes/app.routes';
import styles from './style';
import { DefaultLogoImage } from '../../components/Logo';
import { ThemeContext } from 'styled-components';
import { Header } from './Header';

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

export const Home: React.FC = () => {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation<NavigationProp>();
    // const { verificarUser } = useContext(AuthContext);
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | null>(null);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const scrollViewRef = useRef<ScrollView>(null);
    const categoryRefs = useRef<{ [key: string]: View }>({});
    const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
    const [initialLoad, setInitialLoad] = useState(true);
    const { isAuthenticated, user, verificarUser } = useContext(AuthContext);

    const loadCategories = async () => {
        try {
            const response = await api.get('/categories');
            const categoriesWithProducts = await Promise.all(response.data.map(async (category: CategoryProps) => {
                const productResponse = await api.get(`/products/${category.id}`);
                return { ...category, products: productResponse.data };
            }));

            // Filtra categorias que não têm produtos
            const filteredCategories = categoriesWithProducts.filter(category => category.products.length > 0);

            setCategories(filteredCategories);

            // Define a primeira categoria como aberta automaticamente, se existir
            if (filteredCategories.length > 0) {
                setCategorySelected(filteredCategories[0]);
                setExpandedCategory(filteredCategories[0]?.id);
            }
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

    const onRefresh = () => {
        setInitialLoad(true);
        setRefreshing(true);
        loadCategories();
        verificarUser();
    };

    const handleProductPress = (product: ProductProps) => {
        navigation.navigate('ProductDetails', { product, category: categorySelected });
    };

    const scrollToCategory = (categoryId: string) => {
        if (scrollViewRef.current && categoryRefs.current[categoryId]) {
            categoryRefs.current[categoryId].measureLayout(
                scrollViewRef.current as any,
                (x, y, width, height) => {
                    const offset = 160; // Ajuste para cabeçalhos ou margens fixas
                    scrollViewRef.current?.scrollTo({ y: y - offset, animated: true });
                }
            );
        }
        setCategorySelected(categories.find(category => category.id === categoryId) || null);
        setExpandedCategory(categoryId);
    };



    useFocusEffect(
        React.useCallback(() => {
            setInitialLoad(true);
            return () => {
                setInitialLoad(false);
            };
        }, [])
    );

    useEffect(() => {
        if (categorySelected && !initialLoad) {
            scrollToCategory(categorySelected.id);
        }
    }, [categorySelected]);


    const toggleCategory = (id: string) => {
        if (expandedCategory === id) {
            setExpandedCategory(null);
            setInitialLoad(true);
        } else {
            setInitialLoad(false);
        }
    };

    return (
        <ScrollView
            ref={scrollViewRef}
            nestedScrollEnabled={true}
            style={styles(theme).container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme?.primary || '#000']} />
            }
            // stickyHeaderHiddenOnScroll={true}

            stickyHeaderIndices={[1]} // Fixando a seção de categorias
        >
            <Header isAuthenticated={isAuthenticated} user={user} />

            {/* Barra de categorias (fixada no topo) */}
            <View style={styles(theme).categoriesSection}>
                <View style={styles(theme).productsHeader}>
                    <Text style={styles(theme).sectionTitle}>Produtos</Text>
                    <TouchableOpacity style={styles(theme).searchButton} onPress={() => navigation.navigate('Pesquisa')}>
                        {theme && <Icon name="search-outline" size={20} color={theme.white} />}
                        <Text style={styles(theme).buttonText}>Pesquisar</Text>
                    </TouchableOpacity>
                </View>
                {loadingCategories && categories.length === 0 || categories.length === 0 ? null : (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles(theme).categories}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                style={[
                                    styles(theme).categoryButton,
                                    category.id === categorySelected?.id && styles(theme).selectedCategoryButton,
                                ]}
                                onPress={() => {
                                    scrollToCategory(category.id);
                                    toggleCategory(category.id);
                                }}
                            >
                                <Icon name="fast-food-outline" style={styles(theme).categoryHorizontalIcon} />
                                <Text style={styles(theme).categoryText}>{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>

            {/* Lista de Produtos */}
            <View style={styles(theme).productsSection}>
                {loadingCategories ? (
                    <View style={styles(theme).loadingContainer}>
                        {theme && <ActivityIndicator size={33} color={theme.primary} />}
                    </View>
                ) : (
                    categories.length === 0 ? (
                        <View style={styles(theme).emptyMessageContainer}>
                            <Text style={styles(theme).emptyMessageText}>Nenhum produto ou categoria disponível no momento.</Text>
                        </View>
                    ) : (
                        categories.map((category) => (
                            <View
                                key={category.id}
                                ref={(ref) => {
                                    if (ref) categoryRefs.current[category.id] = ref;
                                }}
                                style={styles(theme).categoryContainer}
                            >
                                <TouchableOpacity onPress={() => { scrollToCategory(category.id); toggleCategory(category.id); }} style={styles(theme).categoriasProdutos}>
                                    <Text style={styles(theme).categoryTitle}>{category.name}</Text>
                                    <Icon name={expandedCategory === category.id ? 'chevron-up-outline' : 'chevron-down-outline'} style={styles(theme).categoryIcon} />
                                </TouchableOpacity>
                                {expandedCategory === category.id && category.products?.map(product => (
                                    <TouchableOpacity
                                        key={product.id}
                                        style={styles(theme).productContainer}
                                        onPress={() => handleProductPress(product)}
                                    >
                                        {imageError[product.id] || !product.banner ? (
                                            <DefaultLogoImage style={styles(theme).productImage} theme={theme} />
                                        ) : (
                                            <Image
                                                source={{ uri: `${api.defaults.baseURL}${product.banner}?t=${new Date().getTime()}` }}
                                                onError={() => setImageError(prev => ({ ...prev, [product.id]: true }))}
                                                style={styles(theme).productImage}
                                            />
                                        )}
                                        <View style={styles(theme).productDetails}>
                                            <Text style={styles(theme).productName}>{product.name}</Text>
                                            <Text style={styles(theme).productDescription} numberOfLines={2}>
                                                {product.description}
                                            </Text>
                                            <Text style={styles(theme).productPrice}> {Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))
                    )
                )}
            </View>
        </ScrollView>
    );

}
