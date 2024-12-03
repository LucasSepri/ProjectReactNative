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
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useTable } from '../../context/TableContext';
import { useFocusEffect } from '@react-navigation/native';
import { DefaultLogoImage } from '../../components/Logo';
import { set } from 'react-hook-form';
import { ThemeContext } from 'styled-components';

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
  const theme = useContext(ThemeContext);
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
  const [isModalVisibleP, setModalVisibleP] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');


  const loadPaymentMethods = async () => {
    try {
      const response = await api.get('/payment-methods');
      setPaymentMethods(response.data);
    } catch (error) {
      // console.error('Erro ao carregar métodos de pagamento:', error);
      return;
    }
  };

  useEffect(() => {
    loadPaymentMethods();
  }, []);


  useEffect(() => {
    loadCartItems();
    loadUserAddresses();
    const unsubscribe = navigation.addListener('focus', loadCartItems, loadUserAddresses);
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
      setUserAddresses([]);
    }
  };



  const handleOrderSubmit = async (selectedPaymentMethod: string) => {
    // alert(selectedPaymentMethod);
    if (!selectedAddress) {
      Alert.alert('Endereço não selecionado', 'Por favor, Adicione um endereço para entrega.', [
        { text: 'OK', onPress: userAddresses.length > 0 ? () => setModalVisible(true) : handleAddAddress },
      ]);
      return;
    }
    if (!selectedPaymentMethod) {
      Alert.alert('Método de pagamento não selecionado', 'Por favor, Selecione um método de pagamento para a entrega.', [
        { text: 'OK', onPress: () => setModalVisible(true) },
      ]);
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
        paymentMethod: selectedPaymentMethod,
      });

      navigation.navigate('Pedidos');
      Alert.alert('Pedido Finalizado', 'Seu pedido foi realizado com sucesso!');
      clearTable();
      setCartItems([]);
    } catch (error) {
      console.error('Erro ao finalizar o pedido:', error.response?.data || error);
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
      <View style={styles(theme).cartCard}>
        <TouchableOpacity style={styles(theme).removeButton} onPress={() => handleRemove(item.product_id)}>
          <Icon name="trash" size={20} color={theme.danger} />
        </TouchableOpacity>
        {imageError[item.product.id] ? (
          <DefaultLogoImage style={styles(theme).image} theme={theme} />
        ) : (
          <Image
            source={{ uri: `${api.defaults.baseURL}${item.product.banner}?t=${new Date().getTime()}` }}
            onError={() => setImageError(prev => ({ ...prev, [item.product.id]: true }))}
            style={styles(theme).image}
          />
        )}

        <View style={styles(theme).cardInfo}>
          <Text style={styles(theme).itemName}>{item.product.name}</Text>
          <Text style={styles(theme).price}>{Number(totalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
        </View>
        <View style={styles(theme).quantityContainer}>
          <TouchableOpacity style={styles(theme).quantityButton} onPress={() => updateItemAmount(item, -1)}>
            <Icon name="remove" size={20} color={theme.white} />
          </TouchableOpacity>
          <Text style={styles(theme).quantity}>{item.amount}</Text>
          <TouchableOpacity style={styles(theme).quantityButton} onPress={() => updateItemAmount(item, 1)}>
            <Icon name="add" size={20} color={theme.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyCart = () => (
    <View style={styles(theme).emptyContainer}>
      <Text style={styles(theme).emptyMessage}>Você ainda não tem produtos no Carrinho.</Text>
      <Text style={styles(theme).emptyInstruction}>Adicione produtos para vê-los aqui!</Text>
    </View>
  );

  const handleQRCodeScan = () => {
    navigation.navigate('Qrcode');
  };

  function handleAddAddress() {
    setModalVisible(false);
    navigation.navigate('Endereco', { addForUser: true, returnScreen: 'Carrinho' });
  }
  useFocusEffect(
    React.useCallback(() => {
      loadUserAddresses();
    }, [])
  );





  return (
    <SafeAreaView style={styles(theme).container}>
      <Text style={styles(theme).header}>
        Carrinho
      </Text>
      {tableNumber ? (
        <TouchableOpacity style={styles(theme).botaoMesaSair} onPress={() => { clearTable(); }}>
          <Text style={styles(theme).textoMesaSair}>Mesa {tableNumber}</Text>
          <Icon name="exit" size={20} style={styles(theme).iconeMesaSair} />
        </TouchableOpacity>
      ) : (
        isAuthenticated && (
          <View style={styles(theme).addressPickerContainer}>
            {userAddresses.length > 0 ? (
              <>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles(theme).addressPicker}>
                  {selectedAddress && (<Icon name="location" size={20} color={theme.primary} />)}
                  <Text
                    style={styles(theme).textAddress}>
                    {selectedAddress || "Selecione seu endereço"}
                  </Text>
                  <Icon name="chevron-down" size={20} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles(theme).qrCodeButton} onPress={handleQRCodeScan}>
                  <Icon name="qr-code-outline" size={24} color={theme.white} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity onPress={handleAddAddress} style={styles(theme).addAddressButton}>
                  <Icon name="add-circle-outline" size={30} color={theme.white} />
                  <Text style={styles(theme).addAddressText}>Adicionar Endereço</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles(theme).qrCodeButton} onPress={handleQRCodeScan}>
                  <Icon name="qr-code-outline" size={24} color={theme.white} />
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
        <View style={styles(theme).modalOverlay}>
          <View style={styles(theme).modalContainer}>
            <ScrollView>
              <TouchableOpacity onPress={handleAddAddress} style={styles(theme).addAddressButton}>
                <Icon name="add-circle-outline" size={30} color={theme.white} />
                <Text style={styles(theme).addAddressText}>Adicionar Endereço</Text>
              </TouchableOpacity>
              {userAddresses.map((address) => (
                <TouchableOpacity
                  key={address.id}
                  style={styles(theme).addressItem}
                  onPress={() => {
                    setSelectedAddress(
                      `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`
                    );
                    setModalVisible(false);
                  }}
                >
                  <Icon name="location" size={20} color={theme.primary} />
                  <Text style={styles(theme).textAddress}>{`${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles(theme).closeModalButton}>
              <Text style={styles(theme).closeModalText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isModalVisibleP}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisibleP(false)}
      >
        <View style={styles(theme).modalOverlay}>
          <View style={styles(theme).modalContainer}>
            {/* Título */}
            <Text style={styles(theme).modalTitle}>Selecione a forma de pagamento</Text>

            {/* Lista de métodos de pagamento */}
            <ScrollView>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles(theme).paymentMethodItem,
                    selectedPaymentMethod === method.name && styles(theme).selectedPaymentMethod,
                  ]}
                  onPress={() => setSelectedPaymentMethod(method.name)}
                >
                  <Text style={styles(theme).paymentMethodText}>{method.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Botão Confirmar */}
            <TouchableOpacity
              onPress={() => {
                handleOrderSubmit(selectedPaymentMethod); // Função chamada com o método selecionado
                setModalVisibleP(false); // Fecha o modal após confirmar
              }}
              style={styles(theme).confirmButton}
              disabled={!selectedPaymentMethod} // Desabilita o botão se nada foi selecionado
            >
              <Text style={styles(theme).confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>

            {/* Botão Fechar */}
            <TouchableOpacity
              onPress={() => setModalVisibleP(false)}
              style={styles(theme).closeModalButton}
            >
              <Text style={styles(theme).closeModalText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {loading ? (
        <Text style={styles(theme).textLoading} />
      ) : cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles(theme).flatList}
          data={cartItems}
          renderItem={({ item }) => <CartCard item={item} />}
          ListEmptyComponent={renderEmptyCart}
        />
      )}

      {cartItems.length > 0 && (
        <>
          <View style={styles(theme).observationContainer}>
            <TextInput
              placeholder="Observações (opcional)"
              value={observation}
              onChangeText={(text) => setObservation(text)}
              style={styles(theme).observationInput}
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
              maxLength={400}
            />
            <Text style={styles(theme).charCountText}>
              {400 - observation.length} caracteres restantes
            </Text>
          </View>

          <View style={styles(theme).orderSummary}>
            {!loading ? (
              <TouchableOpacity onPress={
                // handleOrderSubmit
                () => setModalVisibleP(true)
              } style={styles(theme).orderButton}>
                <Text style={styles(theme).orderTextButton}>Finalizar Pedido</Text>
                <Text style={styles(theme).summaryText}>{Number(totalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles(theme).orderButton}>
                <ActivityIndicator size={40} color={theme.white} style={styles(theme).flatList} />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

    </SafeAreaView>
  );
};

export default Carrinho;
