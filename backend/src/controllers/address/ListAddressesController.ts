import { Request, Response } from 'express';
import ListAddressesService from '../../services/address/ListAddressesService';

class ListAddressesController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id; // ID do usuário autenticado

    try {
      const addresses = await ListAddressesService.execute(userId);
      return res.status(200).json(addresses);
    } catch (error) {
      console.error('Erro ao listar endereços:', error.message); // Log de erro para depuração
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ListAddressesController();
