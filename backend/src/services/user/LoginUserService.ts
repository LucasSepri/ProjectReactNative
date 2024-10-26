import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        const token = jwt.sign(
            { id: user.id, email: user.email, isAdmin: user.isAdmin }, // Inclui isAdmin no token
            process.env.JWT_SECRET || 'default-secret-key',
            {
                expiresIn: '1h',
            }
        );

        // Retorna o usuário com o telefone e o token
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone, // Incluindo telefone no retorno
                isAdmin: user.isAdmin,
                profileImage: user.profileImage,
            },
            token,
        };
    }
}

export default new LoginUserService();
