import { Request, Response } from 'express';
import ListOrdersService from '../../services/order/ListOrdersService';

class ListOrdersController {
  async handle(req: Request, res: Response) {
    const user_id = req.user.id; // ID do usuário autenticado
    const isAdmin = req.user.isAdmin; // Verifica se o usuário é administrador

    try {
      const orders = await ListOrdersService.execute({ user_id, isAdmin });
      return res.json(orders); // Retorna as ordens
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ListOrdersController();
