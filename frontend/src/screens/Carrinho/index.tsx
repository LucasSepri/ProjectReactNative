import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Pressable, Alert, SafeAreaView, TextInput, ActivityIndicator, FlatList } from 'react-native';
import styles from './style';
import { COLORS } from '../../styles/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { PrimaryButton } from '../../components/Button';
import { useTable } from '../../context/TableContext';
import { Picker } from '@react-native-picker/picker';

const Carrinho = ({ navigation }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { tableNumber, clearTable } = useTable();
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const handleOrderSubmit = async () => {
    if (!deliveryOption) {
      Alert.alert('Erro', 'Por favor, selecione uma forma de entrega.');
      return;
    }

    const orderData = {
      deliveryType: deliveryOption === 'endereco' ? 'Endereço' : 'Mesa',
      deliveryAddress: deliveryOption === 'endereco' ? deliveryAddress : undefined,
      tableNumber: deliveryOption === 'mesa' ? tableNumber : undefined,
    };

    try {
      const response = await api.post('/orders', orderData);
      Alert.alert('Sucesso', 'Pedido criado com sucesso!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao criar o pedido:', error);
      Alert.alert('Erro', 'Não foi possível criar o pedido. Tente novamente.');
    }
  };

  const loadCartItems = async () => {
    setLoading(true);
    if (!user || !user.name) {
      setCartItems([]);
      setTotalPrice(0);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/cart');
      setCartItems(response.data.cart.items);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      if (cartItems.length === 0) {
        setTotalPrice(0);
        setCartItems([]);
      } else {
        console.error('Erro ao carregar o carrinho:', error);
      }
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadCartItems);
    return unsubscribe;
  }, [navigation, user]);

  const handleRemove = async (product_id) => {
    try {
      await api.delete(`/cart/${product_id}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== product_id));
    } catch (error) {
      console.error('Erro ao remover o item do carrinho:', error);
    }
  };

  const updateItemAmount = async (item, amountChange) => {
    const newAmount = item.amount + amountChange;
    if (newAmount < 1) return;

    try {
      await api.put('/cart', {
        product_id: item.product_id,
        amount: newAmount,
      });
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.product_id === item.product_id ? { ...cartItem, amount: newAmount } : cartItem
        )
      );
      setTotalPrice((prevTotal) => prevTotal + item.product.price * amountChange);
    } catch (error) {
      console.error('Erro ao atualizar a quantidade do item:', error);
    }
  };

  const CartCard = ({ item }) => {
    const totalPrice = item.product.price * item.amount;

    return (
      <View style={styles.cartCard}>
        <View style={styles.removeButtonContainer}>
          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.product_id)}>
            <Icon name="trash" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: `${api.defaults.baseURL}${item.product.banner}` }} style={styles.image} />
        <View style={styles.cardInfo}>
          <Text style={styles.itemName}>{item.product.name}</Text>
          <Text style={styles.price}>R$ {totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => updateItemAmount(item, -1)}>
            <Icon name="remove" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.amount}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => updateItemAmount(item, 1)}>
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

  const handleDeliveryOptionChange = (itemValue) => {
    setDeliveryOption(itemValue);
    if (itemValue === 'mesa') {
      navigation.navigate('Qrcode');
    }
  };

  const handleAddressSubmit = () => {
    if (deliveryOption === 'endereco') {
      setAddressSubmitted(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {tableNumber ? (
        <TouchableOpacity style={styles.botaoMesaSair} onPress={clearTable}>
          <Text style={styles.textoMesaSair}>Mesa {tableNumber}</Text>
          <Icon name="exit" size={20} style={styles.iconeMesaSair} />
        </TouchableOpacity>
      ) : addressSubmitted ? (
        <TouchableOpacity onPress={() => setAddressSubmitted(false)} style={styles.addressSubmittedContainer}>
          <Text style={styles.addressSubmittedText}>{deliveryAddress}</Text>
          <Icon name="create-outline" size={20} color={COLORS.white} />
        </TouchableOpacity>
      ) : (
        <>
          <Picker selectedValue={deliveryOption} onValueChange={handleDeliveryOptionChange} style={styles.picker}>
            <Picker.Item label="Selecione a forma de entrega" value="" />
            <Picker.Item label="Selecionar Mesa" value="mesa" />
            <Picker.Item label="Selecionar Endereço" value="endereco" />
          </Picker>
          {deliveryOption === 'endereco' && (
            <>
              <TextInput
                placeholder="Digite seu endereço"
                value={deliveryAddress}
                onChangeText={setDeliveryAddress}
                style={styles.addressInput}
              />
              <TouchableOpacity onPress={handleAddressSubmit} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
      {loading ? (
        <ActivityIndicator size={50} color={COLORS.secondary} style={styles.flatList} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          data={cartItems}
          renderItem={({ item }) => <CartCard item={item} />}
          ListEmptyComponent={renderEmptyCart}
        />
      )}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.containerPreco}>
            <Text style={styles.totalText}>Preço Total</Text>
            <Text style={styles.totalPrice}>R$ {totalPrice.toFixed(2)}</Text>
          </View>
          <PrimaryButton title="PEDIR AGORA" onPress={handleOrderSubmit} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Carrinho;
