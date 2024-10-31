// src/services/ListAddressesService.ts
import prisma from '../../prisma'; // Importe seu cliente Prisma

class ListAddressesService {
  async execute(idUser: string) {
    try {
      const addresses = await prisma.address.findMany(
        {
          where: { user_id: idUser },
        },

      );
      return addresses;
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
      throw new Error('Não foi possível buscar endereços');
    }
  }
}
export default new ListAddressesService();
