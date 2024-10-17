import prismaClient from '../../prisma';

class DeleteAddressService {
  async execute(userId: string, addressId: string) {
    try {
      // Verifica se o endereço pertence ao usuário
      const address = await prismaClient.address.findFirst({
        where: {
          id: addressId,
          userId,
        },
      });

      if (!address) {
        throw new Error('Endereço não encontrado ou não pertence ao usuário.');
      }

      // Deleta o endereço
      await prismaClient.address.delete({
        where: { id: addressId },
      });

      return { message: 'Endereço excluído com sucesso.' };
    } catch (error) {
      throw new Error('Erro ao excluir o endereço: ' + error.message);
    }
  }
}

export default new DeleteAddressService();
