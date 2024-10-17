import { Request, Response } from 'express';
import DeleteAddressService from '../../services/address/DeleteAddressService';

class DeleteAddressController {
  async handle(req: Request, res: Response) {
    const addressId = req.params.id; // ID do endereço a ser excluído
    const userId = req.user.id; // ID do usuário autenticado

    try {
      const result = await DeleteAddressService.execute(userId, addressId);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao excluir o endereço:', error.message); // Log de erro para depuração
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new DeleteAddressController();
