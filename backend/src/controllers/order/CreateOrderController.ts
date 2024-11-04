import { Request, Response } from 'express';
import CreateOrderService from '../../services/order/CreateOrderService';

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const user_id = req.user?.id; // ID do usuário autenticado

    if (!user_id) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    const { deliveryType, deliveryAddress, tableNumber, observation, latitude, longitude } = req.body;

    // Validação dos dados
    if (!deliveryType) {
      return res.status(400).json({ error: 'Tipo de entrega não informado.' });
    }
    try {
      const order = await CreateOrderService.execute({
        user_id,
        deliveryType,
        deliveryAddress,
        tableNumber,
        observation, // Passa a observação ao serviço
        latitude, // Passa latitude
        longitude // Passa longitude
      });

      return res.status(201).json(order);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new CreateOrderController();
