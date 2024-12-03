import { io, Socket } from 'socket.io-client';

// Endereço do servidor Socket.IO
const socket: Socket = io('http://46.202.144.33:3333');

// Função para verificar a conexão e reconectar se necessário
function verificarConexao() {
  if (!socket.connected) {
    console.log('Conexão perdida. Tentando reconectar...');
    socket.connect(); // Reconecta ao servidor
  } else {
    console.log('Conexão ativa');
  }
}

// Evento de conexão
socket.on('connect', () => {
  console.log(`Conectado ao servidor com o ID: ${socket.id}`);
});

// Evento de atualização da lista de sockets online
socket.on('updateSocketsList', (connectedSockets: string[]) => {
  console.log('Lista de sockets conectados:', connectedSockets);
});


// Evento de desconexão
socket.on('disconnect', (reason: string) => {
  console.log(`Desconectado do servidor. Motivo: ${reason}`);
  verificarConexao(); // Verifica a conexão ao desconectar
});

// Evento de reconexão
socket.on('reconnect', (attemptNumber: number) => {
  console.log(`Reconectado ao servidor após ${attemptNumber} tentativas`);
});

// Evento de erro
socket.on('error', (error: Error) => {
  console.error(`Erro no WebSocket: ${error.message}`);
});

socket.on('lojaAtualizada', () => {
  //console.log('Loja atualizada');
});

// Enviar mensagem para o servidor para atualizar a loja
function atualizarLoja() {
  socket.emit('AtualizarLoja');
}

// Exemplo de envio de dados para o servidor
atualizarLoja();

export default socket;
