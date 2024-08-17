// createOrderController.ts
import { Request, Response } from 'express'; 
import { CreateOrderService } from '../../services/order/CreateOrderService';

class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { deliveryType, table, address, items } = req.body;

        const createOrderService = new CreateOrderService();

        try {
            const order = await createOrderService.execute({
                deliveryType,
                table,
                address,
                items
            });
            return res.status(201).json(order);
        } catch (error) {
            console.error(`Erro ao criar pedido: ${error}`);
            return res.status(500).json({ error: "Erro ao criar pedido" });
        }
    }
}

export { CreateOrderController }
