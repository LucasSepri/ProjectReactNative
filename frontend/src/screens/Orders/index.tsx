import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './style'; // Importando seu estilo
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { COLORS } from '../../styles/COLORS';

const OrdemScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]); // Para armazenar todas as ordens
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    if (JSON.stringify(user.name) === '""') {
      setOrders([]);
      setAllOrders([]);
      setStartDate(new Date());
      setEndDate(new Date());
      return setLoading(false);
    } else {
      try {
        const response = await api.get('/orders/'); // Supondo que você tenha uma rota para obter as ordens
        setOrders(response.data);
        setAllOrders(response.data); // Armazena todas as ordens
      } catch (error) {
        console.error('Erro ao carregar as ordens:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadOrders);
    return unsubscribe;
  }, [navigation, user]);

  const handleCancelOrder = async (orderId) => {
    try {
      await api.delete(`/orders/${orderId}/cancel/`);
      Alert.alert('Sucesso', 'Ordem cancelada com sucesso.');
      loadOrders();
    } catch (error) {
      console.error('Erro ao cancelar a ordem:', error);
      Alert.alert('Erro', 'Não foi possível cancelar a ordem.');
    }
  };

  const renderOrderItem = ({ item }) => {
    const orderDate = new Date(item.created_at);

    return (
      <TouchableOpacity style={styles.orderCard} onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}>
        <Text style={styles.orderText}>Ordem ID: {item.id}</Text>
        <Text style={styles.orderText}>Status: {item.status}</Text>
        <Text style={styles.orderText}>Preço Total: R$ {item.totalPrice.toFixed(2)}</Text>
        <Text style={styles.orderText}>Data: {orderDate.toLocaleDateString('pt-BR')} {orderDate.toLocaleTimeString()}</Text>

        {item.status === 'Criado' && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancelOrder(item.id)}
          >
            <Text style={styles.cancelButtonText}>Cancelar Ordem</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };


  const filterOrdersByDate = () => {
    const filteredOrders = allOrders.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate >= startDate && orderDate <= endDate;
    });
    setOrders(filteredOrders);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Aqui você verá suas Ordens</Text>

      {/* Filtro de datas */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filtrar por Data:</Text>
        <View style={styles.datePickerContainer}>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartPicker(true)}>
            <Text style={styles.dateButtonText}>Data de Início: {startDate.toLocaleDateString('pt-BR')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndPicker(true)}>
            <Text style={styles.dateButtonText}>Data de Fim: {endDate.toLocaleDateString('pt-BR')}</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.filterButton} onPress={filterOrdersByDate}>
          <Text style={styles.filterButtonText}>Filtrar Ordens</Text>
        </TouchableOpacity>
      </View>

      {/* DatePickers */}
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      {/* Lista de ordens */}
      {loading ? (
        <ActivityIndicator size={50} color={COLORS.secondary} />
      ) : (
        <>
          {orders.length === 0 ? (
            <Text style={styles.noOrdersText}>Você não tem ordens no momento.</Text>
          ) : (
            <FlatList
              data={orders}
              renderItem={renderOrderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </>
      )}
    </View>
  );
};

export default OrdemScreen;
