import prismaClient from '../../prisma';

class PromoteReceptionistService {
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
        isReceptionist: true,
      },
    });

    return { message: 'Usuário promovido a Recepcionista com sucesso.' };
  }
}

export default new PromoteReceptionistService();
