import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password, phone, address } = req.body;
        const profileImage = req.file?.path; // Certifique-se de obter o nome do arquivo corretamente

        const createUserService = new CreateUserService();

        try {
            const user = await createUserService.execute({ name, email, password, phone, address, profileImage });
            return res.status(201).json({ user });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { CreateUserController };
