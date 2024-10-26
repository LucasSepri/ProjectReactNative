import { Request, Response } from 'express';
import UpdateUserService from '../../services/user/UpdateUserService';
import upload from '../../config/multer'; // Ajuste o caminho se necessário

class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params; // Assume que o ID do usuário a ser atualizado vem na URL
    const { name, email, phone, password } = req.body;
    const profileImagePath = req.file?.filename ? `/uploads/${req.file.filename}` : undefined;

    try {
      // Chama o serviço de atualização de usuário
      const updatedUser = await UpdateUserService.execute({
        id,
        name,
        email,
        phone,
        password,
        profileImage: profileImagePath,
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UpdateUserController();
