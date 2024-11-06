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
import { useFocusEffect } from '@react-navigation/native';
import DefaultLogoImage from '../../components/Logo';

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
    if (!selectedAddress) {
      Alert.alert('Endereço não selecionado', 'Por favor, selecione um endereço para entrega.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/orders', {
        deliveryType: 'Endereço', // ou 'Mesa', conforme necessário
        deliveryAddress: selectedAddress,
        observation,
        latitude: userAddresses.find(addr => addr.street === selectedAddress.split(',')[0])?.latitude, // obter latitude
        longitude: userAddresses.find(addr => addr.street === selectedAddress.split(',')[0])?.longitude, // obter longitude
      });

      navigation.navigate('Pedidos');
      Alert.alert('Pedido Finalizado', 'Seu pedido foi realizado com sucesso!');
      // Aqui, você pode redirecionar o usuário para outra tela ou limpar o carrinho
      clearTable(); // Se você quiser limpar a mesa após a finalização do pedido
      setCartItems([]); // Limpa os itens do carrinho
    } catch (error) {
      console.error('Erro ao finalizar o pedido:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao finalizar o pedido. Tente novamente.');
    } finally {
      setLoading(false);
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
        {imageError[item.product.id] ? (
          <DefaultLogoImage style={styles.image} />
        ) : (
          <Image
            source={{ uri: `${api.defaults.baseURL}${item.product.banner}` }}
            onError={() => setImageError(prev => ({ ...prev, [item.product.id]: true }))}
            style={styles.image}
          />
        )}

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

  function handleAddAddress() {
    navigation.navigate('Endereco');
  }
  useFocusEffect(
    React.useCallback(() => {
      loadUserAddresses();
    }, [])
  );


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        Carrinho
      </Text>
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
                  <Text
                    style={styles.textAddress}>
                    {selectedAddress || "Selecione seu endereço"}
                  </Text>
                  <Icon name="chevron-down" size={20} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.qrCodeButton} onPress={handleQRCodeScan}>
                  <Icon name="qr-code-outline" size={24} color={COLORS.white} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity onPress={handleAddAddress} style={styles.addAddressButton}>
                  <Icon name="add-circle-outline" size={30} color={COLORS.white} />
                  <Text style={styles.addAddressText}>Adicionar Endereço</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.qrCodeButton} onPress={handleQRCodeScan}>
                  <Icon name="qr-code-outline" size={24} color={COLORS.white} />
                </TouchableOpacity>
              </>
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
        <Text style={styles.textLoading} />
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
          <View style={styles.observationContainer}>
            <TextInput
              placeholder="Observações (opcional)"
              value={observation}
              onChangeText={(text) => setObservation(text)}
              style={styles.observationInput}
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
              maxLength={400}
            />
            <Text style={styles.charCountText}>
              {400 - observation.length} caracteres restantes
            </Text> 
          </View>

          <View style={styles.orderSummary}>
            {!loading ? (
              <TouchableOpacity onPress={handleOrderSubmit} style={styles.orderButton}>
                <Text style={styles.orderTextButton}>Finalizar Pedido</Text>
                <Text style={styles.summaryText}>R$ {totalPrice.toFixed(2)}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.orderButton}>
                <ActivityIndicator size={40} color={COLORS.white} style={styles.flatList} />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

    </SafeAreaView>
  );
};

export default Carrinho;
