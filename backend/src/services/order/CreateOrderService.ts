import prismaClient from '../../prisma';

interface CreateOrderRequest {
  user_id: string;
  deliveryType: 'Endereço' | 'Mesa';
  deliveryAddress?: string; // Se for "Endereço", precisaremos deste campo
  tableNumber?: string; // Se for "Mesa", precisaremos deste campo
  observation?: string; // Campo opcional para observações
}

class CreateOrderService {
  async execute({ user_id, deliveryType, deliveryAddress, tableNumber, observation }: CreateOrderRequest) {
    // Verifica se as informações de entrega estão corretas
    if (deliveryType === 'Endereço' && !deliveryAddress) {
      throw new Error('Endereço de entrega não fornecido.');
    }

    if (deliveryType === 'Mesa' && !tableNumber) {
      throw new Error('Número da mesa não fornecido.');
    }

    // Recupera o usuário para pegar o nome e o e-mail
    const user = await prismaClient.user.findUnique({
      where: { id: user_id },
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
        userName: user.name, // Nome do cliente
        userEmail: user.email, // Email do cliente
        status: 'Criado',
        totalPrice,
        deliveryType,
        deliveryAddress: deliveryType === 'Endereço' ? deliveryAddress : null, // Endereço de entrega
        tableNumber: deliveryType === 'Mesa' ? tableNumber : null, // Número da mesa
        observation, // Inclui a observação aqui
        items: {
          create: cart.items.map((cartItem) => ({
            product_id: cartItem.product_id,
            amount: cartItem.amount,
            product_name: cartItem.product.name, // Nome do produto
            product_price: cartItem.product.price, // Preço do produto
          })),
        },
      },
      include: {
        items: true, // Inclui os itens no retorno
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
