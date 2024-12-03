import { Request, Response } from 'express';
import RevokeAdminService from '../../services/user/RevokeReceptionistService';

class RevokeReceptionistController {
  async handle(req: Request, res: Response) {
    const { id } = req.params; // ID do usuário a ter o status de administrador revogado

    try {
      // Chama o serviço para revogar o status de administrador
      const result = await RevokeAdminService.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new RevokeReceptionistController();
