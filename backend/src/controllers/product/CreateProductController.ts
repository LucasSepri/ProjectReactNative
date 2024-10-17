import { Request, Response } from 'express';
import CreateProductService from '../../services/product/CreateProductService';

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;
    const bannerPath = req.file?.filename ? `/uploads/${req.file.filename}` : undefined;

    try {
      // Chama o serviço de criação de produto
      const product = await CreateProductService.execute({
        name,
        price,
        description,
        banner: bannerPath,
        category_id,
      });

      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new CreateProductController();
