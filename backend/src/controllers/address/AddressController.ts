import { Request, Response } from 'express';
import CreateAddressService from '../../services/address/CreateAddressService';

class AddressController {
  async handle(req: Request, res: Response) {
    const { address, city, state, zipCode } = req.body;
    const user_id = req.user.id; // ID do usuário autenticado

    try {
      const result = await CreateAddressService.execute(user_id, { address, city, state, zipCode });
      return res.status(201).json(result);
    } catch (error) {
      console.error('Erro ao criar endereço:', error.message); // Log de erro para depuração
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new AddressController();
