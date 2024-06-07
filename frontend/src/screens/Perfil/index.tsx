import React, { useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/app.routes';
import { api } from "../../services/api";
import { styles } from "./style";
import { Ionicons } from '@expo/vector-icons';

export default function Perfil() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const { user, signOut, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigation.navigate('Home');
        }
    }, [isAuthenticated, navigation]);

    async function handleDeleteAccount() {
        try {
            await api.delete('/me/excluir', {
                data: {
                    userId: user.id
                }
            });
            signOut(); // Limpar os dados de autenticação do usuário
            navigation.navigate('Home'); // Navegar para a tela de login ou para a página inicial
        } catch (error) {
            console.error('Erro ao excluir conta:', error);
        }
    }

    const handleDeleteUser = () => {
        Alert.alert(
            "Confirmar exclusão",
            "Você tem certeza que quer excluir sua conta?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { text: "Sim", onPress: () => handleDeleteAccount() }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: `${api.defaults.baseURL}/files/${user.profileImage}` }}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => navigation.navigate('EditarPerfil')}
                >
                    <Ionicons name="pencil" size={24} color="white" />
                    <Text style={[styles.buttonText, styles.editText]}>Editar Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={handleDeleteUser}>
                    <Ionicons name="trash" size={24} color="white" />
                    <Text style={[styles.buttonText, styles.dangerText]}>Excluir Conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={signOut} >
                    <Ionicons name="log-out" size={24} color="white" />
                    <Text style={[styles.buttonText, styles.logoutText]}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
