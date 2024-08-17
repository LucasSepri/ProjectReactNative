// src/controllers/user/DeleteUserController.ts

import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController {
    async handle(req: Request, res: Response) {
        const { userId } = req.body;

        const deleteUserService = new DeleteUserService();

        try {
            await deleteUserService.execute(userId);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { DeleteUserController };
