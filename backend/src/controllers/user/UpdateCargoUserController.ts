import { Request, Response } from 'express';
import { UpdateCargoUserService } from './../../services/user/UpdateCargoUserService';

class UpdateCargoUserController {
    async handle(req: Request, res: Response) {
        const { userId, isAdmin } = req.body;

        const updateCargoUserService = new UpdateCargoUserService();

        const Cargo = await updateCargoUserService.execute({ userId, isAdmin});

        return res.json(Cargo);
    }
}

export { UpdateCargoUserController };
