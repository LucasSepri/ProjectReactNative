import prismaClient from '../../prisma';

interface ListOrdersRequest {
  user_id?: string;
  isAdmin?: boolean;
}

class ListOrdersService {
  async execute({ user_id, isAdmin }: ListOrdersRequest) {
    let orders;

    if (isAdmin) {
      // Se o usuário for administrador, retorna todas as ordens
      orders = await prismaClient.order.findMany({
        include: {
          items: true,
          user: {
            select: { id: true, name: true, email: true }, // Inclui informações do usuário
          },
        },
      });
    } else {
      // Caso contrário, retorna apenas as ordens do usuário autenticado
      orders = await prismaClient.order.findMany({
        where: { user_id },
        include: {
          items: true,
          user: {
            select: { id: true, name: true, email: true }, // Inclui informações do usuário
          },
        },
      });
    }

    return orders;
  }
}

export default new ListOrdersService();
