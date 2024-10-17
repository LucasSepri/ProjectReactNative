import { Request, Response } from 'express';
import AddToCartService from '../../services/cart/AddToCartService';

class AddToCartController {
  async handle(req: Request, res: Response) {
    const { product_id, amount } = req.body;
    const user_id = req.user.id; // Supondo que o middleware `isAuthenticated` está em uso

    try {
      // Executa o serviço de adição ao carrinho
      const cartItem = await AddToCartService.execute({ user_id, product_id, amount });

      // Retorna o item do carrinho junto com o ID do usuário
      return res.status(201).json({
        user_id,        // Inclui o ID do usuário na resposta
        cartItem,       // Item adicionado ou atualizado no carrinho
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new AddToCartController();
