import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
import { Client } from 'basic-ftp';

//Se for Local

export default {
    upload(folder: string) {
        if (process.env.FTP === 'true') {
            // const storage = multer.memoryStorage(); // Armazena na memória temporariamente

            return {
                storage: {
                    _handleFile(req, file, cb) {
                        const fileHash = crypto.randomBytes(16).toString('hex');
                        const fileName = `${fileHash}-${file.originalname}`;

                        const client = new Client();

                        (async () => {
                            try {
                                await client.access({
                                    host: process.env.FTP_HOST,
                                    user: process.env.FTP_USER,
                                    password: process.env.FTP_PASS,
                                    secure: true,
                                    secureOptions: { rejectUnauthorized: false }
                                });

                                const filePath = `${folder}/${fileName}`;
                                await client.uploadFrom(file.stream, filePath);

                                cb(null, {
                                    path: filePath,
                                    size: file.size
                                });
                            } catch (err) {
                                cb(err);
                            } finally {
                                client.close();
                            }
                        })();
                    },
                    _removeFile(req, file, cb) {
                        const client = new Client();

                        (async () => {
                            try {
                                await client.access({
                                    host: process.env.FTP_HOST,
                                    user: process.env.FTP_USER,
                                    password: process.env.FTP_PASS,
                                    secure: true,
                                    secureOptions: { rejectUnauthorized: false },
                                });

                                await client.remove(file.path);
                                cb(null);
                            } catch (err) {
                                cb(err);
                            } finally {
                                client.close();
                            }
                        })();
                    }
                }
            };

        } else {
            return {
                storage: multer.diskStorage({
                    destination: resolve(__dirname, '..', '..', folder),
                    filename: (request, file, callback) => {
                        const fileHash = crypto.randomBytes(16).toString('hex');
                        const fileName = `${fileHash}-${file.originalname}`;

                        return callback(null, fileName);
                    }
                })
            };
        }

    }
}



