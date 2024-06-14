import { Client } from "basic-ftp";
import prismaClient from "../../prisma";
import bcrypt from "bcryptjs";
import fs from "fs/promises"; // Importar o módulo fs para manipulação de arquivos

interface UserRequest {
    userId: string;
    name?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
    profileImage?: string;
}

class UpdateUserService {
    async execute({ userId, email, name, currentPassword, newPassword, profileImage }: UserRequest) {
        // Fetch the user from the database
        const user = await prismaClient.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        // Check if the current password matches, if provided
        if (currentPassword) {
            const passwordMatch = await bcrypt.compare(currentPassword, user.password);
            if (!passwordMatch) {
                throw new Error("Current password is incorrect");
            }
        }

        // If new password is provided, hash it
        let hashedPassword = user.password;
        if (newPassword) {
            hashedPassword = await bcrypt.hash(newPassword, 8);
        }

        // Prepare data for update
        const userData: any = {};
        if (name) userData.name = name;
        if (email) userData.email = email;
        if (profileImage) {
            // Remover a imagem antiga do perfil se existir
            if (user.profileImage) {
                try {
                    if (process.env.FTP === 'true') {
                        const client = new Client();
                        await client.access({
                            host: process.env.FTP_HOST,
                            user: process.env.FTP_USER,
                            password: process.env.FTP_PASS,
                            secure: true,
                            secureOptions: { rejectUnauthorized: false }
                        });

                        // Caminho do arquivo no servidor FTP
                        const filePath = `/${user.profileImage}`;

                        // Deleta o arquivo do servidor FTP
                        await client.remove(filePath);
                    } else {

                        if (process.env.DATABASE_TIPO === 'online') {
                            await fs.unlink(`${__dirname}/${user.profileImage}`);
                        } else {
                            await fs.unlink(`${__dirname}../../../../tmp/${user.profileImage}`);
                        }
                    }
                } catch (error) {
                    console.error("Error removing old profile image:", error);
                }
            }
            // Definir a nova imagem do perfil
            userData.profileImage = profileImage;
        }
        if (newPassword) userData.password = hashedPassword;

        // Update the user with the new details
        const updatedUser = await prismaClient.user.update({
            where: { id: userId },
            data: userData,
            select: {
                id: true,
                isAdmin: true,
                email: true,
                name: true,
                profileImage: true,
            }
        });

        return updatedUser;
    }
}

export { UpdateUserService };
