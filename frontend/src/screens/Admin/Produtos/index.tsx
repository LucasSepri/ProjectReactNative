import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { api } from '../../../services/api';
import * as FileSystem from 'expo-file-system';
import styles from './style';
import { Ionicons } from '@expo/vector-icons';

const App = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedCategoryView, setSelectedCategoryView] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(false);
    const [productId, setProductId] = useState(null);
    const scrollRef = useRef();

    const loadCategories = async () => {
        try {
            const response = await api.get('/category');
            setCategories(response.data);
            if (response.data.length > 0) {
                setSelectedCategory(response.data[0].id);
            }
        } catch (err) {
            console.error('Erro ao buscar categorias:', err);
            setError('Erro ao carregar categorias.');
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await api.get('/category/product');
            setProducts(response.data);
        } catch (err) {
            console.error('Erro ao buscar produtos:', err);
            setError('Erro ao carregar produtos.');
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await api.get('/category');
            setCategories(response.data);
            if (response.data.length > 0) {
                setSelectedCategory(response.data[0].id);
                setSelectedCategoryView('all');  // Default to viewing all products
            }
        })();
    }, []);

    useEffect(() => {
        if (selectedCategoryView !== null) {
            fetchProducts();
        }
    }, [selectedCategoryView]);

    const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
            let response;
            if (selectedCategoryView === 'all') {
                response = await api.get('/category/product');
            } else {
                response = await api.get('/category/product', {
                    params: { category_id: selectedCategoryView }
                });
            }
            setProducts(response.data);
        } catch (err) {
            setError('Erro ao buscar produtos.');
            console.error(err);
        } finally {
            setLoadingProducts(false);
        }
    };

    const pickImageAsync = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('É necessário conceder permissão para acessar a galeria de imagens.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('Você não selecionou nenhuma imagem.');
        }
    };

    useEffect(() => {
        (async () => {
            const response = await api.get('/category');
            setCategories(response.data);
            if (response.data.length > 0) {
                setSelectedCategory(response.data[0].id);
            }
        })();
    }, []);

    const handleSubmit = async () => {
        let formData = new FormData();
        formData.append('name', productName);
        formData.append('price', productPrice);
        formData.append('description', productDescription);
        formData.append('category_id', selectedCategory);

        if (selectedImage) {
            try {
                let fileUri;
                if (editingProduct) {
                    fileUri = selectedImage;
                } else {
                    const fileInfo = await FileSystem.getInfoAsync(selectedImage);

                    if (!fileInfo.exists) {
                        throw new Error('File does not exist');
                    }

                    fileUri = fileInfo.uri;
                }
                const fileType = 'image/jpeg'; // or derive from fileInfo if available
                const fileName = fileUri.split('/').pop();

                formData.append('file', { uri: fileUri, name: fileName, type: fileType } as any);

            } catch (error) {
                console.error('Error getting file info:', error);
                Alert.alert('Erro', 'Erro ao obter informações do arquivo');
                return;
            }
        }

        try {
            let response;
            if (editingProduct) {
                formData.append('id', productId);
                response = await api.put('/product/update', formData, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                });
                loadProducts();
            } else {
                response = await api.post('/product', formData, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                });
                loadProducts();
            }
            if (response.status === 200) {
                Alert.alert('Sucesso', editingProduct ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!');
                setProductName('');
                setProductPrice('');
                setProductDescription('');
                setSelectedImage(null);
                setEditingProduct(null);
            }
        } catch (error) {
            console.error('Erro ao criar/editar produto:', error);
            Alert.alert('Erro', editingProduct ? 'Erro ao editar produto' : 'Erro ao criar produto');
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(true);
        setProductName(product.name);
        setProductPrice(String(product.price));
        setProductDescription(product.description);
        setSelectedImage(`${api.defaults.baseURL}/files/${product.banner}`);
        setSelectedCategory(product.category_id);
        setProductId(product.id);
        (scrollRef.current as ScrollView).scrollTo({ y: 0, animated: true });
    };

    const handleDeleteProduct = async (id) => {
        try {
            await api.delete('/product/remove', { data: { id } });
            setProducts(products.filter(product => product.id !== id));
            Alert.alert('Sucesso', 'Produto excluído com sucesso!');
        } catch (err) {
            setError('Erro ao excluir categoria.');
        }
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(category => category.id === categoryId);
        return category ? category.name : 'Categoria desconhecida';
    };

    return (
        <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
            {editingProduct ? (
                <Text style={styles.title}>Editar esse Produto</Text>
            ) : (
                <Text style={styles.title}>Crie um novo produto:</Text>
            )}
            <Text style={styles.label}>Escolha a categoria:</Text>

            <View style={styles.pickerContainer}>
                <TouchableOpacity onPress={loadCategories} style={styles.reloadButton}>
                    <Ionicons name="refresh" style={styles.reloadIcon} />
                </TouchableOpacity>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={value => setSelectedCategory(value)}
                    style={styles.picker}
                    dropdownIconColor={Platform.OS === 'ios' ? 'gray' : 'transparent'}
                >
                    {categories.map(category => (
                        <Picker.Item key={category.id} label={category.name} value={category.id} />
                    ))}
                </Picker>
            </View>

            <TouchableOpacity onPress={pickImageAsync} style={styles.imagePicker}>
                {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                ) : (
                    <Text style={styles.uploadText}>Foto do Produto</Text>
                )}
            </TouchableOpacity>

            <TextInput
                placeholder='Nome do produto'
                placeholderTextColor='#000'
                value={productName}
                onChangeText={setProductName}
                autoCapitalize='none'
                style={styles.input}
            />
            <TextInput
                placeholder='Preço do produto'
                placeholderTextColor='#000'
                value={productPrice}
                onChangeText={setProductPrice}
                keyboardType='numeric'
                autoCapitalize='none'
                style={styles.input}
            />
            <TextInput
                placeholder='Descrição do produto'
                placeholderTextColor='#000'
                value={productDescription}
                onChangeText={setProductDescription}
                autoCapitalize='none'
                style={styles.input}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>{editingProduct ? "Editar Produto" : "Criar Produto"}</Text>
            </TouchableOpacity>

            <Text style={styles.productsTitle}>Produtos</Text>

            <View style={styles.pickerContainer}>
                <TouchableOpacity onPress={loadProducts} style={styles.reloadButton}>
                    <Ionicons name="refresh" style={styles.reloadIcon} />
                </TouchableOpacity>
                <Picker
                    selectedValue={selectedCategoryView}
                    onValueChange={value => setSelectedCategoryView(value)}
                    style={styles.picker}
                    dropdownIconColor={Platform.OS === 'ios' ? 'gray' : 'transparent'}
                >
                    <Picker.Item key="all" label="Todos os Produtos" value="all" />
                    {categories.map(category => (
                        <Picker.Item key={category.id} label={category.name} value={category.id} />
                    ))}
                </Picker>
            </View>

            <View style={styles.productsContainer}>
                {loadingProducts ? (
                    <ActivityIndicator size={60} color="red" />
                ) : (
                    products.map((item) => (
                        <View key={item.id} style={styles.productItem}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: `${api.defaults.baseURL}/files/${item.banner}` }}
                                    style={styles.productImage}
                                />
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.actions}>
                                    <TouchableOpacity onPress={() => handleEditProduct(item)} style={styles.editButton}>
                                        <Text style={styles.editButtonText}>Editar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDeleteProduct(item.id)} style={styles.deleteButton}>
                                        <Text style={styles.deleteButtonText}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productDescription}>{item.description}</Text>
                                <Text style={styles.productCategory}>{getCategoryName(item.category_id)}</Text>
                                <Text style={styles.productPrice}>R$ {item.price}</Text>
                            </View>
                        </View>
                    ))
                )}
            </View>
        </ScrollView>
    );
};

export default App;
