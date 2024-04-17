import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../styles/COLORS';
import foods from '../../context/foods';
import { PrimaryButton } from '../../components/Button';

const Carrinho = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(foods.map(food => ({ ...food, quantity: 1 })));

  const CartCard = ({ item }) => {
    const handleIncrement = () => {
      setCartItems(prevItems =>
        prevItems.map(prevItem =>
          prevItem.id === item.id ? { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem
        )
      );
    };

    const handleDecrement = () => {
      setCartItems(prevItems =>
        prevItems.map(prevItem =>
          prevItem.id === item.id && prevItem.quantity > 1
            ? { ...prevItem, quantity: prevItem.quantity - 1 }
            : prevItem
        )
      );
    };

    return (
      <View style={styles.cartCard}>
        <Image source={item.image} style={{ height: 80, width: 80 }} />
        <View style={{ height: 100, marginLeft: 10, paddingVertical: 20, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>{item.ingredients}</Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${Number(item.price) * item.quantity}</Text>
        </View>
        <View style={{ marginRight: 20, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.quantity}</Text>
          <View style={styles.actionBtn}>
            <TouchableOpacity onPress={handleDecrement}>
              <Icon name="remove" size={25} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleIncrement}>
              <Icon name="add" size={25} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  const handlePedidoPress = () => {
    // Navegar para a página de Pedidos
    navigation.navigate('Pedidos');
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Carrinho</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={cartItems}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Preço Total</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${totalPrice.toFixed(2)}</Text>
            </View>
            <View style={{ marginHorizontal: 30, marginBottom: 30 }}>
              <PrimaryButton title="PEDIR AGORA" onPress={handlePedidoPress} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Carrinho;
