import { Request, Response } from 'express';
import RemoveFavoriteService from '../../services/favorite/RemoveFavoriteService';

class RemoveFavoriteController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id; // Assume que o ID do usuário está no req.user
    const { productId } = req.params;

    try {
      const result = await RemoveFavoriteService.execute(userId, productId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new RemoveFavoriteController();
