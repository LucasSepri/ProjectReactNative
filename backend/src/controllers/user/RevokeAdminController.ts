import { Request, Response } from 'express';
import RevokeAdminService from '../../services/user/RevokeAdminService';

class RevokeAdminController {
  async handle(req: Request, res: Response) {
    const { id } = req.params; // ID do usuário a ter o status de administrador revogado
    const user_id = req.body.user_id; // ID do usuário autenticado
    const isAdmin = req.body.isAdmin; // Verifica se o usuário é administrador

    // Verifica se o usuário autenticado é um administrador
    if (!isAdmin) {
      return res.status(403).json({ error: 'Acesso negado. Somente administradores podem revogar o status de administrador.' });
    }

    try {
      // Chama o serviço para revogar o status de administrador
      const result = await RevokeAdminService.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new RevokeAdminController();
