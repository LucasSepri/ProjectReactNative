import prismaClient from '../../prisma';

class UpdateAddressService {
  async execute(userId: string, addressId: string, updateData: { address?: string, city?: string, state?: string, zipCode?: string }) {
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

      // Atualiza o endereço
      const updatedAddress = await prismaClient.address.update({
        where: { id: addressId },
        data: updateData,
      });

      return updatedAddress;
    } catch (error) {
      throw new Error('Erro ao atualizar o endereço: ' + error.message);
    }
  }
}

export default new UpdateAddressService();
