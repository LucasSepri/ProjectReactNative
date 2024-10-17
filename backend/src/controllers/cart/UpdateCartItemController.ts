// src/controllers/cart/ListCartItemsController.ts
import { Request, Response } from 'express';
import UpdateCartItemService from '../../services/cart/UpdateCartItemService';

class UpdateCartItemController {
    async handle(req: Request, res: Response) {
      const { product_id, amount } = req.body; // A nova quantidade
      const user_id = req.user.id; // Obtém o ID do usuário autenticado
  
      try {
        const updatedCartItem = await UpdateCartItemService.execute({ user_id, product_id, amount });
        return res.status(200).json(updatedCartItem); // Retorna o item atualizado
      } catch (error) {
        return res.status(404).json({ error: error.message });
      }
    }
  }
  

export default new UpdateCartItemController();
