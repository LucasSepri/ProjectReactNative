import prismaClient from '../../prisma';

class UpdateCategoryService {
  async execute(id: string, name: string) {
    const category = await prismaClient.category.update({
      where: { id },
      data: { name },
    });

    return category;
  }
}

export default new UpdateCategoryService();
