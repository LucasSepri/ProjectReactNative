import { PrismaClient } from '@prisma/client';
import { deleteFile } from '../../utils/deleteFile'; // Função para deletar arquivos

const prisma = new PrismaClient();

class DeleteUserService {
  async execute(id: string) {
    // Encontra o usuário pelo ID
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        addresses: true, // Inclui endereços para garantir que a exclusão em cascata funcione
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Deleta a imagem de perfil, se houver
    if (user.profileImage) {
      deleteFile(user.profileImage.replace('/uploads/', ''));
    }

    // Atualiza as ordens para remover a associação com o usuário
    await prisma.order.updateMany({
      where: { user_id: id }, // Encontra todas as ordens do usuário
      data: { user_id: null }, // Remove a associação com o usuário
    });

    // Deleta o usuário
    await prisma.user.delete({
      where: {
        id,
      },
    });

    return { message: 'Usuário excluído com sucesso.' };
  }
}

export default new DeleteUserService();
