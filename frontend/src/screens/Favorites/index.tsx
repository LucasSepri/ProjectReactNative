import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import styles from './style';
import { COLORS } from '../../styles/COLORS';
import DefaultLogoImage from '../../components/Logo';

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

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const FavoritesScreen = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    loadProducts();
    const unsubscribe = navigation.addListener('focus', loadProducts);
    return unsubscribe;
  }, [navigation]);


  const loadProducts = async () => {
    setLoadingProducts(true);
    if (!isAuthenticated || !user.name) {
      setProducts([]);
      setFilteredProducts([]);
      setLoadingProducts(false);
      return;
    }

    try {
      const response = await api.get('/favorites');
      setProducts(response.data);
      setFilteredProducts(response.data); // Atualiza o estado de produtos filtrados
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleProductPress = (product: ProductProps) => {
    navigation.navigate('ProductDetails', { product, category: 'defaultCategory' });
  };

  const renderProductItem = ({ item }: { item: ProductProps }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => handleProductPress(item)}
    >
      <View style={styles.imageContainer}>
        {imageError[item.id] || !item.banner ? (
          <DefaultLogoImage style={styles.image} />
        ) : (
          <Image
            source={{ uri: `${api.defaults.baseURL}${item.banner}` }}
            onError={() => setImageError(prev => ({ ...prev, [item.id]: true }))}
            style={styles.image}
          />
        )}
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
      <Text style={styles.header}>
        Favoritos
      </Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color={COLORS.primary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Procure..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {loadingProducts ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      ) : filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>Você ainda não tem produtos favoritados.</Text>
          <Text style={styles.emptyInstruction}>Favorite produtos para vê-los aqui!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;
