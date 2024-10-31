// controllers/address/DeleteAddressController.ts
import { Request, Response } from 'express';
import DeleteAddressService from '../../services/address/DeleteAddressService';

export default {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const result = await DeleteAddressService.execute(id);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao deletar o endereço:", error.message);
      return res.status(500).json({ message: error.message });
    }
  },
};
