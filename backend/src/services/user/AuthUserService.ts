import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        // Verificar se o email existe.
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("Email/Senha incorretos");
        }

        // Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/Senha incorretos");
        }

        // Gerar um token JWT e devolver os dados do usuário com id, name, email, phone, address e isAdmin
        const token = sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d"
            }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            phone: user.phone,
            address: user.address,
            isAdmin: user.isAdmin,
            token: token,
        };
    }
}

export { AuthUserService };
