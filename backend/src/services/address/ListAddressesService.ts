import prismaClient from '../../prisma';

class ListAddressesService {
  async execute(userId: string) {
    // Busca os endereços do usuário específico no banco de dados
    const addresses = await prismaClient.address.findMany({
      where: {
        user_id: userId, // Filtra endereços pelo ID do usuário
      },
      include: { user: true }, // Inclui informações do usuário se necessário
    });
    return addresses;
  }
}

export default new ListAddressesService();
