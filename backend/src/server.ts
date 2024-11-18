import router from './routes';
import cors from 'cors';
import path from 'path';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { setupSocket } from './sockets/sockets'; // Importa a função para configurar os sockets

const app = express();
const serverHttp = http.createServer(app);

// Configuração do Socket.IO com o servidor HTTP
const io = new Server(serverHttp, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

// Configura o WebSocket
setupSocket(io);

// Configura o middleware para servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(router);

// Inicia o servidor HTTP na porta 3333
serverHttp.listen(3333, () => {
  console.log('Server running on port 3333');
});




