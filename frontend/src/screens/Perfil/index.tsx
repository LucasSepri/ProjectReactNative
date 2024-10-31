import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../styles/COLORS';
import styles from './style';
import axios from 'axios';

type AddressProps = {
    zip: string;
    referencePoint?: string; // Campo opcional
    complement?: string; // Campo opcional
    id: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
};

const PerfilEnderecoScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { user, signOut, isAuthenticated } = useContext(AuthContext);
    const [addresses, setAddresses] = useState<AddressProps[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAddresses = async () => {
        try {
            const response = await api.get('/addresses', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setAddresses(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erro ao buscar endereços:', error.response?.data || error.message);
            } else {
                console.error('Erro inesperado:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchAddresses();
        } else {
            navigation.navigate('Home');
        }
    }, [isAuthenticated, navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchAddresses);
        return unsubscribe;
    }, [navigation]);

    const handleRemoveAddress = async (id: string) => {
        Alert.alert('Confirmar Remoção', 'Tem certeza que deseja remover este endereço?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Remover',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await api.delete(`/addresses/${id}`, {
                            headers: { Authorization: `Bearer ${user.token}` },
                        });
                        setAddresses(prevAddresses => prevAddresses.filter(address => address.id !== id));
                    } catch (error) {
                        console.error('Erro ao remover endereço:', error.response?.data || error.message);
                    }
                },
            },
        ]);
    };

    const handleOpenMap = (item: AddressProps) => {
        navigation.navigate('MapScreen', {
            address: `${item.street}, ${item.number}`,
            latitude: item.latitude,
            longitude: item.longitude,
            complement: item.complement,
            referencePoint: item.referencePoint,
            zip: item.zip,
            street: item.street,
            number: item.number,
            neighborhood: item.neighborhood,
            city: item.city,
            state: item.state,
            isVisualize: true,
        });
    };

    const handleDeleteAccount = async () => {
        try {
            await api.delete(`/users/${user.id}`, { data: { userId: user.id } });
            signOut();
            navigation.navigate('Home');
        } catch (error) {
            console.error('Erro ao excluir conta:', error);
        }
    };

    const handleDeleteUser = () => {
        Alert.alert(
            "Confirmar exclusão",
            "Você tem certeza que quer excluir sua conta?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Sim", onPress: handleDeleteAccount },
            ]
        );
    };

    const renderAddressItem = ({ item }: { item: AddressProps }) => (
        <View style={styles.addressItemContainer}>
            <TouchableOpacity style={styles.addressContainer} onPress={() => handleOpenMap(item)}>
                <MaterialIcons name="location-on" size={24} color={COLORS.primary} />
                <View style={styles.addressInfo}>
                    <Text style={styles.addressText}>{item.street}, {item.number}</Text>
                    <Text style={styles.addressSubtext}>{item.neighborhood}, {item.city} - {item.state}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveAddress(item.id)}>
                <MaterialIcons name="delete" size={24} color={COLORS.red} />
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.screenContainer}>
            <View style={styles.profileSection}>
                <View style={styles.headerSection}>
                    <Image source={{ uri: `${api.defaults.baseURL}${user.profileImage}` }} style={styles.profileImage} />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userPhone}>{user.phone}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                    </View>
                </View>

                <View style={styles.actionSection}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => navigation.navigate('EditarPerfil')}>
                            <Ionicons name="pencil" size={24} color={COLORS.white} />
                            <Text style={styles.buttonText}>Editar Perfil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteUser}>
                            <Ionicons name="trash" size={24} color={COLORS.white} />
                            <Text style={styles.buttonText}>Excluir Conta</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                        <Ionicons name="log-out" size={24} color={COLORS.white} />
                        <Text style={styles.buttonText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.divider}>
                <View style={styles.addressHeader}>
                    <Text style={styles.addressHeaderText}>ENDEREÇOS</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Endereco')}>
                        <Text style={styles.addButtonText}>Adicionar Endereço</Text>
                    </TouchableOpacity>
                </View>

                {addresses.length === 0 ? (
                    <View style={styles.emptyAddressContainer}>
                        <Text style={styles.emptyAddressTitle}>Nenhum endereço cadastrado.</Text>
                        <Text style={styles.emptyAddressText}>Toque no botão acima para adicionar um endereço.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={addresses}
                        keyExtractor={(item) => item.id}
                        renderItem={renderAddressItem}
                        contentContainerStyle={styles.addressListContainer}
                    />
                )}
            </View>
        </View>
    );
};

export default PerfilEnderecoScreen;
