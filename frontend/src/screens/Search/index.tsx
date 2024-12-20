import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { api } from '../../services/api';
import styles from './style';
import {DefaultLogoImage} from '../../components/Logo';
import { ThemeContext } from 'styled-components';

type CategoryProps = {
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
  category: {
    name: string;
  };
};

type NavigationProp = NativeStackNavigationProp<StackParamList, 'ProductDetails'>;

const PizzaScreen = () => {
  const theme = useContext(ThemeContext);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps | null>(null);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [originalProducts, setOriginalProducts] = useState<ProductProps[]>([]); // Estado para armazenar os produtos originais
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const navigation = useNavigation<NavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);

  const categoryIcons = {
    'Pizzas': 'pizza',
    'Bebidas': 'beer',
    'Sobremesas': 'ice-cream',
  };

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get('/categories');
        const categoriesWithProducts = await Promise.all(response.data.map(async (category: CategoryProps) => {
          const productResponse = await api.get(`/products/${category.id}`);
          return {
            ...category,
            hasProducts: productResponse.data.length > 0, // Adiciona uma propriedade para verificar se há produtos
          };
        }));

        // Filtra categorias que têm produtos
        const filteredCategories = categoriesWithProducts.filter(category => category.hasProducts);
        setCategories([{ id: 'all', name: 'Todos' }, ...filteredCategories]); // Adiciona a categoria "Todos" no início
        setCategorySelected({ id: 'all', name: 'Todos' });
      } catch (error) {
        console.error(error);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      setLoadingProducts(true);
      try {
        const response = await api.get(
          categorySelected && categorySelected.id !== 'all'
            ? `/products/${categorySelected.id}`
            : '/products'
        );

        // Atualiza os produtos
        const updatedProducts = response.data.map((product: ProductProps) => ({
          ...product,
          category: product.category || categorySelected,
        }));

        setProducts(updatedProducts);
        setOriginalProducts(updatedProducts); // Salva os produtos originais
        setProductSelected(updatedProducts[0]);  // Defina o primeiro produto como selecionado, se necessário
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, [categorySelected]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text === '') {
      setProducts(originalProducts); // Restaura os produtos originais quando o campo de pesquisa estiver vazio
    } else {
      const filtered = originalProducts.filter(product =>
        product.name.toLowerCase().includes(text.toLowerCase())||
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filtered); // Aplica o filtro
    }
  };

  function handleChangeCategory(item: CategoryProps | null, index?: number) {
    setCategorySelected(item);
    if (index !== undefined) {
      scrollViewRef.current?.scrollTo({ x: index * 150, animated: true });
    }
  }

  const handleProductPress = (product: ProductProps) => {
    navigation.navigate('ProductDetails', { product, category: categorySelected });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const renderProductItem = ({ item }: { item: ProductProps }) => (
    <TouchableOpacity
      style={styles(theme).foodItem}
      onPress={() => handleProductPress(item)}
    >
      <View style={styles(theme).imageContainer}>
        {imageError[item.id] || !item.banner ? (
          <DefaultLogoImage style={styles(theme).image}  theme={theme}/>
        ) : (
          <Image
            source={{ uri: `${api.defaults.baseURL}${item.banner}?t=${new Date().getTime()}` }}
            onError={() => setImageError(prev => ({ ...prev, [item.id]: true }))}
            style={styles(theme).image}
          />
        )}
      </View>
      <View style={styles(theme).infoContainer}>
        <Text style={styles(theme).name}>{item.name}</Text>
        <Text style={styles(theme).category}>{item.category.name}</Text>
        <Text style={styles(theme).ingredients} numberOfLines={2}>
          {truncateText(item.description, 100)}
        </Text>
        <Text style={styles(theme).price}>{Number(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).headerFilter}>
        <View style={styles(theme).searchContainer}>
          <Ionicons name="search" size={24} color={theme.primary} style={styles(theme).searchIcon} />
          <TextInput
            style={styles(theme).searchInput}
            placeholder="Procure..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <View style={styles(theme).categoriasContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles(theme).categoriesListContainer}
            ref={scrollViewRef}
          >
            {categories.map((item, index) => {
              const iconForCategory = categoryIcons[item.name] || 'fast-food';
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles(theme).categoryButton,
                    item.id === categorySelected?.id && styles(theme).selectedCategoryButton,
                  ]}
                  onPress={() => handleChangeCategory(item, index)}
                >
                  <Ionicons name={iconForCategory} style={[
                    styles(theme).iconeCategorias, item.id === categorySelected?.id && { color: theme.white }
                  ]} />
                  <Text style={[styles(theme).categoryButtonText, item.id === categorySelected?.id && { color: theme.white }]}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {loadingProducts ? (
        <ActivityIndicator size={33} color={theme.black} />
      ) : products.length === 0 ? ( // Verifica se não há produtos
        <View style={styles(theme).noProductsContainer}>
          <Text style={styles(theme).noProductsText}>Não há produtos disponíveis</Text>
          <Text style={styles(theme).noProductsTextSub}>Tente Novamente Mais Tarde.</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default PizzaScreen;
