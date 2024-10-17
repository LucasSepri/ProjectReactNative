import prismaClient from '../../prisma';

interface CancelOrderRequest {
  order_id: string;
  user_id: string;
}

class CancelOrderService {
  async execute({ order_id, user_id }: CancelOrderRequest) {
    // Encontra a ordem pelo ID e verifica se pertence ao usuário
    const order = await prismaClient.order.findUnique({
      where: { id: order_id },
    });

    if (!order) {
      throw new Error('Pedido não encontrado.');
    }

    // Verifica se a ordem não foi aceita
    if (order.status !== 'Criado') {
      throw new Error('A ordem não pode ser cancelada, pois já foi aceita.');
    }

    // Remove os itens da ordem antes de deletar a ordem
    await prismaClient.item.deleteMany({
      where: { order_id: order.id },
    });

    // Cancela a ordem
    await prismaClient.order.delete({
      where: { id: order_id },
    });

    return { message: 'Pedido cancelado com sucesso.' };
  }
}

export default new CancelOrderService();
