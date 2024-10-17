// src/services/product/ListProductsByCategoryService.ts
import prismaClient from '../../prisma';

class ListProductsByCategoryService {
  async execute(categoryId?: string) {
    const products = await prismaClient.product.findMany({
      where: {
        category_id: categoryId ? categoryId : undefined,
      },
    });

    return products;
  }
}

export default new ListProductsByCategoryService();