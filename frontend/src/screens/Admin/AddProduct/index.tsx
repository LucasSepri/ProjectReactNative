import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { api } from '../../../services/api';
import styles from './style';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { DefaultGalleryAddImage } from '../../../components/Profile';
import * as FileSystem from 'expo-file-system';
import { TextInputMask } from 'react-native-masked-text';
import { ThemeContext } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

const AddProduct = ({ route, navigation }) => {
  const theme = useContext(ThemeContext);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingProduct] = useState(route.params?.productId);
  const [productId, setProductId] = useState(route.params?.productId);
  const [errorImage, setErrorImage] = useState(false);

  const loadCategoriesAndProductData = async () => {
    setLoading(true);
    try {
      const categoriesResponse = await api.get('/categories');
      setCategories(categoriesResponse.data);
      if (categoriesResponse.data.length > 0) {
        setSelectedCategory(categoriesResponse.data[0].id);
      }
      if (productId) {
        const response = await api.get('/products/');
        const product = response.data.find(p => p.id === productId);
        if (product) {
          const { name, price, description, category_id, banner } = product;
          if (banner) {
            try {
              await api.head(`${api.defaults.baseURL}${banner}`);
              setSelectedImage(`${api.defaults.baseURL}${banner}`);
            } catch {
              setErrorImage(true); // Marca erro para exibir fallback
            }
          }
          setProductName(name);
          setProductPrice((price * 100).toString()); // "7000" será interpretado como R$ 70,00
          setProductDescription(description);
          setSelectedCategory(category_id);
          console.log(productPrice);
        } else {
          console.error('Produto não encontrado');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar produto', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadCategoriesAndProductData();
  }, [productId]);
  useFocusEffect(
    useCallback(() => {
      loadCategoriesAndProductData();
    }, [productId]));

  const handleSubmit = async () => {
    console.log("imagem selecionada: " + selectedImage);
    setLoading(true);

    try {
      const formattedPrice = Number(productPrice.replace(/[^0-9,]/g, '').replace(',', '.'));

      if (isNaN(formattedPrice)) {
        Alert.alert('Erro', 'Preço inválido. Por favor, verifique o formato.');
        setLoading(false);
        return;
      }

      let formData = new FormData();
      formData.append('name', productName);
      formData.append('price', formattedPrice.toString());
      formData.append('description', productDescription);
      formData.append('category_id', selectedCategory);



      if (selectedImage && !selectedImage.startsWith('http')) {
        // Para imagens locais
        const fileInfo = await FileSystem.getInfoAsync(selectedImage);
        if (!fileInfo.exists) {
          throw new Error('File does not exist');
        } else {
          console.log("fileInfo: " + fileInfo.uri);
          const fileUri = fileInfo.uri;
          const fileType = 'image/jpeg';
          const fileName = fileUri.split('/').pop();

          formData.append('banner', {
            uri: fileUri,
            name: fileName,
            type: fileType,
          } as any);
        }
      }


      const response = editingProduct
        ? await api.put(`/products/${productId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        : await api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      Alert.alert('Sucesso', editingProduct ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!');
      navigation.goBack();
    } catch (error) {
      if (error.response) {
        // A resposta foi recebida, mas o servidor respondeu com um código de status
        console.error('Erro ao criar/editar produto:', error.response.data);
        Alert.alert('Erro', 'Erro ao criar/editar produto: ' + error.response.data.message);
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta
        console.error('Erro de rede:', error.request);
        Alert.alert('Erro de Rede', 'Não foi possível se comunicar com o servidor. Tente novamente mais tarde.');
      } else {
        // Outro erro
        console.error('Erro desconhecido:', error.message);
        Alert.alert('Erro desconhecido', 'Ocorreu um erro inesperado. Tente novamente.');
      }
    }
    finally {
      setLoading(false);
    }
  };

  const pickImageAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('É necessário conceder permissão para acessar a galeria de imagens.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1 });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setErrorImage(false);
    } else {
      alert('Você não selecionou nenhuma imagem.');
    }
  };

  if (loading) {
    return (
      <View style={styles(theme).loadingContainer}>
        <ActivityIndicator size={50} color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={styles(theme).container}>
      <ScrollView style={styles(theme).formContainer}>
        <Text style={styles(theme).title}>{productId ? 'Editar Produto' : 'Criar Novo Produto'}</Text>

        <TouchableOpacity onPress={pickImageAsync} style={styles(theme).imagePicker}>
          {!errorImage && selectedImage ? (
            <Image
              source={{ uri: selectedImage + `?t=${new Date().getTime()}` }}
              style={styles(theme).image}
              onError={(e) => { setErrorImage(true); }}
            />
          ) : (
            <View style={styles(theme).imagePlaceholder}>
              <DefaultGalleryAddImage style={styles(theme).defaultProfileIcon} theme={theme} />
              <Text style={styles(theme).imageText}>Adicionar Foto</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="Nome do Produto"
          value={productName}
          onChangeText={setProductName}
          style={styles(theme).input}
        />

        <View style={styles(theme).pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={setSelectedCategory}
            style={styles(theme).picker}
            dropdownIconColor={Platform.OS === 'ios' ? 'gray' : 'transparent'}
          >
            {categories.map((category) => (
              <Picker.Item key={category.id} label={category.name} value={category.id} />
            ))}
          </Picker>
        </View>

        <TextInputMask
          type={'money'}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$ ',
            suffixUnit: ''
          }}
          value={productPrice}
          onChangeText={setProductPrice}
          style={styles(theme).input}
          keyboardType="numeric"
          placeholder="R$ 0,00"
        />

        <View style={styles(theme).inpultContainer}>
          <TextInput
            placeholder="Descrição do produto"
            value={productDescription}
            onChangeText={setProductDescription}
            style={styles(theme).inputDescription}
            multiline
            numberOfLines={3}
            maxLength={400}
          />
          <Text style={styles(theme).charCountText}>
            {400 - productDescription.length} caracteres restantes
          </Text>
        </View>

        <View style={styles(theme).buttonContainer}>
          {(productName && productPrice && productDescription && selectedCategory) ? (
            <TouchableOpacity onPress={handleSubmit} style={[styles(theme).button, styles(theme).submitButton]}>
              <Text style={styles(theme).buttonText}>{editingProduct ? 'Editar Produto' : 'Criar Produto'}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles(theme).button, styles(theme).submitButton, { backgroundColor: theme.border }]} disabled>
              <Text style={styles(theme).buttonText}>{editingProduct ? 'Editar Produto' : 'Criar Produto'}</Text>
            </TouchableOpacity>
          )}

          {editingProduct && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles(theme).button, styles(theme).cancelButton]}>
              <Text style={styles(theme).buttonText}>Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddProduct;
