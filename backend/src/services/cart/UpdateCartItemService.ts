// src/services/cart/UpdateCartItemService.ts
import prismaClient from '../../prisma';

interface UpdateCartItemRequest {
  user_id: string;
  product_id: string;
  amount: number; // A nova quantidade
}

class UpdateCartItemService {
  async execute({ user_id, product_id, amount }: UpdateCartItemRequest) {
    // Encontra o carrinho do usuário
    const cart = await prismaClient.cart.findUnique({
      where: {
        user_id,
      },
      include: {
        items: true, // Inclui os itens do carrinho
      },
    });

    if (!cart) {
      throw new Error('Carrinho não encontrado.');
    }

    // Encontra o item no carrinho
    const cartItem = cart.items.find(item => item.product_id === product_id);

    if (!cartItem) {
      throw new Error('Item não encontrado no carrinho.');
    }

    // Se a nova quantidade for zero, remove o item
    if (amount <= 0) {
      await prismaClient.cartItem.delete({
        where: {
          id: cartItem.id,
        },
      });
      return { message: 'Item removido do carrinho.' };
    }

    // Atualiza a quantidade do item
    return await prismaClient.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount, // Atualiza a quantidade
      },
    });
  }
}

export default new UpdateCartItemService();
