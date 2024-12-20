import { Request, Response } from 'express';
import CreateUserService from '../../services/user/CreateUserService';

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, phone, profileImage } = req.body; // Adicione o telefone aqui
    const profileImagePath = req.file?.filename ? `/uploads/${req.file.filename}` : null;

    try {
      // Chama o serviço de criação de usuário
      const user = await CreateUserService.execute({
        name,
        email,
        password,
        phone, // Passa o telefone para o serviço
        profileImage: profileImagePath,
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new CreateUserController();
