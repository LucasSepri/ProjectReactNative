import { Endereco } from './../../../node_modules/.prisma/client/index.d';
// src/services/ListAddressesService.ts
import prisma from '../../prisma'; // Importe seu cliente Prisma

class ListAddressesService {
  async execute(userId: string) {
    // Obtém a lista de endereços do usuário
    const addresses = await prisma.endereco.findMany({
      where: {
        userId: userId, // Correção aplicada
      },
    });

    return addresses;
  }
}
export default new ListAddressesService();

