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
} from 'react-native';
import styles from './style';
import { COLORS } from '../../styles/COLORS';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { PrimaryButton } from '../../components/Button';
import { useTable } from '../../context/TableContext';
import { Picker } from '@react-native-picker/picker';

type AddressProps = {
  zip: string;
  referencePoint: string;
  complement: string;
  id: string;
  street: string;
  number: string;
  neighborhood: string; // Bairro
  city: string; // Cidade
  state: string; // Estado
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
  const [addressVisible, setAddressVisible] = useState(true); // Controla a visibilidade do endereço
  const [imageError, setImageError] = useState({});

  useEffect(() => {
    loadCartItems();
    loadUserAddresses();
    if (!user || !user.name) {
      setUserAddresses([]);
    }
    const unsubscribe = navigation.addListener('focus', loadCartItems);
    return unsubscribe;
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadUserAddresses);
    return unsubscribe;
  }, [navigator, user]);

  const loadCartItems = async () => {
    // loadUserAddresses();
    setLoading(true);
    if (!user || !user.name) {
      setCartItems([]);
      setTotalPrice(0);
      setLoading(false);
      return;
    }

    try {
      // alert('loadCartItems');
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

    const orderData = {
      deliveryType: addressVisible ? 'Endereço' : 'Mesa',
      deliveryAddress: addressVisible ? selectedAddress : undefined,
      tableNumber: !addressVisible ? tableNumber : undefined,
      observation: observation.trim(),
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
        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.product_id)}>
          <Icon name="trash" size={20} color={COLORS.red} />
        </TouchableOpacity>
        <Image
          // source={{ uri: `${api.defaults.baseURL}${item.product.banner}` }}
          source={imageError[item.product.id]
            ? require('../../assets/logo.png') // Exibe a imagem padrão se houver erro
            : { uri: `${api.defaults.baseURL}${item.product.banner}` }}
          onError={() => setImageError(prev => ({ ...prev, [item.product.id]: true }))} // Marca o erro para este produto

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
    // setAddressVisible(false);

  };
  const handleExitTable = () => {
    setAddressVisible(true);
    setSelectedAddress('');
  }

  return (
    <SafeAreaView style={styles.container}>
      {tableNumber ? (
        <TouchableOpacity style={styles.botaoMesaSair} onPress={() => { clearTable(); handleExitTable(); }}>
          <Text style={styles.textoMesaSair}>Mesa {tableNumber}</Text>
          <Icon name="exit" size={20} style={styles.iconeMesaSair} />
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.addressPickerContainer}>
            {addressVisible && (
              userAddresses.length > 0 ? (
                <><Picker
                  selectedValue={selectedAddress}
                  onValueChange={(itemValue) => setSelectedAddress(itemValue)}
                  style={styles.addressPicker}
                >
                  <Picker.Item label="Selecione seu endereço" value="" />
                  {userAddresses.map((address) => (
                    <Picker.Item
                      key={address.id}
                      label={`${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`}
                      value={`${address.street}, ${address.number}, ${address.neighborhood}, ${address.city}, ${address.state}`} // Inclui bairro, cidade e estado
                    />

                  ))}
                </Picker><TouchableOpacity style={styles.qrCodeButton} onPress={handleQRCodeScan}>
                    <Icon name="qr-code-outline" size={24} color={COLORS.white} />
                  </TouchableOpacity></>
              ) : !user || !user.name ? (
                <></>
              ) : (
                <View
                  style={styles.enederecoContainer}
                >
                  <TouchableOpacity style={styles.adicionarEndereco} onPress={() => navigation.navigate('Endereco')}>
                    <Text
                      style={styles.adicionarEnderecoText}
                    >Adicionar endereço</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.qrCodeButton} onPress={handleQRCodeScan}>
                    <Icon name="qr-code-outline" size={24} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              )
            )}
          </View>
        </>
      )}

      {loading ? (
        <ActivityIndicator size={50} color={COLORS.secondary} style={styles.flatList} />
      ) : cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>Você ainda não tem produtos no Carrinho.</Text>
          <Text style={styles.emptyInstruction}>Adicione produtos para vê-los aqui!
          </Text>
        </View>
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
            <Text style={styles.summaryText}>Total: R$ {totalPrice.toFixed(2)}</Text>
            <PrimaryButton title="Finalizar Pedido" onPress={handleOrderSubmit} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Carrinho;
