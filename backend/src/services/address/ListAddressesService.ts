// src/services/ListAddressesService.ts
import prisma from '../../prisma'; // Importe seu cliente Prisma

class ListAddressesService {
  async execute(userId: string) {
    // Obtém a lista de endereços do usuário
    const addresses = await prisma.address.findMany({
      where: {
        user_id: userId, // Correção aplicada
      },
    });

    return addresses;
  }
}
export default new ListAddressesService();

