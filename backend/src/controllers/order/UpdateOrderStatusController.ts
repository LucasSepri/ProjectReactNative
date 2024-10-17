import { Request, Response } from 'express';
import UpdateOrderStatusService from '../../services/order/UpdateOrderStatusService';

class UpdateOrderStatusController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.params; // Certifique-se de que está pegando o ID corretamente
    const { newStatus } = req.body;

    try {
      const updatedOrder = await UpdateOrderStatusService.execute({
        order_id, // Aqui você deve garantir que orderId não é undefined
        newStatus,
      });
      return res.json(updatedOrder);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UpdateOrderStatusController();
