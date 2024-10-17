import prismaClient from '../../prisma';

class AddFavoriteService {
  async execute(userId: string, productId: string) {
    // Verifica se o produto já está na lista de favoritos do usuário
    const existingFavorite = await prismaClient.favorite.findFirst({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    if (existingFavorite) {
      throw new Error('Produto já está na lista de favoritos.');
    }

    // Adiciona o produto à lista de favoritos
    const favorite = await prismaClient.favorite.create({
      data: {
        user_id: userId,
        product_id: productId,
      },
    });

    return favorite;
  }
}

export default new AddFavoriteService();
