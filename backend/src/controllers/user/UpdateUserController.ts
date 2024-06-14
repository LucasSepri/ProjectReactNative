import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/user/UpdateUserService';

class UpdateUserController {
    async handle(req: Request, res: Response) {
        const { userId, email, name, currentPassword, newPassword } = req.body;

        const updateUserService = new UpdateUserService();

        let profileImage;
        if (req.file) {
            profileImage = req.file.path.split(process.env.FTP === 'true' ? "/" : "\\" ).pop();
        }

        try {
            const user = await updateUserService.execute({
                userId,
                name,
                email,
                currentPassword,
                newPassword,
                profileImage
            });
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { UpdateUserController };
