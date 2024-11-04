import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { api } from '../../services/api';
import styles from './style';
import { COLORS } from '../../styles/COLORS';

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
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps | null>(null);
  const [products, setProducts] = useState<ProductProps[]>([]);
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
        setCategories([{ id: 'all', name: 'Todos' }, ...response.data]);
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
          , {
            params: {
              category_id: categorySelected && categorySelected.id !== 'all' ? categorySelected.id : undefined
            }
          });
        setProducts(response.data);
        setProductSelected(response.data[0]);
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
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setProducts(filtered);
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
      style={styles.foodItem}
      onPress={() => handleProductPress(item)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={imageError[item.id]
            ? require('../../assets/logo.png') // Exibe a imagem padrão se houver erro
            : { uri: `${api.defaults.baseURL}${item.banner}` }}
          onError={() => setImageError(prev => ({ ...prev, [item.id]: true }))} // Marca o erro para este produto
          style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category.name}</Text>
        <Text style={styles.ingredients} numberOfLines={2}>
          {truncateText(item.description, 100)} {/* Limite de 100 caracteres */}
        </Text>
        <Text style={styles.price}>R$ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerFilter}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color={COLORS.primary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Procure..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

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
                  <Ionicons name={iconForCategory} style={[
                    styles.iconeCategorias, item.id === categorySelected?.id && { color: COLORS.white }
                  ]} />
                  <Text style={[styles.categoryButtonText, item.id === categorySelected?.id && { color: COLORS.white }]}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {loadingProducts ? (
        <ActivityIndicator size="large" color={COLORS.black} />
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