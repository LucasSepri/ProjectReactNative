// src/controllers/AddressController.ts
import { Request, Response } from 'express';
import ListAddressesService from '../../services/address/ListAddressesService';

class ListFavoritesController {
  async handle(req: Request, res: Response) {
    const { idUser } = req.params; // Assume que o ID do usuário está no req.user

    try {
      const addresses = await ListAddressesService.execute(idUser);
      return res.status(200).json(addresses);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ListFavoritesController();

