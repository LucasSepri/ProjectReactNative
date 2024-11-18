import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import styles from './style';
import { DefaultLogoImage } from '../../components/Logo';
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from 'styled-components';

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
  const theme = useContext(ThemeContext);
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
      style={styles(theme).foodItem}
      onPress={() => handleProductPress(item)}
    >
      <View style={styles(theme).imageContainer}>
        {imageError[item.id] || !item.banner ? (
          <DefaultLogoImage style={styles(theme).image} theme={theme} />
        ) : (
          <Image
            source={{ uri: `${api.defaults.baseURL}` + item.banner + `?t=${new Date().getTime()}` }}
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
      <Text style={styles(theme).header}>Favoritos</Text>

      <View style={styles(theme).searchContainer}>
        <Ionicons name="search" size={24} color={theme.primary} style={styles(theme).searchIcon} />
        <TextInput
          style={styles(theme).searchInput}
          placeholder="Procure..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {loading ? (
        <View style={styles(theme).loadingContainer}>
          <ActivityIndicator size={33} color={theme.primary} />
        </View>
      ) : (
        filteredProducts.length === 0 ? (
          <View style={styles(theme).emptyContainer}>
            <Text style={styles(theme).emptyMessage}>Você ainda não tem produtos favoritados.</Text>
            <Text style={styles(theme).emptyInstruction}>Favorite produtos para vê-los aqui!</Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles(theme).productList}
            showsVerticalScrollIndicator={false}
          />
        )
      )}

    </View>
  );
};

export default FavoritesScreen;
