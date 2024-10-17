import express from 'express';
import router from './routes';
import cors from 'cors';
import path from 'path';

const app = express();

// Configura o middleware para servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(router);

app.listen(3333, () => {
  console.log('Server running on port 3333');
});
