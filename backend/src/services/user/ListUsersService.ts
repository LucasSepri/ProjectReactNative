import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ListUsersService {
  async execute() {
    // Recupera todos os usuários do banco de dados
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
        isAdmin: true,
        created_at: true,
        updated_at: true,
      },
    });

    return users;
  }
}

export default new ListUsersService();
