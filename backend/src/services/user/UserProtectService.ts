import { User } from '@prisma/client';
// src/services/UserProtectService.ts
import prisma from '../../prisma'; // Certifique-se de que o caminho para o prisma está correto

export class UserProtectService {
    public async getUserData(userId: string) {
        // Aqui, você pode buscar os dados do usuário no banco de dados
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            profileImage: true,
            isAdmin: true,
        },
    });

    if(!user) {
        throw new Error('Usuário não encontrado');
    }

    return user;
  }

}
