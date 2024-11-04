import prismaClient from '../../prisma';

class ListProductsService {
    async execute() {
        const products = await prismaClient.product.findMany({
            orderBy: {
                created_at: 'desc', // Ordena pelos produtos mais recentes primeiro
            },
            include: {
                category: true,
            },
        });
        return products;
    }
}

export default new ListProductsService();
