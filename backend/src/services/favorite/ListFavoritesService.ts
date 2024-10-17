import prismaClient from '../../prisma';

class ListFavoritesService {
  async execute(userId: string) {
    // Obtém a lista de produtos favoritos do usuário
    const favorites = await prismaClient.favorite.findMany({
      where: {
        user_id: userId,
      },
      include: {
        product: {
          include: {
            category: true, // Inclui a categoria do produto
          },
        },
      },
    });

    // Retorna apenas os produtos com suas categorias
    return favorites.map(fav => fav.product);
  }
}

export default new ListFavoritesService();
