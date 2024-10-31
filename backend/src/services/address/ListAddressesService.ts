// services/ListAddressesService.js
import prisma from '../../prisma';

class ListAddressesService {
  async execute(user_id) {
    const addresses = await prisma.address.findMany({
      where: {
        user_id,
      },
    });

    if (!addresses) {
      throw new Error("Endereços não encontrados para o usuário.");
    }

    return addresses;
  }
}

export default ListAddressesService;
