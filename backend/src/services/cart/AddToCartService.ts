// src/services/cart/AddToCartService.ts
import prismaClient from '../../prisma';

interface AddToCartRequest {
  user_id: string;
  product_id: string;
  amount: number;
}

class AddToCartService {
  async execute({ user_id, product_id, amount }: AddToCartRequest) {
    // Verifica se o carrinho do usuário já existe
    let cart = await prismaClient.cart.findUnique({
      where: { user_id },
      include: { items: true }, // Inclui os itens do carrinho
    });

    // Se não existir, cria um novo carrinho para o usuário
    if (!cart) {
      cart = await prismaClient.cart.create({
        data: {
          user_id,
        },
        include: {
          items: true,
        },
      });
    }

    // Verifica se o produto já está no carrinho
    const existingCartItem = cart.items.find(item => item.product_id === product_id);

    if (existingCartItem) {
      // Atualiza a quantidade do item existente
      return await prismaClient.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          amount: existingCartItem.amount + amount,
        },
      });
    } else {
      // Adiciona um novo item ao carrinho
      return await prismaClient.cartItem.create({
        data: {
          amount,
          product_id,
          cart_id: cart.id,
        },
      });
    }
  }
}

export default new AddToCartService();
