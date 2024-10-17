import { Request, Response } from 'express';
import AddFavoriteService from '../../services/favorite/AddFavoriteService';

class AddFavoriteController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id; // Assume que o ID do usuário está no req.user
    const { productId } = req.body;

    try {
      const favorite = await AddFavoriteService.execute(userId, productId);
      return res.status(201).json(favorite);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new AddFavoriteController();
