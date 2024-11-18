import { Request, Response } from "express";
import { ListAllOrdersService } from "../../services/order/ListAllOrdersService";

class ListAllOrdersController {
    async handle(req: Request, res: Response) {
        const listAllOrdersService = new ListAllOrdersService();

        try {
            const orders = await listAllOrdersService.execute();
            return res.status(200).json(orders);
        } catch (error) {
            console.error("Error listing orders: ", error);
            return res.status(500).json({ error: "Failed to list orders." });
        }
    }
}

export default new ListAllOrdersController();
