import prismaClient from '../../prisma';

interface CreateOrderRequest {
  user_id: string;
  deliveryType: 'Endereço' | 'Mesa';
  deliveryAddress?: string; // Texto do endereço completo para o caso de "Endereço"
  tableNumber?: string;
  observation?: string;
  latitude?: number;
  longitude?: number;
}

class CreateOrderService {
  async execute({ user_id, deliveryType, deliveryAddress, tableNumber, observation, latitude, longitude }: CreateOrderRequest) {
    if (deliveryType === 'Endereço' && !deliveryAddress) {
      throw new Error('Endereço de entrega não fornecido.');
    }

    // Recupera o usuário para pegar o nome, e-mail e telefone
    const user = await prismaClient.user.findUnique({
      where: { id: user_id },
      select: { name: true, email: true, phone: true },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Recupera o carrinho do usuário com os itens
    const cart = await prismaClient.cart.findUnique({
      where: { user_id },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new Error('Carrinho vazio ou não encontrado.');
    }

    // Calcula o total do pedido
    const totalPrice = cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.amount;
    }, 0);

    // Cria a nova ordem
    const order = await prismaClient.order.create({
      data: {
        user_id,
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        status: 'Criado',
        totalPrice,
        deliveryType,
        deliveryAddress: deliveryType === 'Endereço' ? deliveryAddress : null,
        latitude: latitude, // Usa latitude fornecida no corpo da requisição
        longitude: longitude, // Usa longitude fornecida no corpo da requisição
        tableNumber: deliveryType === 'Mesa' ? tableNumber : null,
        observation,
        items: {
          create: cart.items.map((cartItem) => ({
            product_id: cartItem.product_id,
            amount: cartItem.amount,
            product_name: cartItem.product.name,
            product_price: cartItem.product.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Remove os itens do carrinho após criar a ordem
    await prismaClient.cartItem.deleteMany({
      where: { cart_id: cart.id },
    });

    return order;
  }
}


export default new CreateOrderService();
