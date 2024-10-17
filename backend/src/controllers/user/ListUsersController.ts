import { Request, Response } from 'express';
import ListUsersService from '../../services/user/ListUsersService';

class ListUsersController {
  async handle(req: Request, res: Response) {
    try {
      // Chama o serviço para listar todos os usuários
      const users = await ListUsersService.execute();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ListUsersController();
