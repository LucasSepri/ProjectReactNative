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
    phone?: string; // Novo campo: número de telefone
    address?: string; // Novo campo: endereço
}

class UpdateUserService {
    async execute({ userId, email, name, currentPassword, newPassword, profileImage, phone, address }: UserRequest) {
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
            // Remove old profile image if exists
            if (user.profileImage) {
                await this.deleteProfileImage(user.profileImage);
            }
            // Set new profile image
            userData.profileImage = profileImage;
        }
        if (phone) userData.phone = phone;
        if (address) userData.address = address;
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
                phone: true,
                address: true,
            }
        });

        return updatedUser;
    }

    private async deleteProfileImage(profileImage: string): Promise<void> {
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

                // File path on FTP server
                const filePath = `/${profileImage}`;

                // Delete file from FTP server
                await client.remove(filePath);
            } else {
                // Local file path
                const localFilePath = `${__dirname}/../../../tmp/${profileImage}`;

                // Delete file from local filesystem
                await fs.unlink(localFilePath);
            }
        } catch (error) {
            console.error("Error removing old profile image:", error);
            throw new Error("Failed to delete old profile image");
        }
    }
}

export { UpdateUserService };
