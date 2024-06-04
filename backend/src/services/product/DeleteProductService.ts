import prismaClient from "../../prisma";
import fs from 'fs';
import path from 'path';
import { Client } from 'basic-ftp';


class DeleteProductService {
    async execute(id: string) {
        const product = await prismaClient.product.findUnique({
            where: {
                id: id
            }
        });

        if (!product) {
            throw new Error("Produto não encontrado.");
        }

        if (product.banner) {
            if (process.env.FTP === 'true') {
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

                        // Caminho do arquivo no servidor FTP
                        const filePath = `/${product.banner}`;

                        // Deleta o arquivo do servidor FTP
                        await client.remove(filePath);
                        console.log("Imagem dp produto excluída com sucesso do FTP.");
                    } catch (error) {
                        console.error("Erro ao excluir a imagem do produto do FTP:", error);
                    } finally {
                        client.close();
                    }
                })();
            } else {
                // Remove a imagem de perfil do diretório 'tmp'
                const filePath = path.resolve(__dirname, '..', '..', '..', 'tmp', product.banner);

                fs.unlink(filePath, (err) => {
                    if (err) {
                        // console.error("Falha ao excluir a imagem de perfil:", err);
                        // console.error("Caminho do arquivo:", filePath);
                    } else {
                        // console.log("Imagem de perfil excluída com sucesso.");
                        // console.log("Caminho do arquivo:", filePath);
                    }
                });
            }
        }

        await prismaClient.product.delete({
            where: {
                id: id
            }
        });
    }
}

export { DeleteProductService };
