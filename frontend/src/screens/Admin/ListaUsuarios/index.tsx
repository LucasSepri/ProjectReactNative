import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { AuthContext } from '../../../context/AuthContext';
import { api } from '../../../services/api';
import { COLORS } from '../../../styles/COLORS';

const ListUsers = () => {
    const { signOut, user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = users.filter(user => {
                const isAdminText = user.isAdmin ? 'admin' : 'usuario';
                const phone = user.phone ? user.phone : '';
                return user.name.toLowerCase().includes(lowercasedQuery) ||
                    user.email.toLowerCase().includes(lowercasedQuery) ||
                    isAdminText.includes(lowercasedQuery) ||
                    phone.includes(lowercasedQuery);
            });
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchQuery, users]);

    const deleteUser = async (userId) => {
        try {
            await api.delete(`/users/${userId}`, {
                data: {
                    userId: userId
                }
            });
            Alert.alert('Usuário excluído com sucesso.');
            setUsers(users.filter(user => user.id !== userId));
            if (userId === user.id) {
                signOut();
            }
        } catch (error) {
            Alert.alert('Erro ao excluir usuário.');
            console.error('Error deleting user:', userId, 'erro:', error);
        }
    };

    const updateUserRole = async (userId, isAdmin) => {
        const endpoint = isAdmin ? `/users/revoke/${userId}` : `/users/promote/${userId}`;
        try {
            await api.put(endpoint, { user_id: user.id, isAdmin: user.isAdmin });
            const updatedUsers = users.map(user => {
                if (user.id === userId) {
                    return { ...user, isAdmin: !isAdmin };
                }
                return user;
            });
            setUsers(updatedUsers);

            if (userId === user.id) {
                signOut();
            }
        } catch (error) {
            Alert.alert(
                "Erro",
                "Não é possível atualizar o cargo do usuário. Tente novamente mais tarde."
            );
        }
    };


    const handleUpdateCargoUser = (userId, isAdmin) => {
        if (userId === user.id) {
            const otherAdmins = users.filter(user => user.isAdmin && user.id !== userId);
            if (otherAdmins.length === 0) {
                Alert.alert(
                    "Erro",
                    "Não é possível revogar as permissões de administração pois não há outros administradores no sistema."
                );
                return;
            } else {
                Alert.alert(
                    "Confirmar atualização",
                    "Você tem certeza que quer revogar o seu cargo? Você será desconectado do aplicativo.",
                    [
                        { text: "Cancelar", style: "cancel" },
                        { text: "SIM", onPress: () => updateUserRole(userId, isAdmin) }
                    ]
                );
            }
        } else {
            Alert.alert(
                "Confirmar atualização",
                "Você tem certeza que quer atualizar o cargo deste usuário?",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "SIM", onPress: () => updateUserRole(userId, isAdmin) }
                ]
            );
        }
    };

    const handleDeleteUser = (userId) => {
        if (userId === user.id) {
            const otherAdmins = users.filter(user => user.isAdmin && user.id !== userId);
            if (otherAdmins.length === 0) {
                Alert.alert(
                    "Erro",
                    "Não é possível excluir o único administrador do sistema. Promova outro usuário a administrador antes de se excluir."
                );
                return;
            } else {
                Alert.alert(
                    "Confirmar exclusão",
                    "Você realmente quer excluir a si mesmo? Você será desconectado do aplicativo.",
                    [
                        { text: "Cancelar", style: "cancel" },
                        { text: "SIM", onPress: () => deleteUser(userId) }
                    ]
                );
            }
        } else {
            Alert.alert(
                "Confirmar exclusão",
                "Você tem certeza que quer excluir este usuário?",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "SIM", onPress: () => deleteUser(userId) }
                ]
            );
        }
    };

    const renderUserRoleButton = (isAdmin, userId) => {
        if (isAdmin) {
            return (
                <TouchableOpacity style={styles.removeAdminButton} onPress={() => handleUpdateCargoUser(userId, true)}>
                    <Icon name="remove-circle" size={20} color={COLORS.white} />
                    <Text style={styles.userRoleButtonText}> Remover Admin</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.addAdminButton} onPress={() => handleUpdateCargoUser(userId, false)}>
                    <Icon name="add-circle" size={20} color={COLORS.white} />
                    <Text style={styles.userRoleButtonText}> Tornar Admin</Text>
                </TouchableOpacity>
            );
        }
    };

    const refreshList = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    useEffect(() => {
        refreshList();
    }, [ navigator]);


    const renderItem = ({ item }) => (
        <View style={styles.userContainer}>
            <View style={styles.userInfoContainer}>
                <Image source={{ uri: `${api.defaults.baseURL}${item.profileImage}` }} style={styles.profileImage} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                    <Text style={styles.telefone}>{item.phone}</Text>
                    <Text>{item.isAdmin ? 'Admin' : 'Usuario'}</Text>
                </View>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteUser(item.id)}>
                    <Icon name="trash" size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>
            <View style={styles.roleButtonContainer}>
                {renderUserRoleButton(item.isAdmin, item.id)}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainerRefresh}>
                <TouchableOpacity onPress={refreshList} style={styles.refreshList}>
                    <Icon name="refresh" size={24} color={COLORS.primary} style={styles.refreshIcon} />
                </TouchableOpacity>

                <View style={styles.searchContainer}>
                    <Icon name="search" size={24} color={COLORS.primary} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquisar usuários..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <FlatList
                data={filteredUsers}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default ListUsers;
