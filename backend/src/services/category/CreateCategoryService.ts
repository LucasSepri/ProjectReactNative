import prismaClient from '../../prisma';

class CreateCategoryService {
  async execute(name: string) {
    const category = await prismaClient.category.create({
      data: {
        name,
      },
    });

    return category;
  }
}

export default new CreateCategoryService();
