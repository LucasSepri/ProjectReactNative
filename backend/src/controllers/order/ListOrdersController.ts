import { Request, Response } from "express";   
import { ListOrdersService } from "../../services/order/ListOrdersService";

class ListOrdersController {
    async handle(req: Request, res: Response){
        try {
            const listOrdersService = new ListOrdersService();
            const orders = await listOrdersService.execute();
            return res.json(orders);
        } catch (error) {
            console.error("Erro ao listar os pedidos:", error);
            return res.status(500).json({ error: "Erro ao listar os pedidos" });
        }
    }
}

export { ListOrdersController };
