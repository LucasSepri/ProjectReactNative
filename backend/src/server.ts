import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { Client } from 'basic-ftp';
import path from 'path';

import router from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

if (process.env.FTP === 'true') {
    // Endpoint para servir arquivos estáticos do FTP
    app.get('/files/:filename', async (req: Request, res: Response) => {
        const filename = req.params.filename;
        const client = new Client();

        try {
            await client.access({
                host: process.env.FTP_HOST,
                user: process.env.FTP_USER,
                password: process.env.FTP_PASS,
                secure: true,
                secureOptions: { rejectUnauthorized: false }
            });

            // Caminho do arquivo no servidor FTP
            const filePath = `/${filename}`;

            // Faz o download do arquivo do FTP e envia para o cliente
            await client.downloadTo(res, filePath);
        } catch (error) {
            console.error("FTP Error: ", error);
            res.status(500).send("Error downloading file");
        } finally {
            client.close();
        }
    });
    console.log('FTP Ativo');
} else {
    //se for local
    app.use(
        '/files',
        express.static(path.resolve(__dirname, '..', 'tmp'))
    );
}

// Middleware para lidar com erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

app.listen(3333, () => console.log('Server decolando 🚀'));
