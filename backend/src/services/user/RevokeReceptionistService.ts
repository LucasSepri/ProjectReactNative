import prismaClient from '../../prisma';

class RevokeReceptionistService {
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

    // Atualiza o status de administrador
    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        isReceptionist: false,
      },
    });

    return { message: 'Status de recepcionista revogado com sucesso.' };
  }
}

export default new RevokeReceptionistService();
