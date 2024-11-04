// src/services/cart/ListCartItemsService.ts
import prismaClient from '../../prisma';

class ListCartItemsService {
  async execute(user_id: string) {
    // Verifica se o carrinho do usuário existe
    let cart = await prismaClient.cart.findUnique({
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

    // Se não encontrar o carrinho, cria um novo carrinho vazio
    if (!cart) {
      cart = await prismaClient.cart.create({
        data: {
          user_id,
          items: {
            create: [], // Ensure items are created as an empty array
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    // Calcula o valor total (será zero se o carrinho estiver vazio)
    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.amount * item.product.price;
    }, 0);

    return {
      cart,
      totalPrice,
    };
  }
}

export default new ListCartItemsService();
