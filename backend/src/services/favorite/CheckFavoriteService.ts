import prisma from '../../prisma'; // Importa a instância do Prisma

class CheckFavoriteService {
    async execute(userId: string, productId: string) {
        try {
            // Verifica se o produto está nos favoritos do usuário
            const favorite = await prisma.favorite.findFirst({
                where: {
                    user_id: userId,
                    product_id: productId,
                },
            });

            return {
                isFavorite: !!favorite, // Retorna true se existir, caso contrário false
            };
        } catch (error) {
            console.error('Erro ao buscar favoritos:', error);
            throw new Error('Não foi possível verificar o favorito.'); // Lança erro personalizado
        }
    }
}

export default new CheckFavoriteService();
