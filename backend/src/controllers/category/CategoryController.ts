import { Request, Response } from 'express';
import CreateCategoryService from '../../services/category/CreateCategoryService';
import UpdateCategoryService from '../../services/category/UpdateCategoryService';
import DeleteCategoryService from '../../services/category/DeleteCategoryService';
import ListCategoriesService from '../../services/category/ListCategoriesService';

class CategoryController {
    async create(req: Request, res: Response) {
        const { name } = req.body;
        try {
            const result = await CreateCategoryService.execute(name);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const categories = await ListCategoriesService.execute();
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const result = await UpdateCategoryService.execute(id, name);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await DeleteCategoryService.execute(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new CategoryController();
