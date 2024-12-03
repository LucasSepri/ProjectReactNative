import { Request, Response } from 'express';
import PromoteReceptionistService from '../../services/user/PromoteReceptionistService';

class PromoteReceptionistController {
  async handle(req: Request, res: Response) {
    const { id } = req.params; // ID do usuário a ser promovido

    try {
      // Chama o serviço para promover o usuário
      const result = await PromoteReceptionistService.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new PromoteReceptionistController();
