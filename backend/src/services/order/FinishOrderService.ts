import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

export class FinishOrderService {
    async execute({order_id}: OrderRequest){
        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                status: true
            }
        });

        return order;
    }
}