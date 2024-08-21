import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { api } from '../../services/api';

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
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps | null>(null);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

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
        const response = await api.get('/category');
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
        const response = await api.get('/category/product', {
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

  const renderProductItem = ({ item }: { item: ProductProps }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => handleProductPress(item)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: `${api.defaults.baseURL}/files/${item.banner}` }} style={styles.image} />
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
        <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
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
                <Ionicons name={iconForCategory} style={styles.iconeCategorias} />
                <Text style={styles.categoryButtonText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {loadingProducts ? (
        <ActivityIndicator size="large" color="#000" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingLeft: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  categoriasContainer: {
    marginBottom: 16,
  },
  categoriesListContainer: {
    paddingHorizontal: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#ccc',
  },
  iconeCategorias: {
    fontSize: 24,
    color: '#555',
  },
  categoryButtonText: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ingredients: {
    opacity: 0.6,
  },
  price: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default PizzaScreen;
