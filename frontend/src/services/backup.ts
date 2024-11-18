import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const socket = io("http://192.168.3.98:3333", {
    autoConnect: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
});

async function initializeSocket() {
    try {
        const userInfo = await AsyncStorage.getItem('@token');
        const { token, id: userId, isAdmin } = JSON.parse(userInfo || '{}');

        if (!token || !userId) {
            console.log('Token ou User ID não encontrado');
            return;
        }

        // console.log('Token:', token);
        // console.log('User ID:', userId);
        console.log('é admin?', isAdmin);
        // console.log(JSON.parse(userInfo || '{}'));

        // Adicionando userId na autenticação
        socket.auth = { token, userId }; // Passando token e userId no auth
        socket.connect(); // Agora conecta após garantir que userId e token estão presentes
        socket.on('connect', () => {
            console.log('Socket conectado com sucesso');
        });
    } catch (error) {
        console.log('Erro ao recuperar informações do usuário:', error);
    }
}

initializeSocket();

export default socket;
