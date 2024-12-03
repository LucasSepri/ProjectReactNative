import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from './style';
import axios from 'axios';
import { DefaultProfileImage } from '../../components/Profile';
import { ThemeContext } from 'styled-components';

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
    const theme = useContext(ThemeContext);
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { user, signOut, isAuthenticated } = useContext(AuthContext);
    const [addresses, setAddresses] = useState<AddressProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

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
            navigation.navigate("Inicio", { screen: 'Home' });
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
                    setLoading(true);
                    try {
                        await api.delete(`/addresses/${id}`, {
                            headers: { Authorization: `Bearer ${user.token}` },
                        });
                        setAddresses(prevAddresses => prevAddresses.filter(address => address.id !== id));
                    } catch (error) {
                        const err = error as any;
                        console.error('Erro ao remover endereço:', err.response?.data || err.message);
                    }
                    setLoading(false);
                },
            },
        ]);
    };

    const handleOpenMap = (item: AddressProps) => {
        navigation.navigate('MapScreen', {
            address: `${item.street}, ${item.number}`,
            latitude: item.latitude,
            longitude: item.longitude,
            complement: item.complement || '',
            referencePoint: item.referencePoint || '',
            zip: item.zip,
            street: item.street,
            number: item.number,
            neighborhood: item.neighborhood,
            city: item.city,
            state: item.state,
            isVisualize: true,
            addForUser: false,
            returnScreen: 'Perfil',
        });
    };

    const handleDeleteAccount = async () => {
        try {
            await api.delete(`/users/${user.id}`, { data: { userId: user.id } });
            signOut();
            //navigation.navigate('Home');
        } catch (error) {
            console.error('Erro ao excluir conta:', error);
        }
    };

    const handleDeleteUser = () => {
        setLoadingDelete(true);
        Alert.alert(
            "Confirmar exclusão",
            "Você tem certeza que quer excluir sua conta?",
            [
                { text: "Cancelar", style: "cancel", onPress: () => setLoadingDelete(false) },
                { text: "Sim", onPress: async () => { await handleDeleteAccount(); setLoadingDelete(false); } },
            ]
        );
    };

    const renderAddressItem = ({ item }: { item: AddressProps }) => (
        <View style={styles(theme).addressItemContainer}>
            <TouchableOpacity style={styles(theme).addressContainer} onPress={() => handleOpenMap(item)}>
                <MaterialIcons name="location-on" size={24} color={theme && theme.primary} />
                <View style={styles(theme).addressInfo}>
                    <Text style={styles(theme).addressText}>{item.street}, {item.number}</Text>
                    <Text style={styles(theme).addressSubtext}>{item.neighborhood}, {item.city} - {item.state}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveAddress(item.id)}>
                <MaterialIcons name="delete" size={24} color={theme && theme.danger} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles(theme).screenContainer}>
            <View style={styles(theme).profileSection}>
                <View style={styles(theme).headerSection}>
                    {user.profileImage && !imageError[user.id] ? (
                        <Image source={{ uri: `${api.defaults.baseURL}${user.profileImage}?t=${new Date().getTime()}` }}
                            onError={() => setImageError(prevState => ({ ...prevState, [user.id]: true }))}
                            style={styles(theme).profileImage} />
                    ) : (
                        <DefaultProfileImage style={styles(theme).profileImage} theme={theme} />
                    )}
                    <View style={styles(theme).userInfo}>
                        <Text style={styles(theme).userName}>{user.name}</Text>
                        <Text style={styles(theme).userPhone}>{user.phone}</Text>
                        <Text style={styles(theme).userEmail}>{user.email}</Text>
                    </View>
                </View>

                <View style={styles(theme).actionSection}>
                    <View style={styles(theme).buttonContainer}>
                        <TouchableOpacity style={[styles(theme).button, styles(theme).editButton]} onPress={() => navigation.navigate('EditarPerfil')}>
                            <Ionicons name="pencil" size={24} color={theme && theme.white} />
                            <Text style={styles(theme).buttonText}>Editar Perfil</Text>
                        </TouchableOpacity>

                        {loadingDelete ? (
                            <View style={[styles(theme).button, styles(theme).deleteButton, {alignItems: 'center', justifyContent: 'center'}]}>
                                <ActivityIndicator size={24} color={theme ? theme.white : {}} />
                            </View>
                        ) : (
                            <TouchableOpacity style={[styles(theme).button, styles(theme).deleteButton]} onPress={handleDeleteUser}>
                                <Ionicons name="trash" size={24} color={theme && theme.white} />
                                <Text style={styles(theme).buttonText}>Excluir Conta</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity style={styles(theme).logoutButton} onPress={signOut}>
                        <Ionicons name="log-out" size={24} color={theme && theme.white} />
                        <Text style={styles(theme).buttonText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles(theme).divider}>
                <View style={styles(theme).addressHeader}>
                    <Text style={styles(theme).addressHeaderText}>ENDEREÇOS</Text>
                    {loading ? null : (
                        <TouchableOpacity style={styles(theme).addButton} onPress={() => navigation.navigate('Endereco', { addForUser: true, returnScreen: 'Perfil' })}>
                            <Text style={styles(theme).addButtonText}>Adicionar Endereço</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {loading ? (
                    <View style={styles(theme).loadingContainer}>
                        <ActivityIndicator size={33} color={theme && theme.primary} />
                    </View>
                ) : addresses.length === 0 ? (
                    <View style={styles(theme).emptyAddressContainer}>
                        <Text style={styles(theme).emptyAddressTitle}>Nenhum endereço cadastrado.</Text>
                        <Text style={styles(theme).emptyAddressText}>Toque no botão acima para adicionar um endereço.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={addresses}
                        keyExtractor={(item) => item.id}
                        renderItem={renderAddressItem}
                        contentContainerStyle={styles(theme).addressListContainer}
                    />
                )}



            </View>
        </View>
    );
};

export default PerfilEnderecoScreen;
