import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
    async handle(req: Request, res: Response) {
        const user_id = req.params.user_id; // Supondo que o user_id venha como parâmetro na rota

        const detailUserService = new DetailUserService();

        try {
            const { user } = await detailUserService.execute(user_id);

            return res.json(user);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    }
}

export { DetailUserController };
