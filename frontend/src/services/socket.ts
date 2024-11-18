import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const socket = io("http://192.168.3.98:3333", {
    autoConnect: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export async function initializeSocket() { // Adicionado export aqui
    try {
        const userInfo = await AsyncStorage.getItem('@token');
        const { token, id: userId } = JSON.parse(userInfo || '{}');

        if (!token || !userId) {
            console.log('Token ou User ID não encontrado');
            return;
        }

        socket.auth = { token, userId };
        socket.connect();

        socket.on('connect', () => {
            console.log('WebSocket conectado:', socket.id);
        });

        socket.on('disconnect', (reason) => {
            console.log('WebSocket desconectado:', reason);

            if (reason === "io server disconnect") {
                socket.connect();
            }
        });

        socket.on('reconnect_attempt', (attempt) => {
            console.log(`Tentando reconectar (${attempt})...`);
        });

        socket.on('reconnect_failed', () => {
            console.log('Falha ao reconectar ao WebSocket.');
        });

        socket.on('error', (error) => {
            console.error('Erro no WebSocket:', error);
        });
    } catch (error) {
        console.error('Erro ao inicializar o socket:', error);
    }
}

export default socket;
