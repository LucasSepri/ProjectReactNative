import prismaClient from '../../prisma';

class ListAddressesService {
  async execute(userId: string) {
    try {
      // Lista todos os endereços do usuário
      const addresses = await prismaClient.address.findMany({
        where: {
          userId,
        },
      });
      return addresses;
    } catch (error) {
      throw new Error('Erro ao listar endereços: ' + error.message);
    }
  }
}

export default new ListAddressesService();
