import { Request, Response } from 'express';
import ListProductsService from '../../services/product/ListProductsService';

class ListProductsController {
    async handle(req: Request, res: Response) {
        const products = await ListProductsService.execute();
        return res.json(products);
    }
}

export default new ListProductsController();
