import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CashierService {
    // Método para fechar o caixa do dia
    async closeDailyCashier() {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Começo do dia
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // Fim do dia

        // Buscar pedidos "Entregues" e não fechados do dia
        const orders = await prisma.order.findMany({
            where: {
                isClosed: false,
                status: "Entregue", // Somente pedidos com status "Entregue"
                // created_at: {
                //     gte: startOfDay,
                //     lte: endOfDay
                // },
            },
        });

        if (orders.length === 0) {
            return { message: "Nenhum pedido para fechar hoje." };
        }

        // Calcular total do dia
        const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);

        // Marcar os pedidos como fechados
        await prisma.order.updateMany({
            where: {
                id: { in: orders.map((order) => order.id) },
            },
            data: {
                status: "Finalizado",
                isClosed: true,
            },
        });

        return {
            message: "Caixa fechado com sucesso!",
            totalSales,
            ordersClosed: orders.length,
        };
    }
}

export default new CashierService();
