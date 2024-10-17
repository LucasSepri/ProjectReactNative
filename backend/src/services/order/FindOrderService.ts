import prismaClient from '../../prisma'; 

interface FindOrderRequest {
  orderId: string;
}

export class FindOrderService {
  async execute({ orderId }: FindOrderRequest) {
    // Buscar a ordem no banco de dados
    const order = await prismaClient.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: true, // Supondo que a ordem tenha itens relacionados
      },
    });

    // Se a ordem não for encontrada, lança um erro
    if (!order) {
      console.error('Order not found');
    }

    return order;
  }
}
