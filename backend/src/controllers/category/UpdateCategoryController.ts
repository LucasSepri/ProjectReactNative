// controllers/category/UpdateCategoryController.ts
import { Request, Response } from 'express';
import { UpdateCategoryService } from '../../services/category/UpdateCategoryService';

class UpdateCategoryController {
    async handle(req: Request, res: Response) {
        const { id, name } = req.body;

        const updateCategoryService = new UpdateCategoryService();

        const category = await updateCategoryService.execute({ id, name });

        return res.json(category);
    }
}

export { UpdateCategoryController };
