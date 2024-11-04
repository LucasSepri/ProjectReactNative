import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView
} from 'react-native';
import styles from './style';
import { COLORS } from '../../styles/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useTable } from '../../context/TableContext';
import { set } from 'react-hook-form';

type AddressProps = {
  zip: string;
  referencePoint: string;
  complement: string;
  id: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
};

const Carrinho = ({ navigation }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { tableNumber, clearTable } = useTable();

  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [observation, setObservation] = useState('');
  const [userAddresses, setUserAddresses] = useState<AddressProps[]>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addressVisible, setAddressVisible] = useState(true);
  const [imageError, setImageError] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    loadCartItems();
    loadUserAddresses();
    const unsubscribe = navigation.addListener('focus', loadCartItems);
    return unsubscribe;
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    if (!isAuthenticated) {
      setUserAddresses([]);
      setSelectedAddress('');
    }
  }, [isAuthenticated]);


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
      console.error('Erro ao carregar o carrinho:', error);
      setCartItems([]);
      setTotalPrice(0);
    } finally {
      setLoading(false);
    }
  };

  const loadUserAddresses = async () => {
    if (!user || !user.id) return;

    try {
      const response = await api.get('/addresses');
      setUserAddresses(response.data);
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
    }
  };

  const handleOrderSubmit = async () => {
    if (!selectedAddress && addressVisible) {
      Alert.alert('Erro', 'Por favor, selecione um endereço.');
      return;
    }

    const selectedAddressDetails = userAddresses.find(address =>
      `${address.street}, ${address.number}, ${address.neighborhood}, ${address.city}, ${address.state}` === selectedAddress
    );

    const address = `${selectedAddressDetails?.street}, ${selectedAddressDetails?.number}, ${selectedAddressDetails?.neighborhood}, ${selectedAddressDetails?.city}, ${selectedAddressDetails?.state}`;

    const orderData = {
      deliveryType: addressVisible ? 'Endereço' : 'Mesa',
      deliveryAddress: addressVisible ? address : undefined,
      tableNumber: !addressVisible ? tableNumber : undefined,
      observation: observation.trim(),
      latitude: addressVisible ? selectedAddressDetails?.latitude : undefined,
      longitude: addressVisible ? selectedAddressDetails?.longitude : undefined,
    };

    try {
      await api.post('/orders', orderData);
      Alert.alert('Sucesso', 'Pedido criado com sucesso!');
      setObservation('');
      navigation.navigate('Pedidos');
    } catch (error) {
      console.error('Erro ao criar o pedido:', error);
      Alert.alert('Erro', 'Não foi possível criar o pedido. Tente novamente.');
    }
  };

  const handleRemove = async (product_id) => {
    setLoading(true);
    try {
      await api.delete(`/cart/${product_id}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== product_id));
      setLoading(false);
    } catch (error) {
      console.error('Erro ao remover o item do carrinho:', error);
      setLoading(false);
    }
  };

  const updateItemAmount = async (item, amountChange) => {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Erro ao atualizar a quantidade do item:', error);
    }
  };

  const CartCard = ({ item }) => {
    const totalPrice = item.product.price * item.amount;

    return (
      <View style={styles.cartCard}>
        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.product_id)}>
          <Icon name="trash" size={20} color={COLORS.danger} />
        </TouchableOpacity>
        <Image
          source={imageError[item.product.id]
            ? require('../../assets/logo.png')
            : { uri: `${api.defaults.baseURL}${item.product.banner}` }}
          onError={() => setImageError(prev => ({ ...prev, [item.product.id]: true }))}
          style={styles.image} />
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
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyMessage}>Você ainda não tem produtos no Carrinho.</Text>
      <Text style={styles.emptyInstruction}>Adicione produtos para vê-los aqui!</Text>
    </View>
  );

  const handleQRCodeScan = () => {
    navigation.navigate('Qrcode');
  };

  const handleExitTable = () => {
    setAddressVisible(true);
    setSelectedAddress('');
  };

  const handleAddAddress = () => {
    navigation.navigate('AddAddress');
  };

  return (
    <SafeAreaView style={styles.container}>
      {tableNumber ? (
        <TouchableOpacity style={styles.botaoMesaSair} onPress={() => { clearTable(); }}>
          <Text style={styles.textoMesaSair}>Mesa {tableNumber}</Text>
          <Icon name="exit" size={20} style={styles.iconeMesaSair} />
        </TouchableOpacity>
      ) : (
        isAuthenticated && (
          <View style={styles.addressPickerContainer}>
            {userAddresses.length > 0 ? (
              <>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addressPicker}>
                  {selectedAddress && (<Icon name="location" size={20} color={COLORS.primary} />)}
                  <Text style={styles.textAddress}>
                    {selectedAddress || "Selecione seu endereço"}
                  </Text>
                  <Icon name="chevron-down" size={20} color={COLORS.primary} />
                  <Icon name="chevron-down" size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={handleAddAddress} style={styles.addAddressButton}>
                <Icon name="add-circle-outline" size={24} color={COLORS.primary} />
                <Text style={styles.addAddressText}>Adicionar Endereço</Text>
              </TouchableOpacity>
            )}
          </View>
        )
      )}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              {userAddresses.map((address) => (
                <TouchableOpacity
                  key={address.id}
                  style={styles.addressItem}
                  onPress={() => {
                    setSelectedAddress(
                      `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`
                    );
                    setModalVisible(false);
                  }}
                >
                  <Icon name="location" size={20} color={COLORS.primary} />
                  <Text style={styles.textAddress}>{`${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
              <Text style={styles.closeModalText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator size={50} color={COLORS.primary} style={styles.flatList} />
      ) : cartItems.length === 0 ? (
        renderEmptyCart()
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
        <>
          <TextInput
            placeholder="Observações (opcional)"
            value={observation}
            onChangeText={setObservation}
            style={styles.observationInput}
            multiline={true}
            numberOfLines={3}
            textAlignVertical="top"
            maxLength={100}
          />
          <View style={styles.orderSummary}>
            <TouchableOpacity onPress={handleOrderSubmit} style={styles.orderButton}>
              <Text style={styles.orderTextButton}>Finalizar Pedido</Text>
              <Text style={styles.summaryText}>R$ {totalPrice.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Carrinho;
