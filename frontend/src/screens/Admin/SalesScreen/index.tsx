import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Appbar, Text, Card, Title, Paragraph, DataTable } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

import { api } from '../../../services/api';  // Ensure the correct path for your api.js file
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

// Componente do gráfico de vendas
const SalesChart: React.FC<{ data: number[] }> = ({ data }) => {
  const theme = useTheme() as {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  const screenWidth = Dimensions.get('window').width;

  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        data,
        strokeWidth: 2,
      },
    ],
  };


  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `${theme.primary}`, // Transforma a cor em RGBA
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };
  

  return (
    <LineChart
      data={chartData}
      width={screenWidth-32}
      height={220}
      chartConfig={chartConfig}
      withDots={false}
      withInnerLines={false}
      withOuterLines={false}
      bezier
    />
  );
};

// Componente de Cartões para resumo das vendas
const InfoCard: React.FC<{ title: string; value: string; description: string }> = ({ title, value, description }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph style={styles.cardValue}>{value}</Paragraph>
        <Paragraph>{description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

// Tela principal de Dashboard
const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [salesChart, setSalesChart] = useState<any[]>([]);
  const [soldProducts, setSoldProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      // Fetching sales summary
      const summaryResponse = await api.get('/dashboard/summary');
      setSummary(summaryResponse.data);

      // Fetching sales chart data
      const chartResponse = await api.get('/dashboard/chart');
      setSalesChart(chartResponse.data);

      // Fetching sold products table
      const productsResponse = await api.get('/dashboard/products');
      setSoldProducts(productsResponse.data);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []));

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Resumo das vendas */}
        <View style={styles.summaryContainer}>
          <InfoCard title="Total de Vendas" value={`R$ ${summary.totalSales}`} description="Total de vendas realizadas no mês." />
          <InfoCard title="Produtos Mais Vendidos" value={summary.topProducts} description="Top 2 produtos mais vendidos." />
          <InfoCard title="Clientes Ativos" value={summary.activeClients} description="Número de clientes ativos no mês." />
        </View>

        {/* Gráfico de Vendas */}
        <Text style={styles.sectionTitle}>Vendas Mensais</Text>
        <SalesChart data={salesChart.map((item) => item.total)} />

        {/* Tabela de Produtos Vendidos */}
        <Text style={styles.sectionTitle}>Produtos Vendidos</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Produto</DataTable.Title>
            <DataTable.Title numeric>Quantidade</DataTable.Title>
            <DataTable.Title numeric>Valor</DataTable.Title>
          </DataTable.Header>

          {soldProducts.map((product, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{product.name}</DataTable.Cell>
              <DataTable.Cell numeric>{product.quantity}</DataTable.Cell>
              <DataTable.Cell numeric>{`R$ ${product.total.toFixed(2)}`}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  summaryContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
