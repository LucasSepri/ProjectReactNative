import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../services/api';

const PedidoScreen = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await api.get('/orders');
        setPedidos(response.data);
      } catch (error) {
        console.error('Erro ao buscar os pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

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

  const formatDescricao = (items) => {
    if (!items || items.length === 0) return ''; // Verifica se existe items e se não está vazio
    return items.map(item => `(${item.amount}) ${item.product.name} `).join(', ');
  };

  const renderItem = ({ item }) => (
    <View style={styles.pedidoContainer}>
      <Text style={styles.data}>Pedido em {item.created_at}</Text>
      <Text style={styles.descricao}>Descrição: {formatDescricao(item.items)}</Text>
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
