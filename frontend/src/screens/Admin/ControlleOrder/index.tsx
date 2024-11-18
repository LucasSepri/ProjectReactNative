import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    RefreshControl, // Importar o RefreshControl
    TextInput, // Importando TextInput para pesquisa
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker"; // Importando o Picker corretamente
import { api } from "../../../services/api";
import styles from "./style"; // Estilos adaptados para tema dinâmico
import { ThemeContext } from "styled-components";

export default function OrdersList({ navigation }) {
    const theme = useContext(ThemeContext);
    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // Estado para o controle do "pull-to-refresh"
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [statusFilter, setStatusFilter] = useState(""); // Estado para o filtro de status
    const [searchQuery, setSearchQuery] = useState(""); // Estado para armazenar a pesquisa

    const loadOrders = async () => {
        setLoading(true);
        try {
            const response = await api.get("/admin/orders");
            const sortedOrders = response.data.sort(
                (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
            setOrders(sortedOrders);
            setAllOrders(sortedOrders);
        } catch (error) {
            console.error("Erro ao carregar as ordens:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", loadOrders);
        return unsubscribe;
    }, [navigation]);

    const filterOrders = () => {
        let filteredOrders = allOrders;

        // Filtro de data
        filteredOrders = filteredOrders.filter((order) => {
            const orderDate = new Date(order.created_at).setHours(0, 0, 0, 0);
            const start = new Date(startDate).setHours(0, 0, 0, 0);
            const end = new Date(endDate).setHours(23, 59, 59, 999);
            return orderDate >= start && orderDate <= end;
        });

        // Filtro de status
        if (statusFilter) {
            filteredOrders = filteredOrders.filter(
                (order) => order.status === statusFilter
            );
        }

        // Filtro de pesquisa por Pedido ID ou nome do cliente
        if (searchQuery) {
            filteredOrders = filteredOrders.filter((order) => {
                const orderIdMatch = order.id.toString().includes(searchQuery);
                const userNameMatch = order.userName.toLowerCase().includes(searchQuery.toLowerCase());
                return orderIdMatch || userNameMatch;
            });
        }

        setOrders(
            filteredOrders.sort(
                (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )
        );
    };

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

    const DetailsOrder = ({ orderId }) => {
        navigation.navigate("OrderDetails", { orderId });
    }

    const renderOrderItem = ({ item }) => {
        const orderDate = new Date(item.created_at);

        return (
            <TouchableOpacity
                style={styles(theme).orderCard}
                onPress={() => DetailsOrder({ orderId: item.id })}
            >
                <Text style={styles(theme).orderText}>Pedido ID: {item.id}</Text>
                <Text style={styles(theme).orderText}>Cliente: {item.userName}</Text>
                <Text style={styles(theme).orderText}>Status: {item.status}</Text>
                <Text style={styles(theme).orderText}>
                    Total: R$ {Number(item.totalPrice).toFixed(2)}
                </Text>
                <Text style={styles(theme).orderText}>
                    Data: {orderDate.toLocaleDateString("pt-BR")}
                </Text>
                {item.status === "Criado" && (
                    <TouchableOpacity
                        style={styles(theme).cancelButton}
                        onPress={() => handleCancelOrder(item.id)}
                    >
                        <Text style={styles(theme).cancelButtonText}>Cancelar Pedido</Text>
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        );
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadOrders();  // Carregar as ordens novamente
        setRefreshing(false);
    };

    return (
        <View style={styles(theme).container}>


            {/* Filtro de datas */}
            <View style={styles(theme).filterContainer}>
                <Text style={styles(theme).filterTitle}>Filtrar</Text>
                {/* Campo de pesquisa */}

                <View style={styles(theme).searchContainer}>
                    <Ionicons name="search" size={24} color={theme.primary} style={styles(theme).searchIcon} />
                    <TextInput
                        style={styles(theme).searchInput}
                        placeholder="Pesquisar por Pedido ID ou Nome do Cliente"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={filterOrders} // Dispara a pesquisa ao pressionar Enter
                    />
                </View>
                <View style={styles(theme).datePickerContainer}>
                    <TouchableOpacity style={styles(theme).dateButton} onPress={() => setShowStartPicker(true)}>
                        <Text style={styles(theme).dateButtonText}>Data de Início: {startDate.toLocaleDateString('pt-BR')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles(theme).dateButton} onPress={() => setShowEndPicker(true)}>
                        <Text style={styles(theme).dateButtonText}>Data de Fim: {endDate.toLocaleDateString('pt-BR')}</Text>
                    </TouchableOpacity>
                </View>

                {/* Filtro de status */}
                <View style={styles(theme).statusFilterContainer}>
                    <Text style={styles(theme).filterTitleS}>Status da Ordem</Text>
                        <Picker
                            selectedValue={statusFilter}
                            style={styles(theme).picker}
                            onValueChange={(itemValue) => setStatusFilter(itemValue)}
                        >
                            <Picker.Item label="Todos" value="" />
                            <Picker.Item label="Pendente" value="Pendente" />
                            <Picker.Item label="Em Preparação" value="Em Preparação" />
                            <Picker.Item label="Em Trânsito" value="Em Transito" />
                            <Picker.Item label="Entregue" value="Entregue" />
                            <Picker.Item label="Cancelado" value="Cancelado" />
                        </Picker>
                </View>

                <TouchableOpacity style={styles(theme).filterButton} onPress={filterOrders}>
                    <Text style={styles(theme).filterButtonText}>Filtrar Ordens</Text>
                </TouchableOpacity>
            </View>

            {showStartPicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
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
                    onChange={(event, date) => {
                        setShowEndPicker(false);
                        if (date) setEndDate(date);
                    }}
                />
            )}

            {loading ? (
                <ActivityIndicator size="large" color={theme.primary} />
            ) : (
                <FlatList
                    data={orders}
                    renderItem={renderOrderItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                        <Text style={styles(theme).emptyMessage}>
                            Nenhum pedido encontrado.
                        </Text>
                    }
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
        </View>
    );
}
