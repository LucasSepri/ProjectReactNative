import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Configuração do armazenamento do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    const fileHash = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname);
    const filename = `${fileHash}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
