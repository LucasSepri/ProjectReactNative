import { Request, Response } from 'express';
import ListAddressesService from '../../services/address/ListAddressesService';

class ListAddressesController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id; // Supondo que o middleware preencha req.user com os dados do usuário
    const addresses = await ListAddressesService.execute(userId);
    return res.json(addresses);
  }
}

export default new ListAddressesController();
