import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { api } from '../../../services/api';

import styles from './style';

export default function AdminCategorias() {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/category');
            setCategories(response.data);
        } catch (err) {
            setError('Erro ao buscar categorias.');
        }
    };

    const handleAddCategory = async () => {
        if (!name) {
            setError('Nome da categoria não pode estar vazio.');
            return;
        }

        try {
            if (editingCategory) {
                await api.put('/category/update', { id: editingCategory.id, name });
                setCategories(categories.map(cat => cat.id === editingCategory.id ? { ...cat, name } : cat));
                setEditingCategory(null);
            } else {
                const response = await api.post('/category', { name });
                setCategories([...categories, response.data]);
            }

            setName('');
            setError(null);
        } catch (err) {
            setError('Erro ao adicionar ou editar categoria.');
        }
    };

    const handleEditCategory = (category) => {
        setName(category.name);
        setEditingCategory(category);
    };

    const handleDeleteCategory = async (id) => {
        try {
            await api.delete('/category/remove', { data: { id } });
            setCategories(categories.filter(cat => cat.id !== id));
        } catch (err) {
            setError('Erro ao excluir categoria.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Categorias</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome da Categoria"
                value={name}
                onChangeText={setName}
            />
            <Button title={editingCategory ? "Editar" : "Adicionar"} onPress={handleAddCategory} />

            {error && <Text style={styles.error}>{error}</Text>}

            <Text style={styles.title}>Categorias</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.categoryItem}>
                        <Text>{item.name}</Text>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => handleEditCategory(item)}>
                                <Text style={styles.editButton}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteCategory(item.id)}>
                                <Text style={styles.deleteButton}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
