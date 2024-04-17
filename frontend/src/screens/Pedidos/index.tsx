import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PedidoScreen = () => {
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      data: '12/04/2024 14:22',
      descricao: 'Pizza de Pepperoni, 2 Coca-Cola 2 litros, Salada de Alface',
      precoTotal: 45.99,
      status: 'Entregue'
    },
    {
      id: 2,
      data: '11/04/2024 19:15',
      descricao: 'Hambúrguer, Batata Frita, Milkshake de Chocolate',
      precoTotal: 32.50,
      status: 'Em andamento'
    },
    {
      id: 3,
      data: '10/04/2024 12:30',
      descricao: 'Sushi Combo, Tempurá, Missoshiro',
      precoTotal: 55.80,
      status: 'Cancelado'
    },
    {
      id: 4,
      data: '09/04/2024 20:00',
      descricao: 'Frango Assado, Arroz, Feijão, Farofa',
      precoTotal: 38.75,
      status: 'Entregue'
    },
    {
      id: 5,
      data: '08/04/2024 18:45',
      descricao: 'Massa Carbonara, Vinho Tinto, Tiramisù',
      precoTotal: 49.90,
      status: 'Entregue'
    },
    // Adicione mais pedidos conforme necessário
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Entregue':
        return <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />;
      case 'Em andamento':
        return <Ionicons name="time" size={24} color="#FFC107" />;
      case 'Cancelado':
        return <Ionicons name="close-circle" size={24} color="#F44336" />;
      default:
        return null;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.pedidoContainer}>
      <Text style={styles.data}>Pedido em {item.data}</Text>
      <Text style={styles.descricao}>Descrição: {item.descricao}</Text>
      <Text style={styles.precoTotal}>Total: R$ {item.precoTotal.toFixed(2)}</Text>
      <View style={styles.statusContainer}>
        <Text>Status: </Text>
        {getStatusIcon(item.status)}
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>
      <FlatList
        data={pedidos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 80, // Margem de 60 no bottom
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  pedidoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  data: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  descricao: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666666',
  },
  precoTotal: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666666',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333333',
  },
});

export default PedidoScreen;
