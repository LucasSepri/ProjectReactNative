// src/services/cart/RemoveFromCartService.ts
import prismaClient from '../../prisma';

class RemoveFromCartService {
  async execute(user_id: string, product_id: string) {
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

    // Verifica se o item existe no carrinho
    const itemToRemove = cart.items.find(item => item.product_id === product_id);
    if (!itemToRemove) {
      throw new Error('Item não encontrado no carrinho.');
    }

    // Remove o item do carrinho
    await prismaClient.cartItem.delete({
      where: {
        id: itemToRemove.id,
      },
    });

    // Recalcula o valor total após a remoção
    const updatedCart = await prismaClient.cart.findUnique({
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

    // Calcula o valor total
    const totalPrice = updatedCart.items.reduce((total, item) => {
      return total + item.amount * item.product.price; // Multiplica a quantidade pelo preço do produto
    }, 0);

    return {
      cart: updatedCart,
      totalPrice, // Retorna o total calculado
    };
  }
}

export default new RemoveFromCartService();
