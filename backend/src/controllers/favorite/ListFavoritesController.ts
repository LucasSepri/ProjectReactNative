import { Request, Response } from 'express';
import ListFavoritesService from '../../services/favorite/ListFavoritesService';

class ListFavoritesController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id; // Assume que o ID do usuário está no req.user

    try {
      const products = await ListFavoritesService.execute(userId);
      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ListFavoritesController();
