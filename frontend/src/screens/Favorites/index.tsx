import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import styles from './style';
import { COLORS } from '../../styles/COLORS';
import DefaultLogoImage from '../../components/Logo';
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

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
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

const FavoritesScreen = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const navigation = useNavigation<NavigationProp>();

  // useFocusEffect busca favoritos toda vez que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      const fetchFavorites = async () => {
        setLoading(true);
        try {
          const response = await api.get('/favorites', {
            headers: {
              'Authorization': `Bearer ${user.token}`, // Substitua `userToken` pelo token de autenticação
            },
          });

          const data = response.data;
          setFavorites(data);
        } catch (error) {
          console.error('Erro ao buscar favoritos:', error);
        } finally {
          setLoading(false);
        }
      };

      if (!isAuthenticated) {
        setLoading(false);
        return;
      } else {
        fetchFavorites();
      }
    }, [user.token]) // Atualiza caso o token do usuário mude
  );

  const filteredProducts = favorites.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleProductPress = (product: ProductProps) => {
    navigation.navigate('ProductDetails', { product, category: product.category });
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
            source={{ uri: `${api.defaults.baseURL}` + item.banner }}
            onError={() => setImageError(prev => ({ ...prev, [item.id]: true }))}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category.name}</Text>
        <Text style={styles.ingredients} numberOfLines={2}>
          {truncateText(item.description, 100)}
        </Text>
        <Text style={styles.price}>R$ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favoritos</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color={COLORS.primary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Procure..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        filteredProducts.length === 0 ? (
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
        )
      )}

    </View>
  );
};

export default FavoritesScreen;
