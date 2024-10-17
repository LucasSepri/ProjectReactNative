import { Request, Response } from 'express';
import UpdateAddressService from '../../services/address/UpdateAddressService';

class UpdateAddressController {
  async handle(req: Request, res: Response) {
    const addressId = req.params.id; // ID do endereço a ser atualizado
    const userId = req.user.id; // ID do usuário autenticado
    const updateData = req.body; // Dados para atualização

    try {
      const updatedAddress = await UpdateAddressService.execute(userId, addressId, updateData);
      return res.status(200).json(updatedAddress);
    } catch (error) {
      console.error('Erro ao atualizar o endereço:', error.message); // Log de erro para depuração
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UpdateAddressController();
