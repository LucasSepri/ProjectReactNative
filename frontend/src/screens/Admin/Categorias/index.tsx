import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from '../../../services/api';
import { ThemeContext, useTheme } from 'styled-components';

import styles from './style';
import { useFocusEffect } from '@react-navigation/native';

interface Category {
    id: string;
    name: string;
}

export default function AdminCategorias() {
    const theme = useTheme() as {
        primary: string;
        secondary: string;
        border: string;
        background: string;
        text: string;
        white: string;
        danger: string;
    };
    const [name, setName] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erro ao buscar categorias.');
            setLoading(false);
        }
    };

    // Usando useFocusEffect para recarregar as categorias quando a tela entrar em foco
    useFocusEffect(
        React.useCallback(() => {
            fetchCategories();
        }, [])
    );


    const handleAddCategory = async () => {
        if (!name) {
            setError('Nome da categoria não pode estar vazio.');
            return;
        }

        try {
            if (editingCategory) {
                await api.put(`/categories/${editingCategory.id}`, { name });
                setCategories(categories.map(cat => cat.id === editingCategory.id ? { ...cat, name } : cat));
                setEditingCategory(null);
                alert('Categoria editada com sucesso.');
            } else {
                const response = await api.post('/categories', { name });
                setCategories([...categories, response.data]);
                alert('Categoria adicionada com sucesso.');
            }

            setName('');
            setError(null);
        } catch (err) {
            setError('Erro ao adicionar ou editar categoria.');
        }
    };

    const handleEditCategory = (category: Category) => {
        setName(category.name);
        setEditingCategory(category);
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            await api.delete(`/categories/${id}`);
            setCategories(categories.filter(cat => cat.id !== id));
            alert('Categoria excluída com sucesso.');
            setName('');
            setEditingCategory(null);
        } catch (err) {
            setError('Erro ao excluir categoria.');
        }
    };

    const handleCancelEdit = () => {
        setName('');
        setEditingCategory(null);
    };

    const onRefresh = () => {
        fetchCategories();
    };

    return (
        <View style={styles(theme).container}>
            <Text style={styles(theme).title}>Adicionar Categorias</Text>
            <TextInput
                style={styles(theme).input}
                placeholder="Nome da Categoria"
                value={name}
                onChangeText={setName}
            />

            <View style={styles(theme).buttonContainer}>
                <TouchableOpacity onPress={handleAddCategory} style={[styles(theme).button, styles(theme).submitButton]}>
                    <Text style={styles(theme).buttonText}>
                        {editingCategory ? "Editar" : "Adicionar"}
                    </Text>
                </TouchableOpacity>

                {editingCategory && (
                    <TouchableOpacity onPress={handleCancelEdit} style={[styles(theme).button, styles(theme).cancelButton]}>
                        <Text style={styles(theme).buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles(theme).error}>{error}</Text>}

            <Text style={styles(theme).title}>Categorias</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles(theme).categoryItem}>
                        <Text style={styles(theme).textoCategorias}>{item.name}</Text>
                        <View style={styles(theme).actions}>
                            <TouchableOpacity onPress={() => handleEditCategory(item)}>
                                <Text style={styles(theme).editButton}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles(theme).deleteButton} onPress={() => handleDeleteCategory(item.id)}>
                                <Icon name="trash" size={20} style={{ color: theme && theme.white }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
}
