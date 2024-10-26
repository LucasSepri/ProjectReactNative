import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import styles from './style';
import { COLORS } from '../../styles/COLORS';

type ProductProps = {
  price: string;
  ingredients: string;
  description: string;
  banner: string;
  id: string;
  name: string;
};

type CategoryProps = {
  id: string;
  name: string;
};

type NavigationProp = NativeStackNavigationProp<StackParamList, 'ProductDetails'>;

const PizzaScreen = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps | null>(null);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadCategories);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    loadProducts();
  }, [categorySelected]);

  const loadCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories([{ id: 'all', name: 'Todos' }, ...response.data]);
      setCategorySelected({ id: 'all', name: 'Todos' });
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    setLoadingProducts(true);
    if (JSON.stringify(user.name) === '""') {
      setProducts([]);
      return setLoadingProducts(false);
    } else {
      try {
        const response = await api.get(categorySelected && categorySelected.id !== 'all'
          ? `/products/${categorySelected.id}`
          : '/favorites');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProducts(false);
      }
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setProducts(filtered);
  };

  const handleProductPress = (product: ProductProps) => {
    navigation.navigate('ProductDetails', { product, category: categorySelected });
  };

  const renderProductItem = ({ item }: { item: ProductProps }) => (
    <TouchableOpacity style={styles.foodItem} onPress={() => handleProductPress(item)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: `${api.defaults.baseURL}${item.banner}` }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.ingredients}>{item.description}</Text>
        <Text style={styles.price}>R$ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color={COLORS.darkGrey} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Procure..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {loadingProducts ? (
        <ActivityIndicator size="large" color={COLORS.black} style={styles.loader} />
      ) : products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>Você ainda não tem produtos favoritados.</Text>
          <Text style={styles.emptyInstruction}>Favorite produtos para vê-los aqui!</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};



export default PizzaScreen;
