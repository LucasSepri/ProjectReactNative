import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../routes/admin.routes';
import { api } from '../../../services/api';
import styles from './style';
import { DefaultLogoImage } from '../../../components/Logo';
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

type NavigationProp = NativeStackNavigationProp<StackParamList>;

const PizzaScreen = () => {
  const theme = useContext(ThemeContext);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps | null>(null);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [originalProducts, setOriginalProducts] = useState<ProductProps[]>([]); // Estado para armazenar os produtos originais
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState<{ [key: string]: boolean }>({});
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

      // Se houver categorias com produtos, adiciona a categoria "Todos"
      if (filteredCategories.length > 0) {
        setCategories([{ id: 'all', name: 'Todos' }, ...filteredCategories]); // Adiciona a categoria "Todos"
        setCategorySelected({ id: 'all', name: 'Todos' });
      } else {
        setCategories(filteredCategories); // Se não houver categorias com produtos, não adiciona "Todos"
        setCategorySelected(null); // Reseta a categoria selecionada
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);


  useFocusEffect(
    useCallback(() => {
      if (categorySelected) {
        loadProducts(); // Carrega os produtos somente se uma categoria estiver selecionada
      } else {
        loadCategories(); // Carrega categorias apenas quando necessário
        loadProducts(); // Carrega os produtos somente se uma categoria estiver selecionada
      }

    }, [categorySelected, navigation])
  );
  const loadProducts = async () => {
    setImageError({});
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
  };

  useEffect(() => {
    loadProducts();
  }, [categorySelected]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text === '') {
      setProducts(originalProducts); // Restaura os produtos originais quando o campo de pesquisa estiver vazio
    } else {
      const filtered = originalProducts.filter(product =>
        product.name.toLowerCase().includes(text.toLowerCase()) ||
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
    navigation.navigate('AddProduct', { productId: product.id });
  };

  const handleDeleteProduct = async (productId: string) => {
    setLoadingDelete(prev => ({ ...prev, [productId]: true }));

    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
      setOriginalProducts(originalProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDelete(prev => ({ ...prev, [productId]: false }));
      Alert.alert('Produto Deletado', 'Produto deletado com sucesso!');
      loadCategories();
    }
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
          <DefaultLogoImage style={styles(theme).image} theme={theme} />
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
        <Text style={styles(theme).price}>
          {Number(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>

      {loadingDelete[item.id] ? (
        <View style={styles(theme).deleteButton}>
          <ActivityIndicator size="small" color={theme.white} />
        </View>
      ) : (
        <TouchableOpacity
          style={styles(theme).deleteButton}
          onPress={async () => {
            await handleDeleteProduct(item.id);
          }}
        >
          <Ionicons name="trash" size={24} color={theme.white} />
        </TouchableOpacity>
      )}
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

          {!loadingProducts && (
            <TouchableOpacity style={styles(theme).adicionarProdutos} onPress={
              () => navigation.navigate('AddProduct', { productId: null })
            }>
              <Text style={styles(theme).adicionarProdutosText}>Adicionar Produto</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loadingProducts ? (
        <ActivityIndicator size={33} color={theme.black} />
      ) : products.length === 0 ? ( // Verifica se não há produtos
        <View style={styles(theme).noProductsContainer}>
          <Text style={styles(theme).noProductsText}>Não há produtos disponíveis</Text>
          <Text style={styles(theme).noProductsTextSub}>Adicione para ver aqui</Text>
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
