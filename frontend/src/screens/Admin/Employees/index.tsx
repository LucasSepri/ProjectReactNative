import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { api } from '../../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome for icons
import { debounce, set } from 'lodash'; // Add lodash for debouncing
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../../routes/admin.routes';
import { DefaultProfileImage } from '../../../components/Profile';
import { useTheme } from 'styled-components';
import styles from './style';

interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    employeeImage?: string;
}
type Props = StackScreenProps<StackParamList, 'EmployeeDetail'>;

const EmployeeListScreen = ({ navigation, route }: Props) => {
    const theme = useTheme() as {
        primary: string;
        secondary: string;
        border: string;
        background: string;
        text: string;
        white: string;
        danger: string;
    };
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);  // New state for refresh
    const [loadingDelete, setLoadingDelete] = useState<{ [key: string]: boolean }>({});
    const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});


    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await api.get('/employees');
            setEmployees(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch employees');
            setLoading(false);
        }
    };

    const handleSearchChange = debounce((text: string) => {
        setSearchQuery(text);
    }, 300); // Debounce the search input for better performance

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEmployeePress = (id: number) => {
        navigation.navigate('EmployeeDetail', { id: id.toString() });
    };

    const handleDeleteEmployee = async (id: number) => {
        setLoadingDelete(prevState => ({ ...prevState, [id]: true }));
        Alert.alert('Delete', 'Are you sure you want to delete this employee?', [
            { text: "Cancelar", style: "cancel", onPress: () => setLoadingDelete(prev => ({ ...prev, [id]: false })) },
            {
                text: 'Sim',
                onPress: () => deleteEmployee(id),
            },
        ]);

    };
    const deleteEmployee = async (id: number) => {
        try {
            await api.delete(`/employees/${id}`);
            setEmployees(employees.filter(employee => employee.id !== id));
        } catch (err) {
            Alert.alert('Erro', 'Falha ao deletar funcionário. Tente novamente.');
        } finally {
            setLoadingDelete(prev => ({ ...prev, [id]: false }));
        }
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchEmployees();
        setRefreshing(false);
    };

    const renderItem = ({ item }: { item: Employee }) => (
        <View style={styles(theme).employeeContainer}>
            <TouchableOpacity onPress={() => handleEmployeePress(item.id)} style={styles(theme).employeeInfoContainer}>
                {item.employeeImage && !imageError[item.id] ? (
                    <Image
                        source={{ uri: `${api.defaults.baseURL}${item.employeeImage}?t=${new Date().getTime()}` }}
                        onError={() => setImageError(prevState => ({ ...prevState, [item.id]: true }))}
                        style={styles(theme).profileImage}
                    />
                ) : (
                    <DefaultProfileImage style={styles(theme).profileImage} theme={theme} />
                )}

                <View style={styles(theme).employeeInfo}>
                    <Text style={styles(theme).name}>{item.name}</Text>
                    <Text style={styles(theme).email}>{item.email}</Text>
                    <Text style={styles(theme).telefone}>{item.phone}</Text>
                </View>

                {loadingDelete[item.id] ? (
                    <View style={styles(theme).deleteButton}>
                        <ActivityIndicator size="small" color={theme && theme.
                            white} />
                    </View>
                ) : (
                    <TouchableOpacity style={styles(theme).deleteButton} onPress={() => handleDeleteEmployee(item.id)}>
                        <Icon name="trash" size={20} color={theme && theme.white} />
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        </View>
    );

    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator size="large" color={theme.primary} />;
        }

        if (error) {
            return (
                <View style={styles(theme).errorContainer}>
                    <TouchableOpacity onPress={() => setLoading(true)}>
                        <Text style={styles(theme).retryButton}>
                            Nenhum funcionário encontrado. Clique para tentar novamente.
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={filteredEmployees}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    onRefresh={onRefresh} // Add the onRefresh prop
                    refreshing={refreshing} // Bind the refreshing state
                />
            );
        }
    };

    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).header}>
                <View style={styles(theme).searchContainer}>
                    <Icon name="search" size={24} color={theme && theme.
                        primary} style={styles(theme).searchIcon} />
                    <TextInput
                        style={styles(theme).searchInput}
                        placeholder="Pesquisar funcionários..."
                        value={searchQuery}
                        onChangeText={handleSearchChange}
                    />
                </View>

                <TouchableOpacity style={styles(theme).addButton} onPress={() => navigation.navigate('EmployeeDetail', { id: '' })}>
                    <Text style={styles(theme).addButtonText}>Adicionar funcionário</Text>
                </TouchableOpacity>
            </View>

            {renderContent()}
        </View>
    );
};



export default EmployeeListScreen;
