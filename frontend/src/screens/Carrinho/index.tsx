import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { PrimaryButton } from '../../components/Button';
import { api } from '../../services/api';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../styles/COLORS';
import styles from './style';
import { useFoods } from '../../context/FoodsContext';
import { useTable } from '../../context/TableContext';
import {AuthContext } from '../../context/AuthContext'

const Carrinho = ({ navigation }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { foods, setFoods } = useFoods();
  const { tableNumber, clearTable } = useTable();
  const [deliveryOption, setDeliveryOption] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [deliveryType, setDeliveryType] = useState('');

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

  const submitAddress = () => {
    if (!deliveryAddress.trim()) {
      alert('Por favor, digite um endereço.');
    } else {
      setAddressSubmitted(true);
    }
  };

  const editAddress = () => {
    setAddressSubmitted(false);
  };

  const handlePedidoPress = async () => {
    if (!deliveryType) {
      alert('Por favor, selecione uma forma de entrega.');
      return;
    }
  
    if (deliveryType === 'endereco' && !deliveryAddress.trim()) {
      alert('Por favor, forneça um endereço de entrega.');
      return;
    }
  
    try {
      const orderItems = foods.map(food => ({
        amount: food.quantity,
        product_id: food.id,
        price: parseFloat(food.price.toString())
      }));
  
      const orderData = {
        deliveryType,
        table: deliveryType === 'mesa' ? tableNumber : null,
        address: deliveryType === 'endereco' ? deliveryAddress : null,
        data: new Date().toISOString(), // Data do pedido
        precoTotal: totalPrice, // Preço total do pedido
        items: orderItems
      };
  
      const response = await api.post('/order', orderData);
  
      alert('Pedido realizado com sucesso!');
      setFoods([]);
      navigation.navigate('Pedidos');
    } catch (error) {
      console.error('Erro ao enviar o pedido:', error);
      alert('Ocorreu um erro ao realizar o pedido. Por favor, tente novamente.');
    }
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
      {tableNumber ? (
        <TouchableOpacity style={styles.botaoMesaSair} onPress={clearTable}>
          <Text style={styles.textoMesaSair}>Mesa {tableNumber}</Text>
          <Icon name="exit" size={20} style={styles.iconeMesaSair} />
        </TouchableOpacity>
      ) : (
        addressSubmitted ? (
          <TouchableOpacity onPress={editAddress} style={styles.addressSubmittedContainer}>
            <Text style={styles.addressSubmittedText}>{deliveryAddress}</Text>
            <Icon name="create-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
        ) : (
          <>
            <Picker
              selectedValue={deliveryOption}
              onValueChange={(itemValue) => {
                setDeliveryOption(itemValue);
                setDeliveryType(itemValue);
                if (itemValue !== 'endereco') {
                  setAddressSubmitted(false);
                  setDeliveryAddress('');
                }
              }}
              style={styles.picker}>
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
                <TouchableOpacity onPress={submitAddress} style={styles.sendButton}>
                  <Text style={styles.sendButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )
      )}
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
    </SafeAreaView>
  );
};

export default Carrinho;

