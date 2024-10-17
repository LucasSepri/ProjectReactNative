import prismaClient from '../../prisma';

class ListCategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany();
    return categories;
  }
}

export default new ListCategoriesService();
