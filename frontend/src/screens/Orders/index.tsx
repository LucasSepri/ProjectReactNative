import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './style'; // Importando seu estilo
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from 'styled-components';

const OrdemScreen = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]); // Para armazenar todas as ordens
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar o refresh
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
        const response = await api.get('/orders/');
        // Ordenando as ordens pela data de criação, da mais recente para a mais antiga
        const sortedOrders = response.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setOrders(sortedOrders);
        setAllOrders(sortedOrders);
      } catch (error) {
        console.error('Erro ao carregar as ordens:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Função para ser chamada tanto no carregamento inicial quanto no refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadOrders);
    return unsubscribe;
  }, [navigation, user]);

  const handleCancelOrder = async (orderId) => {
    setLoading(true);
    try {
      const response = await api.get('/orders/');
      // Ordenando as ordens pela data de criação, da mais recente para a mais antiga
      const sortedOrders = response.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      sortedOrders.map(async (order) => {
        if (order.id === orderId) {
          if (order.status !== 'Criado') {
            alert('Não foi possivel cancelar esta ordem, pois ela já foi processada.');
            setOrders(sortedOrders);
            setAllOrders(sortedOrders);
          } else {
            try {
              await api.delete(`/orders/${orderId}/cancel/`);
              Alert.alert('Sucesso', 'Ordem cancelada com sucesso.');
              loadOrders();
            } catch (error) {
              console.error('Erro ao cancelar a ordem:', error);
              Alert.alert('Erro', 'Não foi possível cancelar a ordem.');
            } finally {
              setLoading(false);
            }
          }
        }
      });
    } catch (error) {
      console.error('Erro ao carregar as ordens:', error);
    }

    setLoading(false);
  };

  const renderOrderItem = ({ item }) => {
    const orderDate = new Date(item.created_at);

    return (
      <TouchableOpacity style={styles(theme).orderCard} onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}>
        <Text style={styles(theme).orderText}>Ordem ID: {item.id}</Text>
        <Text style={styles(theme).orderText}>Status: {item.status}</Text>
        <Text style={styles(theme).orderText}>Preço Total: {Number(item.totalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
        <Text style={styles(theme).orderText}>Data: {orderDate.toLocaleDateString('pt-BR')} {orderDate.toLocaleTimeString()}</Text>

        {item.status === 'Criado' && (
          <TouchableOpacity
            style={styles(theme).cancelButton}
            onPress={() => handleCancelOrder(item.id)}
          >
            <Text style={styles(theme).cancelButtonText}>Cancelar Ordem</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const filterOrdersByDate = () => {
    const filteredOrders = allOrders.filter(order => {
      const orderDate = new Date(order.created_at);

      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);

      return orderDate >= startOfDay && orderDate <= endOfDay;
    });

    // Ordenar novamente após o filtro, para garantir que a ordem das ordens seja da mais recente para a mais antiga
    setOrders(filteredOrders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  };

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).header}>Ordens</Text>

      {/* Filtro de datas */}
      <View style={styles(theme).filterContainer}>
        <Text style={styles(theme).filterTitle}>Filtrar</Text>
        <View style={styles(theme).datePickerContainer}>
          <TouchableOpacity style={styles(theme).dateButton} onPress={() => setShowStartPicker(true)}>
            <Text style={styles(theme).dateButtonText}>Data de Início: {startDate.toLocaleDateString('pt-BR')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles(theme).dateButton} onPress={() => setShowEndPicker(true)}>
            <Text style={styles(theme).dateButtonText}>Data de Fim: {endDate.toLocaleDateString('pt-BR')}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles(theme).filterButton} onPress={filterOrdersByDate}>
          <Text style={styles(theme).filterButtonText}>Filtrar Ordens</Text>
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
        <ActivityIndicator size={50} color={theme.primary} />
      ) : (
        <>
          {orders.length === 0 ? (
            <View style={styles(theme).emptyContainer}>
              <Text style={styles(theme).emptyMessage}>Nenhuma Ordem Encontrada</Text>
              <Text style={styles(theme).emptyInstruction}>Tente novamente mais tarde.</Text>
            </View>
          ) : (
            <FlatList
              data={orders}
              renderItem={renderOrderItem}
              keyExtractor={(item) => item.id.toString()}
              onRefresh={handleRefresh}  // Adiciona o evento de refresh
              refreshing={refreshing}    // Controla o estado de refresh
            />
          )}
        </>
      )}
    </View>
  );
};

export default OrdemScreen;
