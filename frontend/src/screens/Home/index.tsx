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
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>();

    const categoryIcons = {
        'Pizzas': 'pizza',
        'Bebidas': 'beer',
        'Sobremesas': 'ice-cream',
    };

    const scrollViewRef = useRef<ScrollView>(null);

    // Função para carregar categorias
    useEffect(() => {
        const loadCategories = async () => {
            const response = await api.get('/categories');
            setCategories([{ id: 'all', name: 'Todos' }, ...response.data]);
            setCategorySelected({ id: 'all', name: 'Todos' });
        };
        loadCategories();
    }, []);

    // Função para carregar produtos
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
                setProductSelected(response.data[0]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingProducts(false);
            }
        };
        loadProducts();
    }, [categorySelected]);

    // Função para alterar categoria
    const handleChangeCategory = (item: CategoryProps | null, index?: number) => {
        setCategorySelected(item);
        if (index !== undefined) {
            scrollViewRef.current?.scrollTo({ x: index * 150, animated: true });
        }
    };

    // Funções de navegação
    const handleProductPress = (product: ProductProps) => {
        navigation.navigate('ProductDetails', { product, category: categorySelected });
    };

    const handleLogar = () => {
        navigation.navigate('SignIn');
    };

    const handlePerfil = () => {
        navigation.navigate('Perfil');
    };

    const handleSearch = () => {
        navigation.navigate('Pesquisa');
    };

    const truncateString = (name: string, maxLength: number): string => {
        return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
    };

    const openWhatsApp = () => {
        const phoneNumber = '+5511999999999';
        const url = `whatsapp://send?phone=${phoneNumber}`;
        Linking.openURL(url).catch(() => {
            alert('Certifique-se de que o WhatsApp está instalado no seu dispositivo');
        });
    };

    const openLocation = () => {
        const address = 'Rua Dona Veridiana, 661, Higienópolis, São Paulo - SP, 01238-010';
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        Linking.openURL(url).catch(() => {
            alert('Não foi possível abrir o Google Maps');
        });
    };

    return (
        <ScrollView style={styles.container}>
            {/* HEADER */}
            <ImageBackground
                source={require('../../assets/background.jpg')}
                style={styles.headerImagemDeFundo}
                resizeMode="cover"
            >
                {tableNumber && (
                    <TouchableOpacity style={styles.botaoMesaSair} onPress={clearTable}>
                        <Text style={styles.textoMesaSair}>Mesa {tableNumber}</Text>
                        <Icon name="exit" style={styles.iconeMesaSair} />
                    </TouchableOpacity>
                )}
                <View style={styles.perfil}>
                    {isAuthenticated ? (
                        <TouchableOpacity style={styles.botaoPerfil} onPress={handlePerfil}>
                            <Image source={{ uri: `${api.defaults.baseURL}${user.profileImage}` }} style={styles.perfilFoto} />
                            <Text style={styles.textoNomePerfil}>{truncateString(user.name, 20)}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.botaoPerfil} onPress={handleLogar}>
                            <Icon name="log-in-outline" style={styles.icone} />
                            <Text style={styles.textoNomePerfil}>Logar-se</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.botaoIcone} onPress={handleSearch}>
                        <Icon name="search" style={styles.icone} />
                    </TouchableOpacity>
                </View>

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonWhatsApp} onPress={openWhatsApp}>
                        <Icon name="logo-whatsapp" size={20} color={COLORS.white}  />
                        <Text style={styles.buttonText}>Telefone</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.addressContainer}>
                    <TouchableOpacity style={styles.buttonAddressContainer} onPress={openLocation}>
                        <Icon name="location" size={20} color={COLORS.white}  />
                        <Text style={styles.buttonText}>Rua Dona Veridiana, 661, Higienópolis</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            {/* CATEGORIAS */}
            <Text style={styles.tituloContainerProdutos}>PRODUTOS</Text>
            <View style={styles.categoriasContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesListContainer}
                    ref={scrollViewRef}
                >
                    {categories.map((item, index) => {
                        const iconForCategory = categoryIcons[item.name] || 'fast-food';
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.categoryButton,
                                    item.id === categorySelected?.id && styles.selectedCategoryButton,
                                ]}
                                onPress={() => handleChangeCategory(item, index)}
                            >
                                <Icon name={iconForCategory} style={styles.iconeCategorias} />
                                <Text style={styles.categoryButtonText}>{item.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* PRODUTOS */}
            <View style={styles.foodListContainer}>
                {loadingProducts ? (
                    <ActivityIndicator size={60} color={COLORS.primary} />
                ) : (
                    products.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.foodItem}
                            onPress={() => handleProductPress(item)}
                        >
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: `${api.defaults.baseURL}${item.banner}` }}
                                    style={styles.image}
                                />
                            </View>
                            <View style={styles.infoContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.ingredients}>{item.ingredients}</Text>
                                <Text style={styles.price}>R$ {item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </View>
        </ScrollView>
    );
}
