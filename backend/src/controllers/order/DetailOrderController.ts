import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController {
    async handle(req: Request, res: Response){
        const order_id = req.params.order_id as string;

        const detailOrder = new DetailOrderService();

        const orders = await detailOrder.execute({
            order_id
        });

        return res.json(orders);
    }
}

export { DetailOrderController }
