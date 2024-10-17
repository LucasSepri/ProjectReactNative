// src/services/cart/ListCartItemsService.ts
import prismaClient from '../../prisma';

class ListCartItemsService {
  async execute(user_id: string) {
    // Encontra o carrinho do usuário, incluindo os itens e os produtos
    const cart = await prismaClient.cart.findUnique({
      where: {
        user_id,
      },
      include: {
        items: {
          include: {
            product: true, // Inclui os dados do produto
          },
        },
      },
    });

    if (!cart) {
      throw new Error('Carrinho não encontrado.');
    }

    // Calcula o valor total
    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.amount * item.product.price; // Multiplica a quantidade pelo preço do produto
    }, 0);

    return {
      cart,
      totalPrice, // Retorna o total calculado
    };
  }
}

export default new ListCartItemsService();
