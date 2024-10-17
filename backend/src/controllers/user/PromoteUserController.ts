import { Request, Response } from 'express';
import PromoteUserService from '../../services/user/PromoteUserService';

class PromoteUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params; // ID do usuário a ser promovido
    const user_id = req.body.user_id; // ID do usuário autenticado
    const isAdmin = req.body.isAdmin; // Verifica se o usuário é administrador

    // Verifica se o usuário autenticado é um administrador
    if (!isAdmin) {
      return res.status(403).json({ error: 'Acesso negado. Somente administradores podem promover usuários.' });
    }

    try {
      // Chama o serviço para promover o usuário
      const result = await PromoteUserService.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new PromoteUserController();
