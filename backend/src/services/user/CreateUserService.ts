import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    profileImage?: string;
}

class CreateUserService {
    async execute({ name, email, password, phone, address, profileImage }: UserRequest) {

        // Verificar se o e-mail foi fornecido
        if (!email) {
            throw new Error("Email não fornecido");
        }

        // Verificar se o e-mail já está cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        });

        if (userAlreadyExists) {
            throw new Error("Email já cadastrado");
        }

        // Hash da senha
        const passwordHash = await hash(password, 8);

        let Corrigido = null;
        if (profileImage) {
            const parts = profileImage.split(/[\\/]+/);
            Corrigido = parts[parts.length - 1];
        }

        // Criar usuário no banco de dados
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                phone: phone,
                address: address,
                profileImage: Corrigido
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
