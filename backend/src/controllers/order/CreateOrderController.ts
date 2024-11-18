import { Request, Response } from 'express';
import CreateOrderService from '../../services/order/CreateOrderService';

class CreateOrderController {
  async handle(request: Request, response: Response) {
    const { deliveryType, deliveryAddress, latitude, longitude, tableNumber, observation, paymentMethod } = request.body;
    const { id: userId } = request.user; // Supondo que o userId é extraído do token de autenticação

    const createOrderService = new CreateOrderService();

    try {
      const order = await createOrderService.execute({
        userId,
        deliveryType,
        deliveryAddress,
        latitude,
        longitude,
        tableNumber,
        observation,
        paymentMethod
      });

      return response.status(201).json(order);
    } catch (error) {
      console.error('Erro ao criar o pedido:', error);
      return response.status(400).json({ message: 'Erro ao criar o pedido', error: error.message });
    }
  }
}

export default new CreateOrderController();
