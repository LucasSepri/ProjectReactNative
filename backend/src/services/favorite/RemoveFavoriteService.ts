import prismaClient from '../../prisma';

class RemoveFavoriteService {
  async execute(userId: string, productId: string) {
    // Verifica se o produto está na lista de favoritos do usuário
    const favorite = await prismaClient.favorite.findFirst({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    if (!favorite) {
      throw new Error('Produto não está na lista de favoritos.');
    }

    // Remove o produto da lista de favoritos
    await prismaClient.favorite.delete({
      where: {
        id: favorite.id,
      },
    });

    return { message: 'Produto removido dos favoritos com sucesso.' };
  }
}

export default new RemoveFavoriteService();
