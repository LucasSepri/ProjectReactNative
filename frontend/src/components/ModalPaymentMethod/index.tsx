import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { api } from '../../services/api'; // Para fazer a chamada de API

export default function SelectPaymentMethod({ orderId, onSelectPaymentMethod }) {
  const [modalVisible, setModalVisible] = useState(false); // Controle do modal
  const [paymentMethods, setPaymentMethods] = useState([]); // Armazenar os métodos de pagamento
  const [loading, setLoading] = useState(false); // Estado de loading

  // Buscar os métodos de pagamento quando o componente for montado
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setLoading(true);
      try {
        const response = await api.get('/paymentMethods'); // URL para pegar os métodos de pagamento
        setPaymentMethods(response.data); // Definir os métodos de pagamento recebidos
      } catch (error) {
        console.error('Erro ao buscar métodos de pagamento', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  // Fechar o modal
  const closeModal = () => setModalVisible(false);

  // Função para selecionar um método de pagamento
  const handleSelectPaymentMethod = (paymentMethod) => {
    onSelectPaymentMethod(paymentMethod); // Passa a seleção para o componente pai
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Button title="Selecionar Método de Pagamento" onPress={() => setModalVisible(true)} />

      {/* Modal para exibir os métodos de pagamento */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha o Método de Pagamento</Text>

            {/* Lista de métodos de pagamento */}
            {loading ? (
              <Text>Carregando...</Text>
            ) : (
              <FlatList
                data={paymentMethods}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.paymentMethodItem}
                    onPress={() => handleSelectPaymentMethod(item)}
                  >
                    <Text style={styles.paymentMethodText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            <Button title="Fechar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Overlay transparente para o fundo
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  paymentMethodItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 16,
  },
});
