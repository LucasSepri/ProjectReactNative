// src/controllers/product/ListProductsByCategoryController.ts
import { Request, Response } from 'express';
import ListProductsByCategoryService from '../../services/product/ListProductsByCategoryService';

class ListProductsByCategoryController {
  async handle(req: Request, res: Response) {
    const { idcategory } = req.params; // Recebe o ID da categoria via parâmetro de URL

    try {
      const products = await ListProductsByCategoryService.execute(idcategory);

      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new ListProductsByCategoryController();
