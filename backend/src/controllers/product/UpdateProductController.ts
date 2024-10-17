import { Request, Response } from 'express';
import UpdateProductService from '../../services/product/UpdateProductService';
import upload from '../../config/multer'; // Ajuste o caminho se necessário

class UpdateProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params; // Assume que o ID do produto a ser atualizado vem na URL
    const { name, price, description, category_id } = req.body;
    const bannerPath = req.file?.filename ? `/uploads/${req.file.filename}` : undefined;

    try {
      // Chama o serviço de atualização de produto
      const updatedProduct = await UpdateProductService.execute({
        id,
        name,
        price: price ? parseFloat(price) : undefined, // Certifique-se de converter para número
        description,
        banner: bannerPath,
        category_id,
      });

      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UpdateProductController();
