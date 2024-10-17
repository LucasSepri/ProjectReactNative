import prismaClient from '../../prisma';

class CreateAddressService {
  async execute(userId: string, addressData: { address: string, city: string, state: string, zipCode: string }) {
    try {
      // Cria um novo endereço para o usuário
      const address = await prismaClient.address.create({
        data: {
          userId,
          ...addressData,
        },
      });
      return address;
    } catch (error) {
      throw new Error('Erro ao criar o endereço: ' + error.message);
    }
  }
}

export default new CreateAddressService();
