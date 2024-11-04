// src/services/product/ListProductsByCategoryService.ts
import prismaClient from '../../prisma';

class ListProductsByCategoryService {
  async execute(categoryId?: string) {
    const products = await prismaClient.product.findMany({
      orderBy: {
        created_at: 'desc', // Ordena pelos produtos mais recentes primeiro
      },
      where: {
        category_id: categoryId ? categoryId : undefined,
      },
    });

    return products;
  }
}

export default new ListProductsByCategoryService();