// src/controllers/user/DeleteUserController.ts

import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {
    async handle(req: Request, res: Response) {
        const { id } = req.body;

        const deleteProductService = new DeleteProductService();

        try {
            await deleteProductService.execute(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { DeleteProductController };
