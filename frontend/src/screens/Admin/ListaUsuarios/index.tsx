import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { api } from '../../../services/api';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../../context/AuthContext';

const ListUsers = () => {
    const { signOut, user, } = useContext(AuthContext);
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
                return user.name.toLowerCase().includes(lowercasedQuery) ||
                    user.email.toLowerCase().includes(lowercasedQuery) ||
                    isAdminText.includes(lowercasedQuery);
            });
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchQuery, users]);

    const deleteUser = async (userId) => {
        try {
            await api.delete('/me/excluir', {
                data: { userId }
            });
            alert('Usuário excluído com sucesso.');
            setUsers(users.filter(user => user.id !== userId));
            if (userId === user.id) {
                signOut();
            }
        } catch (error) {
            alert('Erro ao excluir usuário.');
            console.error('Error deleting user:', userId, 'erro:', error);
        }
    };

    const updateUserRole = async (userId, isAdmin) => {
        try {
            await api.put('/users/cargo', { userId: userId, isAdmin: !isAdmin });
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
            console.error('Error updating user role:', error);
        }
    };

    const handleUpdateCargoUser = (userId, isAdmin) => {
        // Verifica se o usuário atual é admin

        if (userId === user.id) {
            // Verifica se há outros administradores no banco de usuários
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
                        {
                            text: "Cancelar",
                            style: "cancel"
                        },
                        { text: "SIM", onPress: () => updateUserRole(userId, isAdmin) }
                    ]
                );
            }
        } else {
            Alert.alert(
                "Confirmar atualização",
                "Você tem certeza que quer atualizar o cargo deste usuário?",
                [
                    {
                        text: "Cancelar",
                        style: "cancel"
                    },
                    { text: "SIM", onPress: () => updateUserRole(userId, isAdmin) }
                ]
            );
        }
    }

    const handleDeleteUser = (userId) => {
        if (userId === user.id) {
            Alert.alert(
                "Confirmar exclusão",
                "Você realmente quer excluir a si mesmo? Você será desconectado do aplicativo.",
                [
                    {
                        text: "cancel",
                        style: "cancel"
                    },
                    { text: "SIM", onPress: () => deleteUser(userId) }
                ]
            );
        } else {
            Alert.alert(
                "Confirmar exclusão",
                "Você tem certeza que quer excluir este usuário?",
                [
                    {
                        text: "Cancelar",
                        style: "cancel"
                    },
                    { text: "SIM", onPress: () => deleteUser(userId) }
                ]
            );
        }
    };

    const renderUserRoleButton = (isAdmin, userId) => {
        if (isAdmin) {
            return (
                <TouchableOpacity style={styles.removeAdminButton} onPress={() => handleUpdateCargoUser(userId, true)}>
                    <Icon name="remove-circle" size={20} color="#fff" />
                    <Text style={styles.userRoleButtonText}> Remover Admin</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.addAdminButton} onPress={() => handleUpdateCargoUser(userId, false)}>
                    <Icon name="add-circle" size={20} color="#fff" />
                    <Text style={styles.userRoleButtonText}> Tornar Admin</Text>
                </TouchableOpacity>
            );
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.userContainer}>

            <View style={styles.userInfoContainer}>
                <Image source={{ uri: `${api.defaults.baseURL}/files/${item.profileImage}` }} style={styles.profileImage} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                    <Text>{item.isAdmin ? 'Admin' : 'Usuario'}</Text>
                </View>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteUser(item.id)}>
                    <Icon name="trash" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.roleButtonContainer}>
                {renderUserRoleButton(item.isAdmin, item.id)}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar usuários..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredUsers}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    userContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: '#555',
    },
    deleteButton: {
        backgroundColor: '#ff5252',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    addAdminButton: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
    removeAdminButton: {
        backgroundColor: '#ff8c00',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userRoleButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    roleButtonContainer: {
        marginTop: 10,
        flex: 1,
        alignItems: 'center',
    },
});

export default ListUsers;
