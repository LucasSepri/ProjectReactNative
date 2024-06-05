import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ListOrdersService {
    async execute() {
        const orders = await prisma.order.findMany({
            where: {
                draft: false,
                status: {
                    not: "Entregue" // Considerando que "Entregue" é o status para pedidos entregues
                }
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            },
        });

        return orders;
    }
}

export { ListOrdersService };
