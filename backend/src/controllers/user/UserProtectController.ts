// src/controllers/UserProtectController.ts
import { Request, Response } from 'express';
import { UserProtectService } from '../../services/user/UserProtectService';

export class UserProtectController {
  private userProtectService: UserProtectService;

  constructor() {
    this.userProtectService = new UserProtectService();
  }

  public async getUserData(req: Request, res: Response) {
    const userId = req.user.id; // O ID do usuário é extraído do middleware

    try {
      const userData = await this.userProtectService.getUserData(userId);
      return res.json(userData);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao obter os dados do usuário.' });
    }
  }
}
export default new UserProtectController();
