import { Request, Response } from 'express';
import CancelOrderService from '../../services/order/CancelOrderService';

class CancelOrderController {
  async handle(req: Request, res: Response) {
    const user_id = req.user?.id; // ID do usuário autenticado
    const { order_id } = req.params; // ID do pedido a ser cancelado

    if (!user_id) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    try {
      const result = await CancelOrderService.execute({
        order_id,
        user_id,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new CancelOrderController();
