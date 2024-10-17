import { Request, Response } from 'express';
import { FindOrderService } from '../../services/order/FindOrderService';

export class FindOrderController {
  async handle(req: Request, res: Response) {
    const { id } = req.params; // Recebendo o ID da ordem via parâmetro de rota

    const findOrderService = new FindOrderService();

    try {
      const order = await findOrderService.execute({ orderId: id });
      return res.json(order);
    } catch (error) {
      // Caso a ordem não seja encontrada ou haja um erro
      return res.status(404).json({ error: error.message });
    }
  }
}
export default new FindOrderController();