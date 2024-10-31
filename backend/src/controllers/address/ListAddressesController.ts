// src/controllers/ListAddressesController.ts
import { Request, Response } from 'express';
import { ListAddressesService } from '../../services/address/ListAddressesService';

// src/controllers/ListAddressesController.ts
class ListAddressesController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id;
    const listAddressesService = new ListAddressesService();

    try {
      const addresses = await listAddressesService.execute(userId);
      return res.json(addresses);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar endereços.' });
    }
  }
}

export { ListAddressesController };


