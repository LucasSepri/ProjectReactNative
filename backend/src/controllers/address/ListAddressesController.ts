// src/controllers/AddressController.ts
import { Request, Response } from 'express';
import ListAddressesService from '../../services/address/ListAddressesService';

class ListFavoritesController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id; // Assume que o ID do usuário está no req.user

    try {
      const addresses = await ListAddressesService.execute(userId);
      return res.status(200).json(addresses);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ListFavoritesController();

