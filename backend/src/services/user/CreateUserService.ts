import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

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

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                // profileImage: profileImage.split(process.env.FTP === 'true' ? "\\" : "/").pop() || null 
                profileImage: profileImage.split(process.env.FTP === 'true' ? "/" : "\\" ).pop() || null 
            },
            select: {
                id: true,
                name: true,
                email: true,
                profileImage: true,
            }
        });

        return { user }
    }
}

export { CreateUserService }
