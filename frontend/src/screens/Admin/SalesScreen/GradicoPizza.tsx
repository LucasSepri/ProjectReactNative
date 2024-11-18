import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { api } from '../../../services/api'; // Supondo que o api já esteja configurado

const PieChartWithCenteredLabels = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("/admin/orders");
                const sortedOrders = response.data.sort(
                    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );
                setOrders(sortedOrders);
            } catch (error) {
                console.error("Erro ao carregar as ordens:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Contando os meios de pagamento
    const paymentMethods = orders.reduce((acc, order) => {
        const method = order.paymentMethod;
        acc[method] = (acc[method] || 0) + 1;
        return acc;
    }, {});

    // Convertendo os dados para o formato que o gráfico entende
    const chartData = Object.keys(paymentMethods).map((method, index) => ({
        key: index,
        amount: paymentMethods[method],
        method,  // Armazenando o nome do método de pagamento aqui
    }));

    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);

    const pieData = chartData
        .filter(value => value.amount > 0)
        .map((value, index) => ({
            value: value.amount,
            svg: { fill: randomColor() },
            key: `${index}`,
            method: value.method, // Certificando-se de passar o 'method' para os dados do gráfico
        }));

    const Labels = ({ slices }) => {
        return slices.map((slice, index) => {
            const { pieCentroid, data } = slice;
            console.log(`Método de pagamento: ${data.method}`); // Adicionando o console log aqui
            return (
                <Text
                    key={index}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={16} // Ajustei o tamanho da fonte para caber melhor
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {data.method} {/* Acessando o nome do método de pagamento armazenado em 'method' */}
                </Text>
            );
        });
    };

    return (
        <PieChart
            style={{ height: 200 }}
            data={pieData}
            innerRadius={2}
            outerRadius={100}
            labelRadius={80}
        >
            <Labels slices={pieData} /> 
        </PieChart>
    );
};

export default PieChartWithCenteredLabels;
