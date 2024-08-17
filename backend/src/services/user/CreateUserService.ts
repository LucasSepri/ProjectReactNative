import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import path from "path";

interface UserRequest {
    name: string;
    email: string;
    password: string;
    profileImage?: string;
}

class CreateUserService {
    async execute({ name, email, password, profileImage }: UserRequest) {

        // Verificar se ele enviou um email
        if (!email) {
            throw new Error("Email Incorreto");
        }
        // Verificar se esse email já está cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        });

        if (userAlreadyExists) {
            throw new Error("Email já cadastrado");
        }

        const passwordHash = await hash(password, 8);

        // Extrair o nome do arquivo da imagem
        const profileImageName = profileImage ? path.basename(profileImage) : null;

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                profileImage: profileImageName
            },
            select: {
                id: true,
                name: true,
                email: true,
                profileImage: true,
            }
        });

        return { user };
    }
}

export { CreateUserService };
