import { Request, Response } from 'express';
import DeleteProductService from '../../services/product/DeleteProductService';

class DeleteProductController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        await DeleteProductService.execute(id);

        return res.status(200).json({ message: 'Produto excluído com sucesso.' });
    }
}

export default new DeleteProductController();
