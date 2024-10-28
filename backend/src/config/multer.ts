import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

// Caminho absoluto da pasta onde os arquivos serão armazenados
const uploadsFolder = path.resolve(__dirname, '..', '..', 'uploads');

// Função para garantir que a pasta de uploads existe
const ensureUploadsFolderExists = () => {
  if (!fs.existsSync(uploadsFolder)) {
    fs.mkdirSync(uploadsFolder, { recursive: true });
    console.log(`Pasta ${uploadsFolder} criada com sucesso.`);
  }
};

// Chama a função para garantir a criação da pasta antes de qualquer operação do multer
ensureUploadsFolderExists();

// Configuração do armazenamento do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsFolder); // Define a pasta onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    const fileHash = crypto.randomBytes(16).toString('hex'); // Gera um hash único para o arquivo
    const ext = path.extname(file.originalname); // Obtém a extensão do arquivo original
    const filename = `${fileHash}${ext}`; // Define o novo nome do arquivo
    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
