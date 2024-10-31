// src/services/ListAddressesService.ts
import  prisma  from '../../prisma'; // Importe seu cliente Prisma

class ListAddressesService {
  async execute(userId: string) {
    const addresses = await prisma.address.findMany({
      where: {
        user_id: userId,
      },
    });

    return addresses;
  }
}

export { ListAddressesService };
