import prismaClient from '../../prisma';

class ListAddressesService {
  async execute(userId: string) {
    const addresses = await prismaClient.address.findMany({
      where: {
        user_id: userId as any, // Usando `user_id` conforme a exigência do Prisma
      },
      include: { user: true },
    });
    return addresses;
  }
}

export default new ListAddressesService();
