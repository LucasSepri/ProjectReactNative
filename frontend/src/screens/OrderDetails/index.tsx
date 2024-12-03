import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthContext'; // Assumindo que você tem um contexto de autenticação
import styles from './style';
import { ThemeContext } from 'styled-components';

const OrderDetailsScreen = ({ route, navigation }) => {
    const theme = useContext(ThemeContext);
    const { orderId } = route.params;
    const { user } = useContext(AuthContext); // Supondo que o contexto de autenticação armazene o usuário
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newStatus, setNewStatus] = useState(null);

    const loadOrderDetails = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/orders/${orderId}`);
            setOrderDetails(response.data);
            setNewStatus(response.data.status); // Define o status atual
        } catch (error) {
            console.error('Erro ao carregar os detalhes do pedido:', error.message);
            Alert.alert('Erro', 'Não foi possível carregar os detalhes do pedido.');
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async () => {
        try {
            await api.put(`/orders/${orderId}/status`, { newStatus });
            Alert.alert('Sucesso', 'Status da ordem atualizado com sucesso.');
            loadOrderDetails(); // Atualiza os detalhes da ordem após a alteração
        } catch (error) {
            console.error('Erro ao atualizar o status da ordem:', error.message);
            Alert.alert('Erro', 'Não foi possível atualizar o status da ordem.');
        }
    };

    useEffect(() => {
        loadOrderDetails();
    }, []);

    if (loading) {
        return <ActivityIndicator size={50} color={theme.secondary} />;
    }

    if (!orderDetails) {
        return <Text style={styles(theme).errorText}>Nenhum detalhe do pedido encontrado.</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles(theme).container}>
            <Text style={styles(theme).header}>Detalhes da Ordem</Text>
            <View style={styles(theme).section}>
                <Text style={styles(theme).sectionTitle}>Informações da Ordem</Text>
                <Text style={styles(theme).orderText}><Text style={styles(theme).label}>Ordem ID:</Text> {orderDetails.id}</Text>
                <Text style={styles(theme).orderText}><Text style={styles(theme).label}>Status:</Text> {orderDetails.status}</Text>
                <Text style={styles(theme).orderText}><Text style={styles(theme).label}>Preço Total:</Text> {Number(orderDetails.totalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                <Text style={styles(theme).orderText}><Text style={styles(theme).label}>Data:</Text> {new Date(orderDetails.created_at).toLocaleDateString('pt-BR')}</Text>
                <Text style={styles(theme).orderText}><Text style={styles(theme).label}>Tipo de Entrega:</Text> {orderDetails.deliveryType}</Text>
                {orderDetails.deliveryType === 'Endereço' && <Text style={styles(theme).orderText}><Text style={styles(theme).label}>Endereço de Entrega:</Text> {orderDetails.deliveryAddress}</Text>}
                {orderDetails.deliveryType === 'Mesa' && <Text style={styles(theme).orderText}><Text style={styles(theme).label}>Número da Mesa:</Text> {orderDetails.tableNumber}</Text>}
                <Text style={styles(theme).orderText}><Text style={styles(theme).label}>Telefone de Contato:</Text> {orderDetails.userPhone || 'Não fornecido'}</Text>
                <Text style={styles(theme).orderText}><Text style={styles(theme).label}>Forma de Pagamento:</Text> {orderDetails.paymentMethod || 'Não fornecido'}</Text>
            </View>

            {orderDetails.observation && orderDetails.observation.trim() !== '' && (
                <View style={styles(theme).section}>
                    <Text style={styles(theme).sectionTitle}>Observação do pedido</Text>
                    <View style={styles(theme).itemContainer}>
                        <Text style={styles(theme).orderText}>{orderDetails.observation}</Text>
                    </View>
                </View>
            )}

            <View style={styles(theme).section}>
                <Text style={styles(theme).sectionTitle}>Itens do Pedido</Text>
                {orderDetails.items.map((item) => (
                    <View key={item.id} style={styles(theme).itemContainer}>
                        <Text style={styles(theme).itemText}><Text style={styles(theme).label}>Produto:</Text> {item.product_name}</Text>
                        <Text style={styles(theme).itemText}><Text style={styles(theme).label}>Quantidade:</Text> {item.amount}</Text>
                        <Text style={styles(theme).itemText}><Text style={styles(theme).label}>Preço Unitário:</Text> {Number(item.product_price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                    </View>
                ))}
            </View>

            {(user.isAdmin && !orderDetails.isClosed || user.isReceptionist && !orderDetails.isClosed) && (
                <View style={styles(theme).section}>
                    <Text style={styles(theme).sectionTitle}>Alterar Status</Text>
                    <Picker
                        selectedValue={newStatus}
                        onValueChange={(itemValue) => setNewStatus(itemValue)}
                    >
                        <Picker.Item label="Pendente" value="Pendente" />
                        <Picker.Item label="Em Preparação" value="Em Preparação" />
                        <Picker.Item label="Em Transito" value="Em Transito" />
                        <Picker.Item label="Entregue" value="Entregue" />
                    </Picker>
                    <TouchableOpacity style={styles(theme).button} onPress={updateOrderStatus}>
                        <Text style={styles(theme).buttonText}>Alterar Status</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity style={styles(theme).button} onPress={() => navigation.goBack()}>
                <Text style={styles(theme).buttonText}>Voltar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default OrderDetailsScreen;
