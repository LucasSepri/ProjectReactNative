import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from '../../../services/api';

import styles from './style';
import { COLORS } from '../../../styles/COLORS';

export default function AdminPaymentMethods() {
    const [name, setName] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [editingPaymentMethod, setEditingPaymentMethod] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const fetchPaymentMethods = async () => {
        try {
            const response = await api.get('/payment-methods');
            setPaymentMethods(response.data);
        } catch (err) {
            setError('Erro ao buscar métodos de pagamento.');
        }
    };

    const handleAddPaymentMethod = async () => {
        if (!name) {
            setError('Nome do método de pagamento não pode estar vazio.');
            return;
        }

        try {
            if (editingPaymentMethod) {
                await api.put(`/payment-methods/${editingPaymentMethod.id}`, { name });
                setPaymentMethods(paymentMethods.map(method => method.id === editingPaymentMethod.id ? { ...method, name } : method));
                setEditingPaymentMethod(null);
                alert('Método de pagamento editado com sucesso.');
            } else {
                const response = await api.post('/payment-methods', { name });
                setPaymentMethods([...paymentMethods, response.data]);
                alert('Método de pagamento adicionado com sucesso.');
            }

            setName('');
            setError(null);
        } catch (err) {
            setError('Erro ao adicionar ou editar método de pagamento.');
        }
    };

    const handleEditPaymentMethod = (paymentMethod) => {
        setName(paymentMethod.name);
        setEditingPaymentMethod(paymentMethod);
    };

    const handleDeletePaymentMethod = async (id) => {
        try {
            await api.delete(`/payment-methods/${id}`);
            setPaymentMethods(paymentMethods.filter(method => method.id !== id));
            alert('Método de pagamento excluído com sucesso.');
            setName('');
            setEditingPaymentMethod(null);
        } catch (err) {
            setError('Erro ao excluir método de pagamento.');
        }
    };

    const handleCancelEdit = () => {
        setName('');
        setEditingPaymentMethod(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Método de Pagamento</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome do Método de Pagamento"
                value={name}
                onChangeText={setName}
            />

            <View style={styles.buttonContainer}>
                {/* Botão de Criar/Editar Método de Pagamento */}
                <TouchableOpacity onPress={handleAddPaymentMethod} style={[styles.button, styles.submitButton]}>
                    <Text style={styles.buttonText}>
                        {editingPaymentMethod ? "Editar" : "Adicionar"}
                    </Text>
                </TouchableOpacity>

                {editingPaymentMethod && (
                    <TouchableOpacity onPress={handleCancelEdit} style={[styles.button, styles.cancelButton]}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}

            <Text style={styles.title}>Métodos de Pagamento</Text>
            <FlatList
                data={paymentMethods}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.paymentMethodItem}>
                        <Text style={styles.textoPaymentMethods}>{item.name}</Text>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => handleEditPaymentMethod(item)}>
                                <Text style={styles.editButton}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePaymentMethod(item.id)}>
                                <Icon name="trash" size={20} style={{ color: COLORS.white }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
