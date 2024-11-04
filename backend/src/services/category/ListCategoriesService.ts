import prismaClient from '../../prisma';

class ListCategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany({
      orderBy: {
        created_at: 'desc', // Ordena pelos produtos mais recentes primeiro
      },
    });
    return categories;
  }
}

export default new ListCategoriesService();
