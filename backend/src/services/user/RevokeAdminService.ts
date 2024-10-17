import prismaClient from '../../prisma';

class RevokeAdminService {
  async execute(userId: string) {
    // Encontra o usuário pelo ID
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Verifica se o usuário é o único administrador
    const adminCount = await prismaClient.user.count({
      where: {
        isAdmin: true,
      },
    });

    if (user.isAdmin && adminCount === 1) {
      throw new Error('Não é possível revogar o status de administrador. Pelo menos um administrador deve existir.');
    }

    // Atualiza o status de administrador
    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        isAdmin: false,
      },
    });

    return { message: 'Status de administrador revogado com sucesso.' };
  }
}

export default new RevokeAdminService();
