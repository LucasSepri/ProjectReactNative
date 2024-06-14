import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native';
import { PrimaryButton } from '../../components/Button';
import { api } from '../../services/api';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../styles/COLORS';
import styles from './style';
import { useFoods } from '../../context/FoodsContext';
import { useTable } from '../../context/TableContext';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserDetailsModal from '../../components/InformacoesDeContatoModal';  // Importar o novo componente

const Carrinho = ({ navigation }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { foods, setFoods } = useFoods();
  const { tableNumber, clearTable } = useTable();
  const [deliveryOption, setDeliveryOption] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [deliveryType, setDeliveryType] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!isAuthenticated) {
        await AsyncStorage.setItem('cart', JSON.stringify(foods));
        // Não mostrar o modal automaticamente ao carregar
      }
    };

    checkAuthentication();
  }, [isAuthenticated, foods, navigation]);

  const handleIncrement = (itemId) => {
    setFoods(prevFoods =>
      prevFoods.map(food =>
        food.id === itemId ? { ...food, quantity: food.quantity + 1 } : food
      )
    );
  };

  const handleDecrement = (itemId) => {
    setFoods(prevFoods =>
      prevFoods.map(food =>
        food.id === itemId && food.quantity > 1 ? { ...food, quantity: food.quantity - 1 } : food
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setFoods(prevFoods => prevFoods.filter(food => food.id !== itemId));
  };


  const handlePedidoPress = async () => {
    setModalVisible(true);
  };


  const handleModalSubmit = (userData) => {
    console.log('User Data:', userData);
    // Aqui você pode salvar os dados do usuário conforme necessário
    setModalVisible(false); // Fechar o modal após submissão
  };

  const CartCard = ({ item }) => {
    const itemPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(',', '.')) : parseFloat(item.price);
    const totalPrice = itemPrice * item.quantity;

    return (
      <View style={styles.cartCard}>
        <View style={styles.removeButtonContainer}>
          <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
            <Icon name="trash" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: `${api.defaults.baseURL}/files/${item.banner}` }} style={styles.image} />
        <View style={styles.cardInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.ingredients}>{item.ingredients ? item.ingredients.join(', ') : ''}</Text>
          <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.quantityButton}>
            <Icon name="remove" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleIncrement(item.id)} style={styles.quantityButton}>
            <Icon name="add" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartText}>Seu carrinho está vazio. Adicione alguns produtos!</Text>
    </View>
  );

  const totalPrice = foods.reduce((acc, item) => {
    const itemPrice = typeof item.price === 'string' ? parseFloat((item.price as string).replace(',', '.')) : parseFloat(item.price.toString());
    return acc + itemPrice * item.quantity;
  }, 0);

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={foods}
        renderItem={({ item }) => <CartCard item={item} />}
        ListEmptyComponent={renderEmptyCart}
      />
      <View style={styles.footer}>
        <View style={styles.containerPreco}>
          <Text style={styles.totalText}>Preço Total</Text>
          <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
        </View>
        <PrimaryButton title="PEDIR AGORA" onPress={handlePedidoPress} />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <UserDetailsModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleModalSubmit} navigation={navigation}        />
      </Modal>
    </SafeAreaView>
  );
};

export default Carrinho;
