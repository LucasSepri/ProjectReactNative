// src/controllers/cart/RemoveFromCartController.ts
import { Request, Response } from 'express';
import RemoveFromCartService from '../../services/cart/RemoveFromCartService';

class RemoveFromCartController {
  async handle(req: Request, res: Response) {
    const user_id = req.user.id; // Obtém o ID do usuário autenticado
    const { product_id } = req.params; // Obtém o ID do produto a ser removido

    try {
      const { cart, totalPrice } = await RemoveFromCartService.execute(user_id, product_id);
      return res.status(200).json({ cart, totalPrice }); // Retorna o carrinho atualizado e o total
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default new RemoveFromCartController();
