import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Animated, { SharedValue, useAnimatedProps } from "react-native-reanimated";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { format, isToday, isThisMonth, isThisYear } from "date-fns";


// Simulação de múltiplos pedidos
const orders = [
    {
        id: "10bf485e-c7b4-4a4c-b39a-782ecdbc8853",
        userName: "Irineu ",
        userEmail: "sepriano@gmail.com",
        userPhone: "(13) 9780-06378",
        status: "Entregue",
        totalPrice: 50,
        deliveryType: "Endereço",
        deliveryAddress: "Rua Geraldo Russomano, 369 - Bopiranga, Itanhaém - SP",
        latitude: -24.21545821458705,
        longitude: -46.8772943980435,
        paymentMethod: "Pix",
        created_at: "2024-11-18T13:56:21.508Z",
        updated_at: "2024-11-18T15:07:28.864Z",
        items: [
            {
                product_name: "Teste",
                product_price: 50
            }
        ]
    },
    {
        id: "27e1d7b5-f11c-4bb4-80fa-efb292c02c82",
        userName: "Alice Silva",
        userEmail: "alice.silva@gmail.com",
        userPhone: "(11) 98765-4321",
        status: "Pendente",
        totalPrice: 120,
        deliveryType: "Retirada",
        deliveryAddress: "Rua Nova, 123 - Centro, São Paulo - SP",
        latitude: -23.5489,
        longitude: -46.6388,
        paymentMethod: "Cartão de Crédito",
        created_at: "2024-11-19T08:34:17.500Z",
        updated_at: "2024-11-19T10:15:45.001Z",
        items: [
            {
                product_name: "Camiseta Estampada",
                product_price: 60
            },
            {
                product_name: "Calça Jeans",
                product_price: 60
            }
        ]
    },
    {
        id: "c9b5c2ea-8ffb-4fdb-9e7f-c7d988ee3b61",
        userName: "Carlos Souza",
        userEmail: "carlos.souza@gmail.com",
        userPhone: "(21) 99999-8888",
        status: "Cancelado",
        totalPrice: 80,
        deliveryType: "Endereço",
        deliveryAddress: "Avenida Brasil, 987 - Rio de Janeiro - RJ",
        latitude: -22.9068,
        longitude: -43.1729,
        paymentMethod: "Boleto",
        created_at: "2024-11-17T14:22:50.303Z",
        updated_at: "2024-11-17T16:45:32.478Z",
        items: [
            {
                product_name: "Tênis Esportivo",
                product_price: 80
            }
        ]
    }
];

const DATA = orders.map(order => ({
    day: new Date(order.created_at).getTime(),
    price: order.totalPrice
}));

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function Tooltip({ x, y }: { x: SharedValue<number>, y: SharedValue<number> }) {
    return <Circle cx={x} cy={y} r={8} color="black" />;
}

export default function Dashboard() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Todos'); // Estado do filtro de pagamento
    const [selectedDateFilter, setSelectedDateFilter] = useState<string>('Hoje'); // Estado do filtro de data
    const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });
    const font = useFont(require('../../../styles/fonts/Roboto-Regular.ttf'));

    // Filtrando os pedidos por método de pagamento
    const filteredOrders = selectedPaymentMethod !== 'Todos'
        ? orders.filter(order => order.paymentMethod.trim() === selectedPaymentMethod.trim())
        : orders;

    // Filtrando os pedidos por data
    const filterByDate = (order: any) => {
        const orderDate = new Date(order.created_at);
        switch (selectedDateFilter) {
            case 'Hoje':
                return isToday(orderDate);
            case 'Mês':
                return isThisMonth(orderDate);
            case 'Ano':
                return isThisYear(orderDate);
            default:
                return true;
        }
    };

    // Filtrando os dados para o gráfico
    const filteredData = filteredOrders
        .filter(filterByDate)
        .map(order => ({
            day: new Date(order.created_at).getTime(),
            price: order.totalPrice
        }));

    const animatedText = useAnimatedProps(() => {
        return {
            text: `R$ ${state.y.price.value.value.toFixed(2)}`,
            defaultValue: ""
        };
    });

    const animatedDateText = useAnimatedProps(() => {
        const date = new Date(state.x.value.value);
        return {
            text: `${date.toLocaleDateString("pt-BR")}`,
            defaultValue: ""
        };
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.chartContainer}>
                <View style={styles.filterContainer}>
                    <Text style={styles.filterLabel}>Filtrar por método de pagamento:</Text>
                    <Picker
                        selectedValue={selectedPaymentMethod}
                        onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Todos" value="Todos" />
                        <Picker.Item label="Pix" value="Pix" />
                        <Picker.Item label="Cartão de Crédito" value="Cartão de Crédito" />
                        <Picker.Item label="Boleto" value="Boleto" />
                    </Picker>

                    <Text style={styles.filterLabel}>Filtrar por data:</Text>
                    <Picker
                        selectedValue={selectedDateFilter}
                        onValueChange={(itemValue) => setSelectedDateFilter(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Hoje" value="Hoje" />
                        <Picker.Item label="Mês" value="Mês" />
                        <Picker.Item label="Ano" value="Ano" />
                    </Picker>
                </View>

                {isActive ? (
                    <View style={styles.tooltipContainer}>
                        <AnimatedTextInput
                            editable={false}
                            underlineColorAndroid={'transparent'}
                            style={styles.valueText}
                            animatedProps={animatedText}
                        />
                        <AnimatedTextInput
                            editable={false}
                            underlineColorAndroid={'transparent'}
                            animatedProps={animatedDateText}
                            style={styles.dateText}
                        />
                    </View>
                ) : (
                    <View style={styles.tooltipContainer}>
                        <Text style={styles.valueText}>
                            R$ {filteredData[filteredData.length - 1]?.price?.toFixed(2) || "0.00"}
                        </Text>
                        <Text style={styles.dateText}>Selecione um ponto no gráfico</Text>
                    </View>
                )}

                <View style={styles.grafico}>
                    <CartesianChart
                        data={filteredData} xKey="day" yKeys={["price"]}
                        chartPressState={state}
                        axisOptions={{
                            font: font,
                            tickCount: 5,
                            labelOffset: { x: 3, y: 2 },
                            labelPosition: 'inset',
                            formatYLabel: (value) => `${value}`,
                            formatXLabel: (value) => format(value, "dd/MM"),
                        }}
                    >
                        {({ points }) => (
                            <>
                                <Line points={points.price} color="blue" strokeWidth={4} />
                                {isActive && (
                                    <Tooltip x={state.x.position} y={state.y.price.position} />
                                )}
                            </>
                        )}
                    </CartesianChart>
                </View>
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F9',
        padding: 16,
    },
    chartContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        elevation: 4,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        // height: 600,
        height: '100%',
    },
    grafico:{
        flex: 1,
        height: 300,
    },
    filterContainer: {
        marginBottom: 16,
    },
    filterLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    picker: {
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        paddingVertical: 10,
    },
    tooltipContainer: {
        marginBottom: 16,
    },
    valueText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
    },
    dateText: {
        fontSize: 14,
        color: '#A3A3A3',
    },
});