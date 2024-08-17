// createOrderService.ts
import prismaClient from "../../prisma";

interface OrderItem {
    amount: number;
    product_id: string;
    price: number; // Adicione o preço do produto ao OrderItem
}

interface OrderRequest {
    deliveryType: 'mesa' | 'endereco';
    table?: number;
    address?: string;
    items: OrderItem[];
}

class CreateOrderService {
    async execute({ deliveryType, table, address, items }: OrderRequest) {
        try {
            // Calcular o preço total dos itens
            const precoTotal = items.reduce((total, item) => total + item.amount * item.price, 0);

            let orderData = {
                status: "Em andamento",
                descricao: "Descrição do pedido",
                precoTotal,
                draft: false,
                items: {
                    create: items.map(item => ({
                        amount: item.amount,
                        product: { connect: { id: item.product_id } }
                    }))
                }
            };

            if (deliveryType === 'mesa') {
                orderData['table'] = table;
            } else if (deliveryType === 'endereco') {
                orderData['address'] = address;
            }

            const order = await prismaClient.order.create({
                data: orderData
            });
            return order;
        } catch (error) {
            throw new Error(`Erro ao criar pedido: ${error}`);
        }
    }
}
export { CreateOrderService }
