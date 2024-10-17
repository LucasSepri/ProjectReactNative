import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Certifique-se de instalar jsonwebtoken

const prisma = new PrismaClient();

interface LoginRequest {
    email: string;
    password: string;
}

class LoginUserService {
    async execute({ email, password }: LoginRequest) {
        // Encontra o usuário pelo e-mail
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw new Error('E-mail ou senha incorretos.');
        }

        // Verifica a senha
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('E-mail ou senha incorretos.');
        }

        // Gera um token JWT 
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'default-secret-key', {
            expiresIn: '1h',
        });


        return { user, token };
    }
}

export default new LoginUserService();
