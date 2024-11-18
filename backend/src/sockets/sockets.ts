import { Server } from 'socket.io';
import { setupChatSocket } from './socketChat';

let connectedSockets: string[] = [];

export const setupSocket = (io: Server) => {
    io.on('connection', (socket) => {
        console.log(`Cliente conectado: ${socket.id}`);

        // Armazenar socket conectado
        connectedSockets.push(socket.id);

        // Emitir a lista de sockets online para todos os clientes
        io.emit('updateSocketsList', connectedSockets);

        socket.on('disconnect', (reason) => {
            console.log(`Cliente desconectado: ${socket.id}. Motivo: ${reason}`);
            connectedSockets = connectedSockets.filter(id => id !== socket.id); // Remover da lista

            // Emitir a lista atualizada para todos os clientes
            io.emit('updateSocketsList', connectedSockets);
        });

        // Emitir evento de reconexão bem-sucedida
        socket.on('reconnect', (attemptNumber) => {
            console.log(`Cliente reconectado: ${socket.id} após ${attemptNumber} tentativas`);
        });

        socket.on('error', (error) => {
            console.error(`Erro no WebSocket: ${error.message}`);
        });

        socket.on('AtualizarLoja', () => {
            io.emit('lojaAtualizada', { success: true });
        });
    });
};

