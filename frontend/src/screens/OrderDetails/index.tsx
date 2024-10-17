import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { api } from '../../services/api';
import styles from './style';

const OrderDetailsScreen = ({ route, navigation }) => {
    const { orderId } = route.params;
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadOrderDetails = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/orders/${orderId}`);
            setOrderDetails(response.data);
        } catch (error) {
            console.error('Erro ao carregar os detalhes do pedido:', error.message);
            Alert.alert('Erro', 'Não foi possível carregar os detalhes do pedido.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrderDetails();
    }, []);

    if (loading) {
        return <ActivityIndicator size={50} color="#0000ff" />;
    }

    if (!orderDetails) {
        return <Text style={styles.errorText}>Nenhum detalhe do pedido encontrado.</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Detalhes da Ordem</Text>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações da Ordem</Text>
                <Text style={styles.orderText}><Text style={styles.label}>Ordem ID:</Text> {orderDetails.id}</Text>
                <Text style={styles.orderText}><Text style={styles.label}>Status:</Text> {orderDetails.status}</Text>
                <Text style={styles.orderText}><Text style={styles.label}>Preço Total:</Text> R$ {orderDetails.totalPrice.toFixed(2)}</Text>
                <Text style={styles.orderText}><Text style={styles.label}>Data:</Text> {new Date(orderDetails.created_at).toLocaleString()}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Itens do Pedido</Text>
                {orderDetails.items.map((item) => (
                    <View key={item.id} style={styles.itemContainer}>
                        <Text style={styles.itemText}><Text style={styles.label}>Produto:</Text> {item.product_name}</Text>
                        <Text style={styles.itemText}><Text style={styles.label}>Quantidade:</Text> {item.amount}</Text>
                        <Text style={styles.itemText}><Text style={styles.label}>Preço Unitário:</Text> R$ {item.product_price.toFixed(2)}</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default OrderDetailsScreen;
