// src/controllers/cart/ListCartItemsController.ts
import { Request, Response } from 'express';
import ListCartItemsService from '../../services/cart/ListCartItemsService';

class ListCartItemsController {
  async handle(req: Request, res: Response) {
    const user_id = req.user.id; // Obtém o ID do usuário autenticado

    try {
      const { cart, totalPrice } = await ListCartItemsService.execute(user_id);
      return res.status(200).json({ cart, totalPrice }); // Retorna o carrinho e o total
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default new ListCartItemsController();
