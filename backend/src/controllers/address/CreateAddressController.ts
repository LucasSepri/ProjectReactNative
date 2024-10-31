// controllers/address/CreateAddressController.ts
import { Request, Response } from 'express';
import CreateAddressService from '../../services/address/CreateAddressService';

class CreateAddressController {
  async handle(req: Request, res: Response) {
    const {
      zip,
      street,
      number,
      neighborhood,
      complement,
      referencePoint,
      city,
      state,
      latitude,
      longitude,
    } = req.body;

    const user_id = req.user?.id; // Assumindo que o userId está disponível após autenticação

    const createAddressService = new CreateAddressService();

    try {
      const address = await createAddressService.execute({
        user_id,
        zip,
        street,
        number,
        neighborhood,
        complement,
        referencePoint,
        city,
        state,
        latitude,
        longitude,
      });

      return res.status(201).json(address);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating address' });
    }
  }
}

export default new CreateAddressController();
