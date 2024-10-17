import prismaClient from '../../prisma';

interface UpdateOrderStatusRequest {
    order_id: string;  // ID do pedido
    newStatus: string; // Novo status do pedido
}

class UpdateOrderStatusService {
    async execute({ order_id, newStatus }: UpdateOrderStatusRequest) {

        // Verifica se o pedido existe
        const order = await prismaClient.order.findUnique({
            where: { id: order_id }, // Verifique se orderId está definido corretamente
        });

        if (!order) {
            throw new Error('Pedido não encontrado.');
        }

        // Atualiza o status do pedido
        const updatedOrder = await prismaClient.order.update({
            where: { id: order_id },
            data: { status: newStatus },
        });

        return updatedOrder;
    }
}


export default new UpdateOrderStatusService();
