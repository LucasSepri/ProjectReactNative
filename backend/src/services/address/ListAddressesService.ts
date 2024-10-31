// src/services/ListAddressesService.ts
import prisma from '../../prisma'; // Importe seu cliente Prisma

class ListAddressesService {
  async execute(userId: string) {
    try {
      const addresses = await prisma.Endereco.findMany({
        where: {
          userId: userId, // Correção aplicada
        },
      });
      return addresses;
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
      throw new Error('Não foi possível buscar endereços');
    }
  }
}
export default new ListAddressesService();
