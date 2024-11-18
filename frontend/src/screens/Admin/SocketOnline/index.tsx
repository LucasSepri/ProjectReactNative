import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import socket from '../../../services/socket';
import { useFocusEffect } from '@react-navigation/native';

const OnlineSocketsScreen = () => {
    const [sockets, setSockets] = useState<string[]>([]);
    const [isSocketConnected, setIsSocketConnected] = useState(false); // Estado para verificar conexão
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (socket.connected) {
            console.log('Socket conectado:', socket.id);
        } else {
            console.log('Socket não está conectado');
        }
    }, [isSocketConnected]);


    useFocusEffect(
        React.useCallback(() => {
            try {
                if (socket.connected) {
                    setIsSocketConnected(true);
                    socket.on('newSocket', (newSocket) => {
                        setSockets((prevSockets) => [...prevSockets, newSocket]);
                    });
                } else {
                    setIsSocketConnected(false);
                }
            } catch (error) {
                console.error(error);
            }

            return () => {
                socket.off('newSocket');
            };
        }, [])
    );

    useEffect(() => {
        socket.connect();

        socket.on('connect', () => {
            console.log('Conectado ao WebSocket:', socket.id);
        });

        socket.on('disconnect', (reason) => {
            console.log('Desconectado do WebSocket. Motivo:', reason);
        });

        socket.on('updateSocketsList', (data) => {
            console.log('Lista de sockets recebida:', data);
            setSockets(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);


    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.item}>
            <Text style={styles.text}>Socket ID: {item}</Text>
        </View>
    );
    const onRefresh = () => {
        setRefreshing(true);
        try {
            if (socket.connected) {
                setIsSocketConnected(true);
                socket.on('newSocket', (newSocket) => {
                    setSockets((prevSockets) => [...prevSockets, newSocket]);
                });
            } else {
                setIsSocketConnected(false);
            }
        } catch (error) {
            alert('Erro ao conectar ao servidor de sockets, tente novamente.');
        } finally {
            setRefreshing(false);
        }

        return () => {
            socket.off('newSocket');
        };
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sockets Online</Text>
            {isSocketConnected ? (
                sockets.length > 0 ? (
                    <FlatList
                        data={sockets}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                    />
                ) : (
                    <Text style={styles.infoText}>Nenhum socket online no momento.</Text>
                )
            ) : (
                <Text style={styles.errorText}>
                    Não foi possível conectar ao servidor de sockets.
                </Text>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    text: {
        fontSize: 16,
    },
    infoText:{
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default OnlineSocketsScreen;
