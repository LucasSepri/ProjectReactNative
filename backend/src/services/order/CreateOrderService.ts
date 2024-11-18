import prisma from '../../prisma';
import { CartItem, Order } from '@prisma/client';

interface CreateOrderServiceData {
  userId: string;
  deliveryType: 'Endereço' | 'Mesa';
  deliveryAddress?: string;
  latitude?: number;
  longitude?: number;
  tableNumber?: string;
  observation?: string;
  paymentMethod: string; // Adicionado
}

class CreateOrderService {
  async execute({
    userId,
    deliveryType,
    deliveryAddress,
    latitude,
    longitude,
    tableNumber,
    observation,
    paymentMethod, // Adicionado
  }: CreateOrderServiceData): Promise<Order> {
    const cart = await prisma.cart.findUnique({
      where: { user_id: userId },
      include: { 
        items: { include: { product: true } },
        user: true,
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new Error('Carrinho vazio');
    }

    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.product.price * item.amount;
    }, 0);

    const order = await prisma.order.create({
      data: {
        user_id: userId,
        userName: cart.user.name,
        userEmail: cart.user.email,
        userPhone: cart.user.phone,
        deliveryType,
        deliveryAddress,
        latitude,
        longitude,
        tableNumber,
        observation,
        paymentMethod, // Adicionado
        totalPrice,
        status: 'Criado',
        items: {
          create: cart.items.map((item) => ({
            product_name: item.product.name,
            product_price: item.product.price,
            amount: item.amount,
            product_id: item.product.id,
          })),
        },
      },
    });

    await prisma.cartItem.deleteMany({
      where: { cart_id: cart.id },
    });

    return order;
  }
}

export default CreateOrderService;